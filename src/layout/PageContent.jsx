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

const PageContent = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Sadece component mount olduğunda çalışacak
    const handlePageRefresh = () => {
      const isPageRefreshed = window.performance?.getEntriesByType('navigation')?.[0]?.type === 'reload';
      
      // Eğer sayfa yenilendiyse ve ana sayfada değilsek
      if (isPageRefreshed && location.pathname !== '/') {
        history.push('/');
      }
    };

    // İlk yüklemede kontrol et
    handlePageRefresh();
  }, []); // Sadece component mount olduğunda çalışsın

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
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
  );
};

export default PageContent; 