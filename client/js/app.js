const submitBtn = document.getElementById('submitMood');
const suggestionsDiv = document.getElementById('suggestions');

submitBtn.addEventListener('click', async () => {
  const mood = document.getElementById('mood').value;
  const intensity = Number(document.getElementById('intensity').value);
  const triggersInput = document.getElementById('triggers').value;
  const note = document.getElementById('note').value;

  const triggers = triggersInput
    .split(',')
    .map(t => t.trim())
    .filter(t => t);

  const moodData = { mood, intensity, triggers, note };

  try {
    // 1. Save mood
    await fetch('http://localhost:5000/api/moods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(moodData)
    });

    // 2. Get suggestions
    const res = await fetch('http://localhost:5000/api/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(moodData)
    });

    const data = await res.json();
    showSuggestions(data.suggestions);

  } catch (error) {
    console.error('Error:', error);
    suggestionsDiv.innerHTML = '<p>Error getting suggestions.</p>';
  }
});

function showSuggestions(suggestions) {
  if (!suggestions || suggestions.length === 0) {
    suggestionsDiv.innerHTML = '<p>No specific suggestions. Try a general breathing exercise.</p>';
    return;
  }

  let html = '';
  suggestions.forEach(s => {
    html += `
      <div class="suggestion">
        <p><strong>Why:</strong> ${s.explain}</p>
        <ul>
          ${s.actions.map(a => `<li>${a.type}: ${a.id || a.text}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  suggestionsDiv.innerHTML = html;
}// ======================
// Breathing Timer Logic (Start / Stop)
// ======================

const startBreathingBtn = document.getElementById('startBreathing');
const breathingCircle = document.getElementById('breathingCircle');
const breathingPhase = document.getElementById('breathingPhase');
const breathingCount = document.getElementById('breathingCount');

let breathingInterval = null;
let isBreathingActive = false;

startBreathingBtn.addEventListener('click', toggleBreathingExercise);

function toggleBreathingExercise() {
  if (isBreathingActive) {
    stopBreathingExercise();
  } else {
    startBreathingExercise();
  }
}

function startBreathingExercise() {
  isBreathingActive = true;
  startBreathingBtn.textContent = 'Stop Breathing';

  let phase = 'inhale';
  let count = 4;

  breathingPhase.textContent = 'Inhale';
  breathingCircle.classList.add('inhale');
  breathingCircle.classList.remove('exhale');
  breathingCount.textContent = count;

  breathingInterval = setInterval(() => {
    count--;

    if (count <= 0) {
      if (phase === 'inhale') {
        phase = 'exhale';
        count = 6;
        breathingPhase.textContent = 'Exhale';
        breathingCircle.classList.remove('inhale');
        breathingCircle.classList.add('exhale');
      } else {
        phase = 'inhale';
        count = 4;
        breathingPhase.textContent = 'Inhale';
        breathingCircle.classList.remove('exhale');
        breathingCircle.classList.add('inhale');
      }
    }

    breathingCount.textContent = count;
  }, 1000);
}

function stopBreathingExercise() {
  isBreathingActive = false;
  clearInterval(breathingInterval);
  breathingInterval = null;

  breathingPhase.textContent = 'Stopped';
  breathingCount.textContent = '0';
  breathingCircle.classList.remove('inhale', 'exhale');
  startBreathingBtn.textContent = 'Start Breathing';
}

