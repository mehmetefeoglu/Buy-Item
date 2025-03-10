import * as types from '../actions/actionTypes';

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED',
  loading: false,
  error: null,
  currentProduct: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case types.SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    case types.SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case types.SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    case types.SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case types.SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    case types.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case types.FETCH_CATEGORIES_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case types.FETCH_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload.products,
        total: action.payload.total,
        loading: false
      };
    case types.FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.SET_PRODUCT_DETAIL:
      return {
        ...state,
        currentProduct: action.payload,
        loading: false
      };
    case types.FETCH_PRODUCT_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentProduct: action.payload,
        error: null
      };
    case types.FETCH_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default productReducer; 