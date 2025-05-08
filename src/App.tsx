import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './components/NotFound';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
