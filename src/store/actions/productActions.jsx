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