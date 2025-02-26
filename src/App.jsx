import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { verifyToken } from './store/actions/clientActions';
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import PageContent from './layout/PageContent.jsx';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage'dan token'ı kontrol et
    const persistedToken = localStorage.getItem('token');
    // sessionStorage'dan token'ı kontrol et
    const sessionToken = sessionStorage.getItem('token');
    
    // Herhangi bir token varsa verify et
    if (persistedToken || sessionToken) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <PageContent />
        <Footer className="mt-auto" />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#23A6F0',
              secondary: '#fff',
            },
          },
        }}
      />
    </Provider>
  );
};

export default App; 