import * as types from './actionTypes';
import api from '../../api/axiosInstance';  // Yolu düzelttik
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
      const response = await api.get('/roles');
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }
};

export const verifyToken = () => async (dispatch) => {
  // Önce localStorage'ı kontrol et
  const persistedToken = localStorage.getItem('token');
  // Sonra sessionStorage'ı kontrol et
  const sessionToken = sessionStorage.getItem('token');
  
  // Kullanılacak token'ı belirle
  const token = persistedToken || sessionToken;
  
  if (!token) return;

  try {
    // Token'ı axios header'ına ekle
    api.defaults.headers.common['Authorization'] = token;
    
    const response = await api.get('/verify');
    
    // Token geçerliyse user bilgisini store'a kaydet
    dispatch(setUser(response.data));
    
    // Token'ı yenile ve aynı storage'a kaydet
    if (response.data.token) {
      if (persistedToken) {
        localStorage.setItem('token', response.data.token);
      } else {
        sessionStorage.setItem('token', response.data.token);
      }
    }
  } catch (error) {
    // Token geçersizse temizle
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    dispatch(setUser({}));
  }
};

export const loginUser = (credentials, rememberMe, history) => async (dispatch) => {
  try {
    const loginData = {
      ...credentials,
      role_id: parseInt(credentials.role_id)
    };

    const response = await api.post('/login', loginData);
    const { token, ...user } = response.data;
    
    // Token'ı sadece "Remember Me" seçiliyse localStorage'a kaydet
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
    
    // Token'ı axios header'ına ekle
    api.defaults.headers.common['Authorization'] = token;
    
    dispatch(setUser(user));
    toast.success('Successfully logged in!');
    
    // Yönlendirme
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push('/');
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
    throw error;
  }
};

export const logout = () => (dispatch) => {
  // Token'ı localStorage ve sessionStorage'dan temizle
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  dispatch(setUser({}));
  
  // Başarılı mesajı göster
  toast.success('Successfully logged out!');
}; 