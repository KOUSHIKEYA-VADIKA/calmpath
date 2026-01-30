const submitBtn = document.getElementById('submitMood');
const suggestionsDiv = document.getElementById('suggestions');

submitBtn.addEventListener('click', async () => {
  const mood = document.getElementById('mood').value;
  const intensity = Number(document.getElementById('intensity').value);
  const triggersInput = document.getElementById('triggers').value;
  const note = document.getElementById('note').value;

  // Routine inputs (NEW)
  const sleepHours = Number(document.getElementById('sleepHours').value) || null;
  const sleepQuality = Number(document.getElementById('sleepQuality').value) || null;
  const screenTime = Number(document.getElementById('screenTime').value) || null;
  const energyLevel = Number(document.getElementById('energyLevel').value) || null;
  const focusLevel = Number(document.getElementById('focusLevel').value) || null;
  const activityMinutes = Number(document.getElementById('activityMinutes').value) || null;
  const stressLevel = Number(document.getElementById('stressLevel').value) || null;

  const triggers = triggersInput
    .split(',')
    .map(t => t.trim())
    .filter(t => t);

  const moodData = {
    mood,
    intensity,
    triggers,
    note,

    // Routine fields
    sleepHours,
    sleepQuality,
    screenTime,
    energyLevel,
    focusLevel,
    activityMinutes,
    stressLevel
  };

  try {
    // 1. Save mood + routine
    await fetch('http://localhost:5000/api/moods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(moodData)
    });

    // 2. Get suggestions (still based on mood/intensity)
    const res = await fetch('http://localhost:5000/api/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, intensity, triggers, note })
    });

    const data = await res.json();
    showSuggestions(data.suggestions);

    // Optional UX: Clear some fields
    document.getElementById('note').value = '';
    document.getElementById('triggers').value = '';

    alert('Daily check-in saved successfully!');

  } catch (error) {
    console.error('Error:', error);
    suggestionsDiv.innerHTML = '<p>Error saving check-in or getting suggestions.</p>';
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
}


// ======================
// Breathing Timer Logic (Start / Stop)
// ======================

// ======================
// Improved Breathing Timer Logic
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
  startBreathingBtn.textContent = 'Stop breathing';

  let phase = 'inhale';
  let count = 4;

  setPhase(phase, count);

  breathingInterval = setInterval(() => {
    count--;

    if (count <= 0) {
      if (phase === 'inhale') {
        phase = 'hold';
        count = 4;
      } else if (phase === 'hold') {
        phase = 'exhale';
        count = 6;
      } else {
        phase = 'inhale';
        count = 4;
      }
      setPhase(phase, count);
    }

    breathingCount.textContent = count;
  }, 1000);
}

function setPhase(phase, count) {
  breathingPhase.textContent =
    phase === 'inhale' ? 'Inhale slowly' :
    phase === 'hold' ? 'Hold' :
    'Exhale slowly';

  breathingCircle.classList.remove('inhale', 'exhale');

  if (phase === 'inhale') {
    breathingCircle.classList.add('inhale');
  }

  if (phase === 'exhale') {
    breathingCircle.classList.add('exhale');
  }

  breathingCount.textContent = count;
}

function stopBreathingExercise() {
  isBreathingActive = false;
  clearInterval(breathingInterval);
  breathingInterval = null;

  breathingPhase.textContent = 'Stopped';
  breathingCount.textContent = '0';
  breathingCircle.classList.remove('inhale', 'exhale');
  startBreathingBtn.textContent = 'Start breathing';
}

/* ========================= */
/* Logout */
/* ========================= */

const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    if (!confirm('Log out of CalmPath?')) return;
    localStorage.removeItem('calmpathUser');
    window.location.href = 'login.html';
  });
}

/* ========================= */
/* Delete All My Data */
/* ========================= */

const deleteAllBtn = document.getElementById('deleteAllDataBtn');
const deleteStatus = document.getElementById('deleteStatus');

if (deleteAllBtn) {
  deleteAllBtn.addEventListener('click', async () => {
    const first = confirm('This will permanently delete ALL your data. Continue?');
    if (!first) return;

    const second = confirm('This cannot be undone. Are you absolutely sure?');
    if (!second) return;

    deleteStatus.textContent = 'Deleting all data...';

    const res = await fetch('http://localhost:5000/api/export/all', {
      method: 'DELETE'
    });

    if (res.ok) {
      deleteStatus.textContent = 'All data deleted successfully.';
      location.reload();
    } else {
      deleteStatus.textContent = 'Failed to delete data.';
    }
  });
}
// ======================
// Grounding Technique (5-4-3-2-1)
// ======================

// ======================
// Interactive Grounding (5-4-3-2-1 with input)
// ======================

const groundingBox = document.getElementById('groundingBox');

const interactiveGroundingSteps = [
  { label: "👀 Name 5 things you can see", count: 5 },
  { label: "✋ Name 4 things you can feel", count: 4 },
  { label: "👂 Name 3 things you can hear", count: 3 },
  { label: "👃 Name 2 things you can smell", count: 2 },
  { label: "👅 Name 1 thing you can taste or a positive thought", count: 1 }
];

let interactiveIndex = 0;

function renderGroundingStep() {
  const step = interactiveGroundingSteps[interactiveIndex];

  let inputs = '';
  for (let i = 0; i < step.count; i++) {
    inputs += `<input class="input" placeholder="Type here..." style="margin-top:6px">`;
  }

  return `
    <div>
      <strong>${step.label}</strong>
      <div style="margin-top:6px">${inputs}</div>
      <button class="btn-ghost" style="margin-top:10px" onclick="nextInteractiveGrounding()">
        Next
      </button>
    </div>
  `;
}

function startInteractiveGrounding() {
  if (!groundingBox) return;
  interactiveIndex = 0;
  groundingBox.innerHTML = renderGroundingStep();
}

function nextInteractiveGrounding() {
  interactiveIndex++;

  if (interactiveIndex < interactiveGroundingSteps.length) {
    groundingBox.innerHTML = renderGroundingStep();
  } else {
    groundingBox.innerHTML = `
      <div>
        🌿 Grounding complete.<br>
        Take a slow breath and notice how you feel now.
      </div>
    `;
  }
}
