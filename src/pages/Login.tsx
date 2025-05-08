import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DogPortrait from '../images/dog-portrait.jpg';
import FetchLogo from '../images/fetch-logo.png';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, });
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', formData, {
        withCredentials: true,
      });

      console.log(response);
      navigate('/dogsearch');

    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please provide valid credentials and try again.');
    }
  };

  return (
    <div className='hero' style={{ backgroundImage: `url(${DogPortrait})` }}>
      <div className='content'>
        <img src={FetchLogo} alt='Fetch logo' />
        <h1>Welcome!</h1>
        {error && <p className='error-message'>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className='name login-input'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='name' value={formData.name} onChange={handleChange} required />
          </div>
          <div className='email login-input'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' value={formData.email} onChange={handleChange} required />
          </div>
          <button type='submit' className='login-btn'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;