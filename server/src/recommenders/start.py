# from Book_Recommendation.utils import recommend_items_knn
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
from sklearn.neighbors import NearestNeighbors
from PIL import Image
import urllib.request

# -------------------------------------------------------------------
# Books

# load model
# books_model_knn_loaded = pickle.load(open('/content/drive/MyDrive/Book-Recommendation/models/KNN_Books_Item-Item.h5', 'rb'))

# load pivot_matrix
# df_pivot = pd.read_csv('/content/drive/MyDrive/Book-Recommendation/matrix/df_pivot.csv')
# df_pivot.set_index('isbn', inplace=True)

# -------------------------------------------------------------------
# -------------------------------------------------------------------

# Clothing
model = ResNet50(weights='imagenet',include_top=False,input_shape=(224,224,3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

embeddings = np.array(pickle.load(open('src/recommenders/embeddings.pkl', 'rb')))
images = pickle.load(open('src/recommenders/filenames.pkl', 'rb'))

knn = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
knn.fit(embeddings)

print('KNN DONE')
