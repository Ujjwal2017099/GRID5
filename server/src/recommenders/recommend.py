from utils import recommend_items_knn
import pandas as pd
import tensorflow
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50,preprocess_input
import numpy as np
from numpy.linalg import norm
import pickle
from sklearn.neighbors import NearestNeighbors
import urllib.request
from flask import request, Flask, redirect, url_for, Response, jsonify
from flask_cors import CORS, cross_origin

from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient("mongodb+srv://Ujjwal:4XgZs1WGLyGvjSGn@cluster0.7ucvtkq.mongodb.net/GRID?retryWrites=true&w=majority")
db = client.get_database('GRID')
products = db['products']



# -------------------------------------------------------------------
# Skin Products
skin_data = pd.read_csv('data/skin_data_final.csv')
ingred_matrix = pd.read_csv('data/ingred_matrix.csv')
# name = CeraVe Moisturising Lotion 473ml


# -------------------------------------------------------------------
# Books

# load model
books_model_knn_loaded = pickle.load(open('data/KNN_Books_Item-Item.h5', 'rb'))

# load pivot_matrix
df_pivot = pd.read_csv('data/df_pivot.csv', low_memory=False)
df_pivot.set_index('ISBN', inplace=True)
# isbn_id = 002026478X

print("Pivot Loaded")
# -------------------------------------------------------------------
# -------------------------------------------------------------------

