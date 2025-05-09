import '../styles/Sidebar.css';
import { FaHeart } from "react-icons/fa";

const Sidebar = ({ breeds, selectedBreed, setSelectedBreed, sortOrder, setSortOrder }) => {

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
        <p>Sort By:</p>
        <button onClick={() => setSortOrder(sortOrder === 'breed:asc' ? 'breed:desc' : 'breed:asc')}>
          {sortOrder === 'breed:asc' ? 'Descending' : 'Ascending'}
        </button>
      </div>

      <div className="favorites">
        <div className="favorites-title">
          <p>Favorites</p>
          <FaHeart className="heart" />
        </div>
        <button>Match</button>
      </div>

    </aside>
  );
};

export default Sidebar;