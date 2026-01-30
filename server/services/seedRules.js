require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Rule = require('../models/Rule');

const seedRules = async () => {
  await connectDB();

  await Rule.deleteMany();

  await Rule.insertMany([
    {
      ruleId: "anxiety_exam_high",
      conditions: {
        mood: "anxious",
        minIntensity: 5,
        triggers: ["exams", "studies"]
      },
      actions: [
        { type: "intervention", id: "box_breathing" },
        { type: "resource", id: "grounding_5_4_3_2_1" }
      ],
      explain: "High anxiety related to academic stress",
      cooldownMinutes: 30
    },
    {
      ruleId: "low_mood_low_energy",
      conditions: {
        mood: "low",
        minIntensity: 4,
        triggers: ["sleep", "tired"]
      },
      actions: [
        { type: "intervention", id: "tiny_task" },
        { type: "suggestion", text: "Try a 5-minute walk or stretch" }
      ],
      explain: "Low mood with low energy patterns",
      cooldownMinutes: 60
    }
  ]);

  console.log("Sample rules seeded");
  process.exit();
};

seedRules();
