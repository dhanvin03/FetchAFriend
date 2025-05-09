import '../styles/Navbar.css';
import FetchLogo from '../images/fetch-logo.png';

const Navbar = ({ handleLogout }) => {
    return (
        <nav className='navbar'>
            <img src={FetchLogo} alt="Fetch Logo" className='logo' />
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;