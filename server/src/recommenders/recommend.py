from Book_Recommendation.utils import recommend_items_knn
import pickle
import pandas as pd
import tensorflow
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50,preprocess_input
import numpy as np
from numpy.linalg import norm
import os
from tqdm import tqdm
import pickle
# import cv2
from sklearn.neighbors import NearestNeighbors
from PIL import Image
import urllib.request

# -------------------------------------------------------------------
# Books

# load model
books_model_knn_loaded = pickle.load(open('/content/drive/MyDrive/Book-Recommendation/models/KNN_Books_Item-Item.h5', 'rb'))

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

# -------------------------------------------------------------------

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





def similar_books(isbn_id):
    result = recommend_items_knn(books_model_knn_loaded, df_pivot, isbn_id)
    print(result)
    # return result

def similar_image_products(img_url):
    img_path = 'img.png'
    urllib.request.urlretrieve(img_url, 'img.jpg')
    features = get_features(img_path, model)
    # print(features, '\n\n\n')
    recommended_images = recommend_items(features, knn, images)
    print(recommended_images)
    return recommended_images
