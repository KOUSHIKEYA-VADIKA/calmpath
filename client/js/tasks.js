const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: String,
  dueTime: String,
  completed: { type: Boolean, default: false },
  completedAt: Date
}, { timestamps: true });   // ✅ THIS LINE IS REQUIRED

module.exports = mongoose.model('Task', TaskSchema);
