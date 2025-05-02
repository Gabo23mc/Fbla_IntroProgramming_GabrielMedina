import React, { useEffect, useState } from 'react';
import { fetchProfile, logoutUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile()
      .then(data => setUser(data.user))
      .catch(err => {
        setError(err.message || 'Failed to load profile');
        logoutUser();
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (!user) return <div className="auth-container">Loading...</div>;
  return (
    <div className="auth-container">
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        {/* Add other profile info here if available */}
      </div>

      {/* --- Change Password Link (styled as button) --- */}
      <div style={{ marginBottom: '1em' }}>
        <a href="/change-password" className="auth-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          Change Password
        </a>
      </div>
      {/* --------------------------------------------- */}

      <button className="auth-button" onClick={handleLogout}>Logout</button>

      {/* --- Return to Main App Link (styled as button) --- */}
      <div style={{ marginTop: '1em' }}>
        <a href="/" className="auth-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          Return to Main App
        </a>
      </div>
      {/* ------------------------------------------------ */}
    </div>
  );
}
export default ProfilePage;
