import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Generator from './pages/Generator';

function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new-game' element={<Generator/>}/>
      </Routes>
    </Router>
  );
}

export default App;
