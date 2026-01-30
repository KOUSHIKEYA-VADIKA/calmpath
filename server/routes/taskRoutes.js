const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/* Create task */
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

/* Get all tasks */
router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

/* Mark task completed */
router.put('/:id/complete', async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: true, completedAt: new Date() },
    { new: true }
  );
  res.json(task);
});

/* Delete task */
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;
