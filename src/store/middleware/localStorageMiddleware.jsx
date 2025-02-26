// Local storage keys
const STORAGE_KEY = 'buyitem_store';

// Save to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify({
      shoppingCart: state.shoppingCart,
      // Diğer saklamak istediğimiz state'ler...
    });
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.log('Save to localStorage failed:', err);
  }
};

// Load from localStorage
export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Load from localStorage failed:', err);
    return undefined;
  }
};

// Middleware
export const localStorageMiddleware = store => next => action => {
  const result = next(action);
  
  // Shopping cart ile ilgili action'lar gerçekleştiğinde state'i kaydet
  if (action.type.includes('CART')) {
    saveToLocalStorage(store.getState());
  }
  
  return result;
}; 