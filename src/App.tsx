import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DogSearch from './pages/DogSearch';
import NotFound from './components/NotFound';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dogsearch' element={<DogSearch />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
