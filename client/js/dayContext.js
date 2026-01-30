const dayTypeSelect = document.getElementById('dayTypeSelect');
const followupDiv = document.getElementById('dayContextFollowup');
const resultDiv = document.getElementById('dayContextResult');

/* ======================
   Data (Quotes & Techniques)
====================== */

const calmingTechniques = [
  'Take 5 slow breaths, counting each exhale.',
  'Place your feet on the ground and name 3 things you see.',
  'Relax your shoulders and unclench your jaw.',
  'Close your eyes for 30 seconds and scan your body for tension.',
  'Drink a glass of water slowly and mindfully.'
];

const motivationQuotes = [
  'Progress, not perfection.',
  'Even small steps count.',
  'Your effort today still matters.',
  'You don’t have to do everything at once.',
  'Rest is part of progress.',
  'Be gentle with yourself and keep going.',
  'Doing something is better than nothing.',
  'You’ve handled hard days before.',
  'Today’s effort still counts.',
  'Small wins still matter.'
];

const recoveryQuotes = [
  'Healing is not linear — and that’s okay.',
  'Today is for rest, not rushing.',
  'Slow days are still valuable days.',
  'You are allowed to pause.',
  'Gentleness is productive too.',
  'Your body and mind deserve care.',
  'Resting today supports tomorrow.',
  'Recovery is a form of strength.',
  'Taking care of yourself is not selfish.',
  'You are doing enough by resting.'
];

const focusQuotes = [
  'You are showing up — that matters.',
  'Your focus today is a strength.',
  'Keep going — you’re in a good rhythm.',
  'You are building something meaningful.',
  'Your effort today will pay off.',
  'You are capable and consistent.',
  'You’re making real progress.',
  'Stay with this momentum.',
  'Your discipline is paying off.',
  'You are doing great work today.'
];

/* ======================
   Helpers for ONE per day
====================== */

function getToday() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function getDailyItem(storageKey, list) {
  const today = getToday();
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');

  // If already saved for today, reuse it
  if (saved && saved.date === today) {
    return saved.value;
  }

  // Otherwise pick new and save for today
  const newValue = list[Math.floor(Math.random() * list.length)];

  localStorage.setItem(storageKey, JSON.stringify({
    date: today,
    value: newValue
  }));

  return newValue;
}

/* ======================
   Main Logic
====================== */

dayTypeSelect.addEventListener('change', () => {
  followupDiv.innerHTML = '';
  resultDiv.innerHTML = '';

  const dayType = dayTypeSelect.value;

  // LOW ENERGY
  if (dayType === 'low-energy') {
    followupDiv.innerHTML = `
      <label>What do you need right now?</label>
      <select id="lowEnergyNeed">
        <option value="">-- Choose --</option>
        <option value="calming">Calming technique</option>
        <option value="motivation">Motivation</option>
      </select>
    `;

    document
      .getElementById('lowEnergyNeed')
      .addEventListener('change', handleLowEnergy);
  }

  // RECOVERY DAY
  else if (dayType === 'recovery') {
    const quote = getDailyItem('dailyRecoveryQuote', recoveryQuotes);
    resultDiv.innerHTML = `💬 "${quote}"`;
  }

  // HIGH FOCUS DAY
  else if (dayType === 'high-focus') {
    const quote = getDailyItem('dailyFocusQuote', focusQuotes);
    resultDiv.innerHTML = `💬 "${quote}"`;
  }
});

function handleLowEnergy() {
  const need = document.getElementById('lowEnergyNeed').value;
  resultDiv.innerHTML = '';

  // CALMING
  if (need === 'calming') {
    const technique = getDailyItem('dailyCalmingTechnique', calmingTechniques);
    resultDiv.innerHTML = `🫁 Calming for today: "${technique}"`;
  }

  // MOTIVATION
  else if (need === 'motivation') {
    const quote = getDailyItem('dailyMotivationQuote', motivationQuotes);
    resultDiv.innerHTML = `💬 Motivation for today: "${quote}"`;
  }
}
