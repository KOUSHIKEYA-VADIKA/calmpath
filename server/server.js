require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const moodRoutes = require('./routes/moodRoutes');
const ruleRoutes = require('./routes/ruleRoutes');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/moods', moodRoutes);
app.use('/api/suggestions', ruleRoutes);


// Test Route
app.get('/', (req, res) => {
  res.send('CalmPath API is running successfully');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
