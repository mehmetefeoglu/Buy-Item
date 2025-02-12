import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import PageContent from './layout/PageContent.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <PageContent />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App; 