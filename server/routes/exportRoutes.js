const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');
const Task = require('../models/Task');

// GET /api/export
// Export user data (privacy-first)
router.get('/', async (req, res) => {
  try {
    const moods = await MoodLog.find().sort({ createdAt: -1 });
    const tasks = await Task.find().sort({ createdAt: -1 });

    const exportData = {
      exportedAt: new Date(),
      moods,
      tasks
    };

    res.json(exportData);
  } catch (error) {
    console.error('Export failed:', error.message);
    res.status(500).json({ message: 'Failed to export data' });
  }
});

module.exports = router;
