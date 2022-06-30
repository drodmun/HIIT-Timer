import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from 'pages/index';
import NotFoundPage from 'pages/404';

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Index />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
