const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Explicitly load the .env file from the backend folder
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Check if the environment variable for MongoDB is loaded correctly
console.log('Mongo URI:', process.env.MONGO_URI);

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

// Export Express app for Vercel
module.exports = app;

// If running locally or in dev mode, listen to the server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
