// src/backend/server.js
const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// Import the User model definition
const defineUserModel = require('./models/User');

const app = express();
const port = process.env.PORT || 3001; // Use a different port than the frontend
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a strong secret from env vars

// Middleware
app.use(cors()); // Allow requests from other origins (your frontend)
app.use(bodyParser.json()); // To parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // To parse application/x-www-form-urlencoded

// Database Connection (SQLite)
const dbPath = path.join(__dirname, 'database.sqlite');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath
});

// Define the User model
const User = defineUserModel(sequelize);

// Sync the database - This will create the 'users' table if it doesn't exist
sequelize.sync()
  .then(() => {
    console.log('Backend: Database synced (User table created/checked)');
    // Test the database connection after sync
    sequelize.authenticate()
      .then(() => console.log('Backend: Connected to SQLite database'))
      .catch(err => console.error('Backend: Unable to connect to the database:', err));
  })
  .catch(err => console.error('Backend: Error syncing database:', err));


// --- Authentication Routes ---

// Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = await User.create({ username, password, firstName, lastName });
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error('Backend: Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});


// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare provided password with hashed password in DB
    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour

    // Respond with token and user info (excluding password)
    res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username } });

  } catch (error) {
    console.error('Backend: Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Middleware to protect routes (verify JWT)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from 'Bearer TOKEN' format

  if (token == null) {
    return res.sendStatus(401); // If there's no token, return 401 Unauthorized
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.error('Backend: JWT verification error:', err);
      return res.sendStatus(403); // If token is invalid, return 403 Forbidden
    }
    req.user = user; // Attach user info from token payload to request object
    next(); // Proceed to the next middleware/route handler
  });
};

// Profile Route (Protected)
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    // req.user contains the user info from the JWT payload
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username'] // Select only necessary fields
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });

  } catch (error) {
    console.error('Backend: Profile error:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Change Password Route (Protected)
app.post('/api/change-password', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; // Get user ID from the authenticated token

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify old password
    const isPasswordValid = await user.validPassword(oldPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    // Update password (hashing is handled by the model hook)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Backend: Change password error:', error);
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
});


// Example test route (still here)
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend API working!' });
});
// -------------------------------------------------------------------

// Start the server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
