// ======================
// Day Context Logic (ImproVED)
// ======================

const dayTypeSelect = document.getElementById('dayTypeSelect');
const followupDiv = document.getElementById('dayContextFollowup');
const resultDiv = document.getElementById('dayContextResult');

dayTypeSelect.addEventListener('change', handleDayType);

function handleDayType() {
  const value = dayTypeSelect.value;

  followupDiv.innerHTML = '';
  resultDiv.textContent = '';

  if (value === 'low-energy') {
    showLowEnergyFlow();
  }

  if (value === 'recovery') {
    showRecoveryQuote();
  }

  if (value === 'high-focus') {
    showHighFocusQuote();
  }
}

// ======================
// LOW ENERGY FLOW
// ======================

function showLowEnergyFlow() {
  followupDiv.innerHTML = `
    <p class="small-muted">
      Today is a low-energy day. Let’s slow things down and support your nervous system.
    </p>

    <div class="flow">
      <p class="small-muted">
        Start with breathing, then grounding if your mind feels busy.
      </p>

      <button class="btn-ghost" id="goToBreathingBtn">
        🫁 Start gentle breathing
      </button>

      <button class="btn-ghost" id="goToGroundingBtn" style="margin-top:8px">
        🧠 Start grounding exercise
      </button>
    </div>
  `;

  document
    .getElementById('goToBreathingBtn')
    .addEventListener('click', () => {
      document.getElementById('startBreathing')?.click();
      resultDiv.textContent = 'Breathing started. Follow the circle slowly.';
    });

  document
    .getElementById('goToGroundingBtn')
    .addEventListener('click', () => {
      startInteractiveGrounding();
      resultDiv.textContent = 'Grounding started. Take it one step at a time.';
    });
}

// ======================
// RECOVERY DAY
// ======================

const recoveryQuotes = [
  "You don’t need to be productive to be worthy of rest.",
  "Healing is not linear. Be gentle with yourself today.",
  "Rest is an active part of recovery.",
  "It’s okay to move slowly today.",
  "Your body and mind are doing their best."
];

function showRecoveryQuote() {
  const q = getDailyRotatingQuote(recoveryQuotes);
  resultDiv.textContent = `🌱 ${q}`;
}

// ======================
// HIGH FOCUS DAY
// ======================

const focusQuotes = [
  "You’re showing up — that matters.",
  "Small focused steps lead to big outcomes.",
  "You’re capable of more than you think.",
  "Stay steady. You’re doing well.",
  "Your effort today is building your future."
];

function showHighFocusQuote() {
  const q = getDailyRotatingQuote(focusQuotes);
  resultDiv.textContent = `🚀 ${q}`;
}

// ======================
// Helper: Daily rotation (non-AI)
// ======================

function getDailyRotatingQuote(arr) {
  const dayIndex = new Date().getDate() % arr.length;
  return arr[dayIndex];
}

// ======================
// INTERACTIVE GROUNDING (LOW ENERGY)
// ======================

function startInteractiveGrounding() {
  const groundingBox = document.getElementById('groundingBox');
  if (!groundingBox) return;

  interactiveIndex = 0;
  groundingBox.innerHTML = renderGroundingStep();
}
