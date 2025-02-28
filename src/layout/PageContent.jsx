import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../components/ProtectedRoute';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProfilePage from '../pages/ProfilePage';
import OrdersPage from '../pages/OrdersPage';
import api from '../api/axiosInstance';

const PageContent = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Her sayfa yüklendiğinde token kontrolü yap
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      // Token varsa Bearer prefix'i ile ayarla
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Token yoksa header'ı temizle
      delete api.defaults.headers.common['Authorization'];
      
      // Public rotalar hariç login'e yönlendir
      const publicRoutes = ['/login', '/register', '/'];
      if (!publicRoutes.includes(window.location.pathname)) {
        history.push('/login');
      }
    }
  }, [history]);

  return (
    <main className="flex-grow">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetailPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <ProtectedRoute path="/orders" component={OrdersPage} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
  );
};

export default PageContent; 