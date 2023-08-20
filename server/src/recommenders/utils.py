from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd, numpy as np
from scipy.sparse import csr_matrix
from sklearn.decomposition import TruncatedSVD
from sklearn.neighbors import NearestNeighbors

# Preprocessing
def check_count_of_user(df):
  counts = df.user_id.value_counts()
  return counts

def generate_most_rated_users_df(df, counts, count):
  most_rated_users = df[df.user_id.isin(counts[counts >= count].index)]
  print('Number of users who have rated', count, 'or more items =', len(most_rated_users))
  print('Number of unique users in the final data = ', most_rated_users['user_id'].nunique())
  print('Number of unique products in the final data = ', most_rated_users['item_id'].nunique())
  return most_rated_users

def generate_pivot(df, index, columns, values, fillna=True):
  df_pivot = df.pivot_table(index=index, columns=columns, values=values)
  if fillna:
    df_pivot = df_pivot.fillna(0)
  return df_pivot

def generate_SVD_pivot(pivot_df):
  U, sigma, Vt = np.linalg.svd(pivot_df, full_matrices=False)
  sigma = np.diag(sigma)

  # predicted ratings
  predicted_ratings = np.dot(np.dot(U, sigma), Vt)
  predicted_ratings.shape

  # Convert predicted ratings to dataframe
  preds_df = pd.DataFrame(predicted_ratings, columns = pivot_df.columns)
  return preds_df

def generate_rmse_df(pivot_df, preds_df):
  rmse_df = pd.concat([pivot_df.mean(), preds_df.mean()], axis=1)
  rmse_df.columns = ['Avg_actual_ratings', 'Avg_predicted_ratings']
  # print(rmse_df.shape)
  # rmse_df.head()
  return rmse_df

def rmse_error(rmse_df):
  RMSE = round((((rmse_df.Avg_actual_ratings - rmse_df.Avg_predicted_ratings) ** 2).mean() ** 0.5), 5)
  print('\nRMSE SVD Model = {} \n'.format(RMSE))
  return RMSE



# ITEM ITEM SIMILARITY

def SVD_item_item_similarity(pivot_df, n_components=12):
  # pivot_df = generate_pivot(df, index, columns, values)
  X = pivot_df.values.T

  SVD = TruncatedSVD(n_components=n_components, random_state=17)
  matrix = SVD.fit_transform(X)
  # matrix.shape

  # Correlation matrix between ITEMS
  corr = np.corrcoef(matrix)
  # corr.shape

  return corr

def recommend_items_SVD(corr, pivot_df_columns_list, item_id):
  index = pivot_df_columns_list.index(item_id)
  corr_list = corr[index]

  # Top 5 items
  ind = np.argpartition(corr_list, -6)[-6:]
  ind = ind[np.argsort(corr_list[ind])]
  ind = ind[ :-1]

  res = []
  for i in ind:
    res.append(pivot_df_columns_list[i])

  print(res)
  return res



def knn_item_item_similarity(df, index='item_id', columns='user_id', values='rating'):
  pivot_df = generate_pivot(df, index, columns, values)
  pivot_df_csr_matrix = csr_matrix(pivot_df.values)

  model_knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
  model_knn.fit(pivot_df_csr_matrix)

  return (pivot_df, model_knn)


def recommend_items_knn(model, pivot_df, isbn_id):
  # query_index = np.random.choice(pivot_df.shape[0])
  isbn = list(pivot_df.index)
  query_index = isbn.index(isbn_id)

  distances, indices = model.kneighbors(pivot_df.iloc[query_index, :].values.reshape((1, -1)), n_neighbors = 6)

  result = []
  for i in range(0, len(distances.flatten())):
      if i == 0:
          print('Recommendations for {0}:\n'.format(pivot_df.index[query_index]))
      else:
          book_id = pivot_df.index[indices.flatten()[i]]
          print('{0}: {1}, with distance of {2}:'.format(i, book_id, distances.flatten()[i]))
          result.append(book_id)

  return result


# USER-USER SIMILARITY

def normalize_pivot_matrix(df_pivot):
  df_pivot_norm = df_pivot.subtract(df_pivot.mean(axis=1), axis='rows')
  return df_pivot_norm

def similarity_matrix_Pearson(df_pivot_norm):
  user_similarity = df_pivot_norm.T.corr()
  return user_similarity

def similarity_matrix_Cosine(df_pivot_norm):
  user_similarity = cosine_similarity(df_pivot_norm.fillna(0))
  print(type(user_similarity))
  return user_similarity

def exclude_given_user(user_id, user_similarity):
  user_similarity = user_similarity.drop(index=user_id)
  return user_similarity

def get_similar_users(user_id, threshold, user_similarity, n=5):
  # n = no. of users
  similar_users = user_similarity[user_similarity[user_id] > threshold][user_id].sort_values(ascending=False)[:n]
  print(similar_users)
  return similar_users

def get_interacted_items(user_id, df_pivot_norm):
  # Items that the target user has interacted
  interacted_df = df_pivot_norm[df_pivot_norm.index == user_id].dropna(axis=1, how='all')
  return interacted_df

def get_similar_users_items(df_pivot_norm, similar_users, interacted_df):
  # remove not interacted items in similar users
  similar_user_items = df_pivot_norm[df_pivot_norm.index.isin(similar_users.index)].dropna(axis=1, how='all')

  # remove target user interacted items
  similar_user_items = similar_user_items.drop(interacted_df.columns, axis=1, errors='ignore')

  return similar_user_items

def recommend_items_User_Based(similar_users, similar_user_items, n = 5):
  # A dictionary to store item scores
  item_score = {}

  # Loop through items
  for i in similar_user_items.columns:
    # Get the ratings for movie i
    item_rating = similar_user_items[i]
    # Create a variable to store the score
    total = 0
    # Create a variable to store the number of scores
    count = 0
    # Loop through similar users
    for u in similar_users.index:
      # If the movie has rating
      if pd.isna(item_rating[u]) == False:
        # Score is the sum of user similarity score multiply by the movie rating
        score = similar_users[u] * item_rating[u]
        # Add the score to the total score for the movie so far
        total += score
        # Add 1 to the count
        count +=1
    # Get the average score for the item
    item_score[i] = total / count

  # Convert dictionary to pandas dataframe
  item_score = pd.DataFrame(item_score.items(), columns=['movie', 'movie_score'])

  # Sort the movies by score
  ranked_item_score = item_score.sort_values(by='movie_score', ascending=False)

  # Select top n movies
  print(ranked_item_score.head(n))
  return ranked_item_score.iloc[ :n, : ]
