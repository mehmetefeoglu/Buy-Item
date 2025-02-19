import { BrowserRouter as Router } from 'react-router-dom';
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import PageContent from './layout/PageContent.jsx';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <PageContent />
          <Footer className="mt-auto" />
        </div>
      </Router>
    </Provider>
  );
};

export default App; 