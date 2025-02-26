import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import { localStorageMiddleware, loadFromLocalStorage } from './middleware/localStorageMiddleware';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer
});

// localStorage'dan initial state'i yükle
const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState, // Initial state olarak localStorage'dan yüklenen veriyi kullan
  applyMiddleware(thunk, logger, localStorageMiddleware)
);

export default store; 