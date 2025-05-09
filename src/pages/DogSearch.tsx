import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DogList from '../components/DogList';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/DogSearch.css';

const DogSearch = () => {
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogIds, setDogIds] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [sortOrder, setSortOrder] = useState('breed:asc');

  // Get all dog breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const dogBreeds = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
          withCredentials: true,
        });

        setBreeds(dogBreeds.data);
      } catch (error) {
        console.error('Failed to fetch breeds', error);
      }
    };

    fetchBreeds();
  }, []);

  useEffect(() => {
    fetchDogIds('');
  }, [sortOrder, selectedBreed]);

  const fetchDogIds = async (page: string) => {
    try {
      const breed = selectedBreed ? `breeds=${selectedBreed}` : '';
      const apiUrl = page ? `https://frontend-take-home-service.fetch.com${page}`
        : `https://frontend-take-home-service.fetch.com/dogs/search?size=25&${breed}&sort=${sortOrder}`
      
      const dogs = await axios.get(apiUrl, {
        withCredentials: true,
      });

      setDogIds(dogs.data.resultIds);
      setNextPage(dogs.data.next || '');
      setPreviousPage(dogs.data.prev || '');
    } catch (error) {
      console.error('Failed to fetch dogs', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, {
        withCredentials: true,
      });

      navigate('/');

    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} />

      <div className='search-content'>
        <Sidebar
          breeds={breeds}
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <div className='dog-list-wrapper'>
          <DogList dogIds={dogIds} />
          <div className='pagination-btn-wrapper'>
            <button
              onClick={() => fetchDogIds(previousPage)}
              disabled={!previousPage}
              className={!previousPage ? 'disabled-btn' : 'pagination-btn'}
            >Previous</button>
            <button
              onClick={() => fetchDogIds(nextPage)}
              disabled={!nextPage}
              className={!nextPage ? 'disabled-btn' : 'pagination-btn'}
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogSearch;