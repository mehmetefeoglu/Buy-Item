import * as types from './actionTypes';
import api from '../../api/axiosInstance';

export const setCategories = (categories) => ({
  type: types.SET_CATEGORIES,
  payload: categories
});

export const setProductList = (products) => ({
  type: types.SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total) => ({
  type: types.SET_TOTAL,
  payload: total
});

export const setFetchState = (state) => ({
  type: types.SET_FETCH_STATE,
  payload: state
});

export const setLimit = (limit) => ({
  type: types.SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: types.SET_OFFSET,
  payload: offset
});

export const setFilter = (filter) => ({
  type: types.SET_FILTER,
  payload: filter
});

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: types.FETCH_CATEGORIES_START });
  
  try {
    const response = await api.get('/categories');
    
    // Kategorileri rating'e göre sırala
    const sortedCategories = response.data.sort((a, b) => b.rating - a.rating);
    
    dispatch({
      type: types.FETCH_CATEGORIES_SUCCESS,
      payload: sortedCategories
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_CATEGORIES_FAIL,
      payload: error.message
    });
  }
};

export const fetchProducts = (params = {}) => async (dispatch) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Kategori ve filtreleme birlikte çalışsın
    if (params.filter) {
      queryParams.append('filter', params.filter);
    }
    
    // Kategori ID'si varsa ekle
    if (params.category) {
      queryParams.append('categoryId', params.category);
    }
    
    // Cinsiyet filtresi
    if (params.gender) {
      queryParams.append('gender', params.gender === 'kadin' ? 'k' : 'e');
    }

    // Sıralama için gelen parametreyi görelim
    console.log('Sort parameter:', params.sort);

    // Sıralama mantığını düzelt
    if (params.sort) {
      const [field, order] = params.sort.split(':');
      console.log('Sort Field:', field);
      console.log('Sort Order:', order);
      
      // API'nin beklediği formatta gönderelim
      queryParams.append('sort', `${field}:${order}`);  // sortBy ve order yerine tek bir sort parametresi
    }

    // Sayfalama parametreleri
    if (params.limit) {
      queryParams.append('limit', params.limit);
    }
    if (params.offset !== undefined) {
      queryParams.append('offset', params.offset);
    }

    const queryString = queryParams.toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;
    
    // API'ye giden URL'i görelim
    console.log('API Request URL:', url);

    const response = await api.get(url);
    console.log('API Response:', response.data);

    dispatch({
      type: types.FETCH_PRODUCTS_SUCCESS,
      payload: {
        products: response.data.products,
        total: response.data.total
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    dispatch({
      type: types.FETCH_PRODUCTS_FAIL,
      payload: error.message
    });
  }
}; 