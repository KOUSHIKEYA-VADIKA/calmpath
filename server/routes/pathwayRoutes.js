// server/routes/pathwayRoutes.js

const express = require('express');
const router = express.Router();
const { getAllPathways, getPathwayById } = require('../services/pathwayService');

// GET /api/pathways
router.get('/', (req, res) => {
  res.json(getAllPathways());
});

// GET /api/pathways/:id
router.get('/:id', (req, res) => {
  const pathway = getPathwayById(req.params.id);

  if (!pathway) {
    return res.status(404).json({ message: 'Pathway not found' });
  }

  res.json(pathway);
});

module.exports = router;
