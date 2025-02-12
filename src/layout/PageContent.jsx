import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';

class PageContent extends React.Component {
  render() {
    return (
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Diğer sayfalar için route'lar buraya eklenecek */}
        </Routes>
      </main>
    );
  }
}

export default PageContent; 