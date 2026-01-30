const mongoose = require('mongoose');

const MoodLogSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  triggers: {
    type: [String],
    default: []
  },
  note: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MoodLog', MoodLogSchema);
