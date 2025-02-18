import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';

const PageContent = () => {
  return (
    <main className="flex-grow">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="*" render={() => <div>404 Not Found</div>} />
      </Switch>
    </main>
  );
};

export default PageContent; 