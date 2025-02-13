import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';

const PageContent = () => {
  return (
    <main className="flex-1">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/auth" render={() => <div>Auth Page</div>} />
        <Route path="/search" render={() => <div>Search Page</div>} />
        <Route path="/cart" render={() => <div>Cart Page</div>} />
        <Route path="/wishlist" render={() => <div>Wishlist Page</div>} />
        <Route path="/about" render={() => <div>About Page</div>} />
        <Route path="/blog" render={() => <div>Blog Page</div>} />
        <Route path="/contact" render={() => <div>Contact Page</div>} />
        <Route path="/pages" render={() => <div>Pages</div>} />
        <Route path="/shop" render={() => <div>Shop Page</div>} />
      </Switch>
    </main>
  );
};

export default PageContent; 