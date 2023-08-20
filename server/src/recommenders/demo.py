import numpy as np, pandas as pd

# Skin Products
skin_data = pd.read_csv('skin_data_final.csv')
ingred_matrix = pd.read_csv('ingred_matrix.csv')

def skin_products_recommender(search):
    cs_list = []
    brands = []
    output = []
    binary_list = []
    print(type(skin_data))
    print(search, type(search))
    idx = skin_data[skin_data['item_id'] == search]
    print(idx)
    idx = idx.index.item()
    print(idx)
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
                res.append(output[-1]['item_id'])
        elif brands.count(brand) < 2:
            if brand != brand_search:
                brands.append(brand)
                output.append(data_by_type.iloc[l])
                res.append(output[-1]['item_id'])
        l += 1


    # print('\033[1m', 'Recommending products similar to', search, ':', '\033[0m')
    # print(pd.DataFrame(output)[['product_name', 'cos_sim']].head(5))
    res = res[:5]
    print(res)
    return res


res = skin_products_recommender(10003)