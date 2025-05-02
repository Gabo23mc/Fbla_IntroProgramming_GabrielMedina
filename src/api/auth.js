// src/api/auth.js

const API_BASE_URL = 'http://localhost:3001/api';

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'API request failed');
    error.status = response.status;
    throw error;
  }
  return data;
};

export const registerUser = async (username, password, firstName, lastName) =>
  fetchWithAuth('/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, firstName, lastName }),
  });

export const loginUser = async (username, password) => {
  const data = await fetchWithAuth('/login', { method: 'POST', body: JSON.stringify({ username, password }) });
  if (data.token) {
    localStorage.setItem('token', data.token);
    // --- Store username here ---
    if (data.user && data.user.username) {
      localStorage.setItem('username', data.user.username);
    }
    // ---------------------------
  }
  return data;
};

export const fetchProfile = async () => fetchWithAuth('/profile');
export const changePassword = async (oldPassword, newPassword) =>
  fetchWithAuth('/change-password', { method: 'POST', body: JSON.stringify({ oldPassword, newPassword }) });

export const logoutUser = () => {
  localStorage.removeItem('token');
  // --- Also remove username on logout ---
  localStorage.removeItem('username');
  // ------------------------------------
};
