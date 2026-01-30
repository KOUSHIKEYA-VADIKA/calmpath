const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: String,
  dueTime: String,
  completed: { type: Boolean, default: false },
  completedAt: Date
}, { timestamps: true });

module.exports = mongoose.models.Task 
  || mongoose.model('Task', TaskSchema);
