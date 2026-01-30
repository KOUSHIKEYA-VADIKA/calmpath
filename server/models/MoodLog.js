const mongoose = require('mongoose');

const MoodLogSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true
  },
  intensity: {
    type: Number,
    required: true
  },
  triggers: [String],
  note: String,

  // Routine & lifestyle fields (NEW)
  sleepHours: Number,
  sleepQuality: Number,   // 1–5
  screenTime: Number,     // hours
  energyLevel: Number,    // 1–5
  focusLevel: Number,     // 1–5
  activityMinutes: Number,
  stressLevel: Number,    // 1–5

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MoodLog', MoodLogSchema);
