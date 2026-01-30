const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String, // e.g., anxiety, sleep, stress
    required: true
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  source: {
    type: String // e.g., WHO, NHS, APA, book name
  },
  tags: [String],
  evidenceLevel: {
    type: String, // high, moderate, general
    default: 'general'
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', ResourceSchema);
