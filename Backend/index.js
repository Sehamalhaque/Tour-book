require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const tour = require('./routes/tour');
const guide = require('./routes/guide');
const transaction = require('./routes/transaction')

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/tour', tour);
app.use('/api/auth', authRoutes);
app.use('/guide', guide);
app.use('/transaction', transaction);


// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

