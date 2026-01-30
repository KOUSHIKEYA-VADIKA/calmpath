let intensityChart = null;
let routineChart = null;

const rangeSelect = document.getElementById('dashboardRange');

async function loadDashboard() {
  const range = rangeSelect.value;

  try {
    const res = await fetch(`http://localhost:5000/api/moods/summary?range=${range}`);
    const data = await res.json();

    renderLineChart(data.lineData || []);
    renderBarChart(data.barData || {});
  } catch (err) {
    console.error('Failed to load dashboard', err);
  }
}

// ======================
// Line Chart (Mood Intensity)
// ======================

function renderLineChart(lineData) {
  const ctx = document.getElementById('intensityLineChart').getContext('2d');

  const labels = lineData.map(d => formatShortDate(d.date));
  const values = lineData.map(d => safeNumber(d.avgIntensity));

  if (intensityChart) intensityChart.destroy();

  intensityChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Average Mood Intensity',
        data: values,
        borderWidth: 2,
        tension: 0.35,     // smooth curve
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    }
  });
}

// ======================
// Bar Chart (Routine Averages)
// ======================

function renderBarChart(barData) {
  const ctx = document.getElementById('routineBarChart').getContext('2d');

  const labels = [
    'Sleep Hours',
    'Screen Time',
    'Activity Minutes',
    'Stress Level'
  ];

  const values = [
    safeNumber(barData.avgSleepHours),
    safeNumber(barData.avgScreenTime),
    safeNumber(barData.avgActivityMinutes),
    safeNumber(barData.avgStressLevel)
  ];

  if (routineChart) routineChart.destroy();

  routineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Routine Averages',
        data: values,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// ======================
// Helpers
// ======================

function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function safeNumber(val) {
  if (val === undefined || val === null || isNaN(val)) return 0;
  return Number(val.toFixed(1));
}

// ======================
// Events
// ======================

rangeSelect.addEventListener('change', loadDashboard);

// Load dashboard on page load
loadDashboard();
