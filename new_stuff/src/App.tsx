import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import Generator from './pages/Generator';
import PrintableCards from './pages/PrintableCards';

function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-game" element={<Generator />} />
        <Route path="/printable-cards" element={<PrintableCards />} />
      </Routes>
    </Router>
  );
}

export default App;
