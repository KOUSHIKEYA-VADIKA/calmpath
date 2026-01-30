const mongoose = require('mongoose');

const MoodLogSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  intensity: { type: Number, required: true },
  triggers: [String],
  note: String,

  sleepHours: Number,
  sleepQuality: Number,
  screenTime: Number,
  energyLevel: Number,
  focusLevel: Number,
  activityMinutes: Number,
  stressLevel: Number
}, { timestamps: true });

module.exports = mongoose.models.MoodLog 
  || mongoose.model('MoodLog', MoodLogSchema);
