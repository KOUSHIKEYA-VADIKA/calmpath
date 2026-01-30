const express = require('express');
const router = express.Router();
const { getSuggestionsForMood } = require('../services/ruleEngine');

router.post('/', async (req, res) => {
  try {
    const moodLog = req.body;

    const suggestions = await getSuggestionsForMood(moodLog);

    res.json({
      suggestions,
      note: "These are self-regulation suggestions, not therapy."
    });
  } catch (error) {
    console.error('Suggestion error:', error);
    res.status(500).json({ message: 'Failed to get suggestions' });
  }
});

module.exports = router;
