import * as types from './actionTypes';
import axios from 'axios';

// Action Creators
export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: types.SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: types.SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: types.SET_LANGUAGE,
  payload: language
});

// Thunk Action Creator for Roles
export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  
  // Sadece ihtiyaç olduğunda çağır
  if (roles.length === 0) {
    try {
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/roles');
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }
}; 