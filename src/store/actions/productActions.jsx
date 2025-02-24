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

    // Sıralama
    if (params.sort) {
      const [field, order] = params.sort.split(':');
      if (field === 'popularity') {
        queryParams.append('sortBy', 'sell_count');
        queryParams.append('order', 'desc');
      } else {
        queryParams.append('sortBy', field);
        queryParams.append('order', order);
      }
    }

    // Sayfalama
    if (params.offset !== undefined) {
      queryParams.append('offset', params.offset);
    }
    if (params.limit) {
      queryParams.append('limit', params.limit);
    }

    const queryString = queryParams.toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;
    
    console.log('API Request URL:', url);
    const response = await api.get(url);

    // Hem kategori hem de filtre eşleşmelerini kontrol et
    let filteredProducts = response.data.products;
    if (params.filter) {
      const searchTerm = params.filter.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category?.title.toLowerCase().includes(searchTerm)
      );
    }

    dispatch({
      type: types.FETCH_PRODUCTS_SUCCESS,
      payload: {
        products: filteredProducts,
        total: filteredProducts.length
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