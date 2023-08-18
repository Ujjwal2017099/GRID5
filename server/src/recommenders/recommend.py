from utils import recommend_items_knn
import pandas as pd
import tensorflow
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50,preprocess_input
import numpy as np
from numpy.linalg import norm
import pickle
# import cv2
from sklearn.neighbors import NearestNeighbors
import urllib.request
from flask import request


# -------------------------------------------------------------------
# Skin Products
skin_data = pd.read_csv('skin_data_final.csv')


# -------------------------------------------------------------------
# Books

# load model
books_model_knn_loaded = pickle.load(open('Book_Recommendation/models/KNN_Books_Item-Item.h5', 'rb'))

# load pivot_matrix
df_pivot = pd.read_csv('/content/drive/MyDrive/Book-Recommendation/matrix/df_pivot.csv')
df_pivot.set_index('isbn', inplace=True)

# -------------------------------------------------------------------
# -------------------------------------------------------------------

# Clothing
model = ResNet50(weights='imagenet',include_top=False,input_shape=(224,224,3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

embeddings = np.array(pickle.load(open('embeddings.pkl', 'rb')))
images = pickle.load(open('filenames.pkl', 'rb'))

knn = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
knn.fit(embeddings)

print('KNN DONE')

app = Flask(__name__)

# -------------------------------------------------------------------

def skin_products_recommender(search):
    cs_list = []
    brands = []
    output = []
    binary_list = []
    idx = data[data['product_name'] == search].index.item()
    for i in ingred_matrix.iloc[idx][1:]:
        binary_list.append(i)
    point1 = np.array(binary_list).reshape(1, -1)
    point1 = [val for sublist in point1 for val in sublist]
    prod_type = data['product_type'][data['product_name'] == search].iat[0]
    brand_search = data['brand'][data['product_name'] == search].iat[0]
    data_by_type = data[data['product_type'] == prod_type]

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
    for m in range(len(data_by_type)):
        brand = data_by_type['brand'].iloc[l]
        if len(brands) == 0:
            if brand != brand_search:
                brands.append(brand)
                output.append(data_by_type.iloc[l])
        elif brands.count(brand) < 2:
            if brand != brand_search:
                brands.append(brand)
                output.append(data_by_type.iloc[l])
        l += 1

    print('\033[1m', 'Recommending products similar to', search, ':', '\033[0m')
    print(pd.DataFrame(output)[['product_name', 'cos_sim']].head(5))

    return "Success"



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
    print(result)
    distances, indices = result
    # print(indices)
    images_id = []
    for img_index in indices[0]:
        id = images[img_index]
        # print(id)
        images_id.append(id)
    # print(images_id)
    return images_id




@app.get('/similar_skin_products')
def similar_skin_producs():
    search = request.args.get('name', '')
    res = skin_products_recommender(search)
    return res, 200

@app.get('/similar_book')
def similar_books():
    isbn_id = requests.get('isbn_id', '')
    result = recommend_items_knn(books_model_knn_loaded, df_pivot, isbn_id)
    print(result)
    return result, 200

@app.get('/similar_image')
def similar_image_products(img_url):
    img_url = request.args.get('img_url', '')
    img_path = 'img.jpg'
    urllib.request.urlretrieve(img_url, 'img.jpg')
    features = get_features(img_path, model)
    # print(features, '\n\n\n')
    recommended_images = recommend_items(features, knn, images)
    print(recommended_images)
    return recommended_images, 200

if __name__ == '__main__':
    app.run()
