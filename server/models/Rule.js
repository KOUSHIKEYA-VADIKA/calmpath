const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  ruleId: {
    type: String,
    required: true,
    unique: true
  },
  conditions: {
    mood: String,
    minIntensity: Number,
    triggers: [String]
  },
  actions: [
    {
      type: {
        type: String   // intervention | resource | suggestion
      },
      id: String,
      text: String
    }
  ],
  explain: {
    type: String
  },
  cooldownMinutes: {
    type: Number,
    default: 30
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Rule', RuleSchema);
