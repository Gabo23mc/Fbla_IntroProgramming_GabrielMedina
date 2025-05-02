import React, { useState } from 'react';
import { registerUser } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerUser(username, password, firstName, lastName);
      setSuccess('Registration successful! You can now login.');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <label htmlFor="register-firstname">First Name</label>
        <input
          id="register-firstname"
          className="auth-input"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
          autoFocus
        />
        <label htmlFor="register-lastname">Last Name</label>
        <input
          id="register-lastname"
          className="auth-input"
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          className="auth-input"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          className="auth-input"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">Register</button>
      </form>
      <div className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
