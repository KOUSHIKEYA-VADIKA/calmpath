const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');

// @route   POST /api/moods
// @desc    Save a new mood log
router.post('/', async (req, res) => {
  try {
    const { mood, intensity, triggers, note } = req.body;

    const newMood = new MoodLog({
      mood,
      intensity,
      triggers,
      note
    });

    const savedMood = await newMood.save();
    res.status(201).json(savedMood);
  } catch (error) {
    console.error('Error saving mood:', error.message);
    res.status(500).json({ message: 'Failed to save mood log' });
  }
});

// @route   GET /api/moods
// @desc    Get all mood logs
router.get('/', async (req, res) => {
  try {
    const moods = await MoodLog.find().sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    console.error('Error fetching moods:', error.message);
    res.status(500).json({ message: 'Failed to fetch mood logs' });
  }
});

module.exports = router;
