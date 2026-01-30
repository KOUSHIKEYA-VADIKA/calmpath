// client/js/interventions.js

const pathwaySelect = document.getElementById('pathwaySelect');
const startPathwayBtn = document.getElementById('startPathwayBtn');
const pathwayPlayerDiv = document.getElementById('pathwayPlayer');

let currentPathway = null;
let currentStepIndex = 0;

async function loadPathways() {
  try {
    const res = await fetch('http://localhost:5000/api/pathways');
    const pathways = await res.json();
    populateDropdown(pathways);
  } catch (err) {
    console.error('Failed to load pathways', err);
    pathwaySelect.innerHTML = '<option>Error loading pathways</option>';
  }
}

function populateDropdown(pathways) {
  pathways.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.name + ' — ' + p.description;
    pathwaySelect.appendChild(option);
  });
}

startPathwayBtn.addEventListener('click', () => {
  const selectedId = pathwaySelect.value;
  if (!selectedId) {
    alert('Please select a pathway first.');
    return;
  }
  startPathway(selectedId);
});

async function startPathway(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/pathways/${id}`);
    currentPathway = await res.json();
    currentStepIndex = 0;
    renderCurrentStep();
  } catch (err) {
    console.error('Failed to start pathway', err);
  }
}

function renderCurrentStep() {
  if (!currentPathway) return;

  const step = currentPathway.steps[currentStepIndex];

  pathwayPlayerDiv.innerHTML = `
    <h3>${currentPathway.name}</h3>
    <h4>Step ${currentStepIndex + 1} of ${currentPathway.steps.length}</h4>

    <div class="pathway-step-card">
      <p><strong>${step.title}</strong></p>
      <p><em>Duration:</em> ${step.duration}</p>
      <p><em>Why:</em> ${step.why}</p>
    </div>

    <div class="pathway-controls">
      <button onclick="prevStep()" ${currentStepIndex === 0 ? 'disabled' : ''}>Previous</button>
      <button onclick="nextStep()">
        ${currentStepIndex === currentPathway.steps.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  `;
}

function nextStep() {
  if (currentStepIndex < currentPathway.steps.length - 1) {
    currentStepIndex++;
    renderCurrentStep();
  } else {
    pathwayPlayerDiv.innerHTML = `
      <h3>${currentPathway.name}</h3>
      <p>Pathway completed. Well done for taking time to care for yourself.</p>
    `;
  }
}

function prevStep() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderCurrentStep();
  }
}

// Load dropdown on page load
loadPathways();
