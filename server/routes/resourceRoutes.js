const express = require('express');
const router = express.Router();
const { searchResources } = require('../services/searchService');

// GET /api/resources?query=stress
router.get('/', async (req, res) => {
  try {
    const query = req.query.query || '';
    const results = await searchResources(query);

    res.json({
      query,
      count: results.length,
      results
    });
  } catch (error) {
    console.error('Resource search error:', error);
    res.status(500).json({ message: 'Failed to search resources' });
  }
});

module.exports = router;
