import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/ParkNavbar.css';

const ParkNavbar = () => {
  const location = useLocation();
  const [username, setUsername] = useState(null);

  // Effect to read username from localStorage when component mounts OR route changes
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
       // Clear username state if it's no longer in localStorage
       setUsername(null);
    }
  }, [location.pathname]); // <-- Add location.pathname here

  return (
    <nav className="park-navbar">
      <ul>
        <li><Link to="/park" className={location.pathname === '/park' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/park/mission-a" className={location.pathname.includes('/mission-a') ? 'active' : ''}>Roller Coaster</Link></li>
        <li><Link to="/park/mission-b" className={location.pathname.includes('/mission-b') ? 'active' : ''}>Haunted House</Link></li>
      </ul>
      {/* --- Display Welcome Message or Login Link --- */}
      {username ? (
        <div className="park-navbar-welcome">Welcome, {username}!</div>
      ) : (
        <div className="park-navbar-login-link"><Link to="/login">Login</Link></div>
      )}
      {/* ------------------------------------------- */}
    </nav>
  );
};

export default ParkNavbar;
