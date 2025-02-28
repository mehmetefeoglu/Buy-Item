import * as types from '../actions/actionTypes';

const initialState = {
  cart: [],
  payment: {},
  address: {}
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case types.SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };
    case types.SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case types.ADD_TO_CART:
      const existingItem = state.cart.find(
        item => item.product.id === action.payload.product.id
      );

      if (existingItem) {
        // Ürün zaten varsa count'u artır
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, count: item.count + action.payload.count }
              : item
          )
        };
      }

      // Yeni ürün ekle
      return {
        ...state,
        cart: [...state.cart, { 
          count: action.payload.count, 
          checked: true, 
          product: action.payload.product 
        }]
      };
    case types.UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { 
                ...item, 
                count: action.payload.count,
                checked: action.payload.checked !== undefined ? action.payload.checked : item.checked 
              }
            : item
        )
      };
    case types.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };
    default:
      return state;
  }
};

export default shoppingCartReducer; 