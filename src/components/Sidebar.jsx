import axios from 'axios';
import '../styles/Sidebar.css';
import { FaHeart, FaTrash } from "react-icons/fa";

const Sidebar = ({ breeds, selectedBreed, setSelectedBreed, sortOrder,
  setSortOrder, likedDogs, setLikedDogs, setMatchedDogId, zipCode, setZipCode }) => {

  // Remove dog from the favorite list
  const removeFavorite = (dogId) => {
    setLikedDogs((prev) =>
      prev.filter((dog) => dog.id !== dogId)
    );
  };

  // Get a matched dog based on the dogs added to favorite list
  const handleDogMatch = async () => {
    try {
      if (likedDogs.length === 0) {
        alert('Select at least one dog to find a match!');
        return;
      }

      const matchedDog = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match',
        likedDogs.map((dog) => dog.id), {
        withCredentials: true,
      });

      setMatchedDogId(matchedDog.data.match);
    } catch (error) {
      console.error('Failed to match a dog', error);
    }
  };

  return (
    <aside className="sidebar">
      <div className="breed-select">
        <label htmlFor="breed">Breed</label>
        <select name="breed" id="breed" value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
          <option value="">Any</option>
          {breeds.map((breed, index) => (
            <option value={breed} key={index}>{breed}</option>
          ))}
        </select>
      </div>

      <div className="sort-by">
        <p>Sort By</p>
        <button onClick={() => setSortOrder(sortOrder === 'breed:asc' ? 'breed:desc' : 'breed:asc')}>
          {sortOrder === 'breed:asc' ? 'Descending' : 'Ascending'}
        </button>
      </div>

      <div className="zip-code">
        <label htmlFor="zipCode">Zip Code</label>
        <input type="text" name="zipCode" id="zipCode" value={zipCode} maxLength={5}
               onChange={(e) => setZipCode(e.target.value)} placeholder='ex. 09123' />
      </div>

      <div className="favorites">
        <div className="favorites-title">
          <p>Favorites</p>
          <FaHeart className='heart' />
        </div>
        <ul>
          {likedDogs.length === 0 ?
            <p>No favorites</p> :
            (likedDogs.map((dog) => (
              <li key={dog.id} className='liked-pets'>
                <p>{dog.name} - <small>{dog.breed}</small></p>
                <FaTrash className='trash' onClick={() => removeFavorite(dog.id)} />
              </li>
            )))
          }
        </ul>
        <button onClick={handleDogMatch}>Match</button>
      </div>
    </aside>
  );
};

export default Sidebar;