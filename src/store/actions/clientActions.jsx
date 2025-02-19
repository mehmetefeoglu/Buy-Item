import * as types from './actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';

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

export const loginUser = (credentials, rememberMe, history) => async (dispatch) => {
  try {
    console.log('Login Data:', {
      ...credentials,
      role_id: parseInt(credentials.role_id)
    });

    const loginData = {
      ...credentials,
      role_id: parseInt(credentials.role_id)
    };

    const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', loginData);
    
    console.log('API Response:', response.data);

    const { token, name, email, role_id } = response.data;
    
    // Token'ı sakla
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
    
    // User bilgisini store'a kaydet
    dispatch(setUser({ name, email, role_id }));
    
    // Başarılı mesajı göster
    toast.success('Successfully logged in!');
    
    // Yönlendirme
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push('/');
    }
    
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    toast.error(error.response?.data?.message || 'Login failed');
    throw error;
  }
};

export const logout = () => (dispatch) => {
  // Token'ı localStorage ve sessionStorage'dan temizle
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  
  // User state'ini temizle
  dispatch(setUser({}));
  
  // Başarılı mesajı göster
  toast.success('Successfully logged out!');
}; 