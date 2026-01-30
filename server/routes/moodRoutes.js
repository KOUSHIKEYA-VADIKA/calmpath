const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');


// =========================================
// GET /api/moods/summary?range=7 or 30
// MUST COME FIRST
// =========================================
router.get('/summary', async (req, res) => {
  try {
    const range = parseInt(req.query.range) || 7;

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - range);

    const logs = await MoodLog.find({
      createdAt: { $gte: sinceDate }
    });

    const dailyMap = {};

    logs.forEach(log => {
      const dateKey = log.createdAt.toISOString().slice(0, 10);

      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = { total: 0, count: 0 };
      }

      dailyMap[dateKey].total += log.intensity;
      dailyMap[dateKey].count += 1;
    });

    const lineData = Object.keys(dailyMap).map(date => ({
      date,
      avgIntensity: dailyMap[date].total / dailyMap[date].count
    }));

    const avg = (field) => {
      const valid = logs.filter(l => typeof l[field] === 'number');
      if (valid.length === 0) return 0;
      return valid.reduce((sum, l) => sum + l[field], 0) / valid.length;
    };

    const barData = {
      avgSleepHours: avg('sleepHours'),
      avgScreenTime: avg('screenTime'),
      avgActivityMinutes: avg('activityMinutes'),
      avgStressLevel: avg('stressLevel')
    };

    res.json({
      range,
      lineData,
      barData
    });

  } catch (error) {
    console.error('Dashboard summary error:', error.message);
    res.status(500).json({ message: 'Failed to load dashboard summary' });
  }
});


// ===============================
// POST /api/moods
// ===============================
router.post('/', async (req, res) => {
  try {
    const {
      mood,
      intensity,
      triggers,
      note,
      sleepHours,
      sleepQuality,
      screenTime,
      energyLevel,
      focusLevel,
      activityMinutes,
      stressLevel
    } = req.body;

    const newMood = new MoodLog({
      mood,
      intensity,
      triggers,
      note,
      sleepHours,
      sleepQuality,
      screenTime,
      energyLevel,
      focusLevel,
      activityMinutes,
      stressLevel
    });

    const savedMood = await newMood.save();
    res.status(201).json(savedMood);

  } catch (error) {
    console.error('Error saving mood:', error.message);
    res.status(500).json({ message: 'Failed to save mood log' });
  }
});


// ===============================
// GET /api/moods
// ===============================
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
