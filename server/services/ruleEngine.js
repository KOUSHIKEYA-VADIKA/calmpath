const Rule = require('../models/Rule');

const matchesRule = (moodLog, rule) => {
  const { mood, intensity, triggers } = moodLog;
  const cond = rule.conditions;

  if (cond.mood && cond.mood !== mood) return false;
  if (cond.minIntensity && intensity < cond.minIntensity) return false;

  if (cond.triggers && cond.triggers.length > 0) {
    const hasTrigger = triggers.some(t =>
      cond.triggers.includes(t)
    );
    if (!hasTrigger) return false;
  }

  return true;
};

const getSuggestionsForMood = async (moodLog) => {
  const rules = await Rule.find({ isActive: true });

  const matchedRules = rules.filter(rule =>
    matchesRule(moodLog, rule)
  );

  return matchedRules.map(rule => ({
    ruleId: rule.ruleId,
    explain: rule.explain,
    actions: rule.actions
  }));
};

module.exports = {
  getSuggestionsForMood
};
