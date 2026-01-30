const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');
const Task = require('../models/Task');

/* Export all data */
router.get('/', async (req, res) => {
  try {
    const moods = await MoodLog.find().sort({ createdAt: -1 });
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.json({ moods, tasks });
  } catch (err) {
    res.status(500).json({ message: 'Failed to export data' });
  }
});

/* Delete all data (2-step confirmation on frontend) */
router.delete('/all', async (req, res) => {
  try {
    await MoodLog.deleteMany({});
    await Task.deleteMany({});
    res.json({ message: 'All data deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete all data' });
  }
});

module.exports = router;