# Clothing
model = ResNet50(weights='imagenet',include_top=False,input_shape=(224,224,3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

embeddings = np.array(pickle.load(open('data/embeddings.pkl', 'rb')))
images = pickle.load(open('data/filenames.pkl', 'rb'))

knn = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
knn.fit(embeddings)

# print('KNN DONE')

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# -------------------------------------------------------------------

def get_details(id_list):
    res = []
    for id in id_list:
        # print(id)
        details = list(products.find(filter={"ItemID":id}))[0]
        # print(details)
        if 'Brand' not in details.keys():
            details['Brand'] = None
        if 'Image' not in details.keys():
            details['Image'] = None
        res.append({'_id':str(details['_id']), 'Name':details['Name'], 'Brand': details['Brand'], 'Image':details['Image'], 'Price':details['Price']})
    return res


def skin_products_recommender(search):
    cs_list = []
    brands = []
    output = []
    binary_list = []
    # print(type(skin_data))
    # print(search, type(search))
    idx = skin_data[skin_data['item_id'] == search]
    # print(idx)
    idx = idx.index.item()
    # print(idx)
    for i in ingred_matrix.iloc[idx][1:]:
        binary_list.append(i)
    point1 = np.array(binary_list).reshape(1, -1)
    point1 = [val for sublist in point1 for val in sublist]
    prod_type = skin_data['product_type'][skin_data['item_id'] == search].iat[0]
    brand_search = skin_data['brand'][skin_data['item_id'] == search].iat[0]
    data_by_type = skin_data[skin_data['product_type'] == prod_type]

    for j in range(data_by_type.index[0], data_by_type.index[0] + len(data_by_type)):
        binary_list2 = []
        for k in ingred_matrix.iloc[j][1:]:
            binary_list2.append(k)
        point2 = np.array(binary_list2).reshape(1, -1)
        point2 = [val for sublist in point2 for val in sublist]
        dot_product = np.dot(point1, point2)
        norm_1 = np.linalg.norm(point1)
        norm_2 = np.linalg.norm(point2)
        cos_sim = dot_product / (norm_1 * norm_2)
        cs_list.append(cos_sim)
    data_by_type = pd.DataFrame(data_by_type)
    data_by_type['cos_sim'] = cs_list
    data_by_type = data_by_type.sort_values('cos_sim', ascending=False)
    data_by_type = data_by_type[data_by_type.product_name != search]
    l = 0

    res = []

    for m in range(len(data_by_type)):
        brand = data_by_type['brand'].iloc[l]
        if len(brands) == 0:
            if brand != brand_search:
                brands.append(brand)
                output.append(data_by_type.iloc[l])
                res.append(str(output[-1]['item_id']))
        elif brands.count(brand) < 2:
            if brand != brand_search:
                brands.append(brand)
                output.append(data_by_type.iloc[l])
                res.append(str(output[-1]['item_id']))
        l += 1


    # print('\033[1m', 'Recommending products similar to', search, ':', '\033[0m')
    # print(pd.DataFrame(output)[['product_name', 'cos_sim']].head(5))
    res = res[:5]
    # print(res)
    res = get_details(res)
    return res



def get_features(img_path, model):
    img = image.load_img(img_path,target_size=(224,224))
    img_array = image.img_to_array(img)
    # print(img_array)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    print("\n\n\npre-processing done\n\n\n")
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)
    # print('\n\n\n\n')
    # print(normalized_result)
    # print('\n\n\n\n')
    return normalized_result

def recommend_items(features, knn, images):
    # print(features, '\n\n\n')
    result = knn.kneighbors([features])
    # print(result)
    distances, indices = result
    # print(indices)
    images_id = []
    # res = []
    cnt = 0
    ini_id = None

    for img_index in indices[0]:
        id = images[img_index]
        id = id.split('\\')[-1].split('.')[0]
        # print(id)
        if cnt == 0:
            ini_id = id
            cnt += 1
            continue

        images_id.append(id)
        
    res = [get_initial_details(ini_id), get_details(images_id)]

    return res


def get_initial_details(id):
    details = list(products.find(filter={"ItemID":id}))[0]
    # print(details)
    if 'Brand' not in details.keys():
        details['Brand'] = None
    if 'Image' not in details.keys():
        details['Image'] = None
    if 'Description' not in details.keys():
        details['Description'] = details['Name']
    return {'Name':details['Name'], 'Category':details['Category'], 'Rating':round(float(str(details['Rating'])),1), 'Price':details['Price'], 'Attributes':details['Attributes'], 'Image':details["Image"], 'Description':details['Description']}


def similar_skin_products(product_id):
    # product_id = int(request.args.get('product_id', ''))
    # print(product_id)
    res = skin_products_recommender(int(product_id))
    res = [get_initial_details(product_id), res]
    return res


def similar_books(isbn_id):
    # isbn_id = request.args.get('isbn_id', '')
    res = recommend_items_knn(books_model_knn_loaded, df_pivot, isbn_id)
    # res = get_details(res)
    res = [get_initial_details(isbn_id), get_details(res)]
    return res


def similar_image_products(img_url):
    # img_url = request.args.get('img_url', '')
    # print(img_url, type(img_url))
    img_path = 'img.jpg'
    urllib.request.urlretrieve(img_url, 'img.jpg')
    features = get_features(img_path, model)
    recommended_images = recommend_items(features, knn, images)
    # print(recommended_images)
    return recommended_images
    
# @app.route('/similar_image', methods=['GET', 'POST'])
# def similar_image_products():
#     if request.method == 'GET':
#         img_url = request.args.get('img_url', '')
#         print(img_url, type(img_url))
#         img_path = 'img.jpg'
#         urllib.request.urlretrieve(img_url, 'img.jpg')
#         features = get_features(img_path, model)
#         recommended_images = recommend_items(features, knn, images)
#         print(recommended_images)
#         return recommended_images, 200
#     elif request.method == 'POST':
#         img_url = request.get_json()
#         print(img_url)
#         res = []
#         for url in img_url:
#             img_path = 'img.jpg'
#             urllib.request.urlretrieve(url, 'img.jpg')
#             features = get_features(img_path, model)
#             recommended_images = recommend_items(features, knn, images)
#             res.append(recommended_images)
#         return res, 200

@app.get('/trendingProducts')
@cross_origin()
def trendingProducts():

    res = list(products.aggregate([{'$project': {'_id': 1, 'Name': 1, 'Brand': 1, 'Price': 1,'Image':1, 'score': {'$cond': [{'$gt': ['$Appearence', 0]}, {'$divide': ['$ProductsViewed', '$Appearence']}, 0]}}}, {'$sort':{'score':-1}}, {'$limit' : 5}]))

    # print(res)
    for i in res:
        i['_id'] = str(i['_id'])
    return res, 200



@app.route('/searchHistory', methods=['GET', 'POST'])
@cross_origin()
def searchHistory():
    data = request.get_json()
    print(data)
    # print(data)
    res = []
    for ic in data['search']:
        print(ic)
        mongo_id = ic
        item = list(products.find(filter={'_id':ObjectId(mongo_id)}))[0]
        print(item)
        category = item['Category']
        # print(category)

        if category in ['Jeans', 'Tops', 'Shirt', 'Shoes', 'Skirt']:
            img_url = item['Image']
            res.extend(similar_image_products(img_url)[1:][0][2:])
        elif category == 'Skin':
            res.extend(similar_skin_products(item['ItemID'])[1:][0][2:])
        elif category == 'Books':
            res.extend(similar_books(item['ItemID'])[1:][0][2:])
        else:
            return Response("Bad Response", status=400)
    # print(res)
    return res, 200


@app.route('/productPage', methods=['GET', 'POST'])
@cross_origin()
def productPage():
    mongo_id = request.args.get('id', '')
    # print(mongo_id, type(mongo_id))

    item_detail = list(products.find(filter={'_id':ObjectId(mongo_id)}))[0]
    # filter={'_id': request.args.get('id')}
    # item_detail = list(client['GRID']['products'].find(filter=filter))
    # print(item_detail)
    
    category = item_detail['Category']

    if category in ['Jeans', 'Tops', 'Shirt', 'Shoes', 'Skirt']:
        item = item_detail['Image']
        return similar_image_products(item), 200
    elif category == 'Skin':
        item = item_detail['ItemID']
        return similar_skin_products(item), 200
    elif category == 'Books':
        item = item_detail['ItemID']
        return similar_books(item), 200
    else:
        return Response("Bad Response", status=400)



# LOAD THE GPU LIBRARY COMPLETELY
dummy = get_features('data/dummy.jpg', model)

if __name__ == '__main__':
    app.run()