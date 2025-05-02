import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [username, setUsername] = useState(null);

    // Define routes where the Navbar should not be displayed
    const hiddenRoutes = ['/forest'];

    // Effect to read username from localStorage when component mounts OR route changes
    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        // Clear username state if it's no longer in localStorage (e.g., after logout)
        setUsername(null);
      }
    }, [location.pathname]); // <-- Add location.pathname here

    // Check if the current route is in the hiddenRoutes array
    if (hiddenRoutes.includes(location.pathname)) {
        return null; // Do not render the Navbar
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand-link">
                <div className="navbar-brand"> Story</div>
            </Link>
            <div className="navbar-links">
                <ul>
                    <li><Link to="/" className={location.pathname === '/' || location.pathname === '/intro' ? 'active' : ''}>Intro</Link></li>
                    <li><Link to="/mission-a" className={location.pathname.includes('/mission-a') ? 'active' : ''}>Mission A</Link></li>
                    <li><Link to="/mission-b" className={location.pathname.includes('/mission-b') ? 'active' : ''}>Mission B</Link></li>
                </ul>
            </div>
            {/* --- Display Welcome Message or Login Link --- */}
            {username ? (
              <div className="navbar-welcome">Welcome, {username}!</div>
            ) : (
              <div className="navbar-login-link"><Link to="/login">Login</Link></div>
            )}
            {/* ------------------------------------------- */}
        </nav>
    );
};

export default Navbar;
