import { BrowserRouter as Router } from 'react-router-dom';
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import PageContent from './layout/PageContent.jsx';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <PageContent />
        <Footer className="mt-auto" />
      </div>
    </Router>
  );
};

export default App; 