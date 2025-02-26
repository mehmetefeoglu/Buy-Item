import * as types from './actionTypes';

export const setCart = (cart) => ({
  type: types.SET_CART,
  payload: cart
});

export const setPayment = (payment) => ({
  type: types.SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: types.SET_ADDRESS,
  payload: address
});

export const addToCart = (product, count = 1) => ({
  type: types.ADD_TO_CART,
  payload: { product, count }
});

export const updateCartItem = (productId, count) => ({
  type: types.UPDATE_CART_ITEM,
  payload: { productId, count }
});

export const removeFromCart = (productId) => ({
  type: types.REMOVE_FROM_CART,
  payload: productId
}); 