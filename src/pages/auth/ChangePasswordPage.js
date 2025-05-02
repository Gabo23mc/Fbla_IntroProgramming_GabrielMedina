import React, { useState } from 'react';
import { changePassword, logoutUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await changePassword(oldPassword, newPassword);
      setSuccess('Password changed!');
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      setError(err.message || 'Password change failed');
      if (err.status === 401 || err.status === 403) {
        logoutUser();
        navigate('/login');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Change Password</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <label>
          Old Password
          <input
            className="auth-input"
            type="password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
            autoFocus
            placeholder="Enter your old password" // Added placeholder
          />
        </label>
        <label>
          New Password
          <input
            className="auth-input"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            placeholder="Enter your new password" // Added placeholder
          />
        </label>
        <button className="auth-button" type="submit">Change Password</button>
      </form>

      {/* --- Back to Profile Link (styled as button) --- */}
      <div style={{ marginTop: '1em' }}>
        <a href="/profile" className="auth-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          Back to Profile
        </a>
      </div>
      {/* -------------------------------------------- */}

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

export default ChangePasswordPage;
