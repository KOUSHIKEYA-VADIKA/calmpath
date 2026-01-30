require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const exportRoutes = require('./routes/exportRoutes');
const pathwayRoutes = require('./routes/pathwayRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const moodRoutes = require('./routes/moodRoutes');
const ruleRoutes = require('./routes/ruleRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/suggestions', ruleRoutes);
app.use('/api/pathways', pathwayRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/tasks', taskRoutes);





// Test Route
app.get('/', (req, res) => {
  res.send('CalmPath API is running successfully');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
