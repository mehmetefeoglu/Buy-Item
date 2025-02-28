import axios from 'axios';

const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com'
});

// Token'ı header'a ekleyen interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Sadece gerçekten token geçersiz olduğunda logout yap
    if (error.response?.status === 401 && 
        error.response?.data?.message?.includes('token')) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 