import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';


class PageContent extends React.Component {
  render() {
    return (
      <main className="flex-grow">
        <Switch>
          <Route path="/" element={<HomePage />} />
          {/* Diğer sayfalar için route'lar buraya eklenecek */}
        </Switch>
      </main>
    );
  }
}

export default PageContent; 