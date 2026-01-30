let intensityChart = null;
let routineChart = null;

const rangeSelect = document.getElementById('dashboardRange');

async function loadDashboard() {
  const range = rangeSelect.value;

  try {
    const res = await fetch(`http://localhost:5000/api/moods/summary?range=${range}`);
    const data = await res.json();

    renderLineChart(data.lineData);
    renderBarChart(data.barData);
  } catch (err) {
    console.error('Failed to load dashboard', err);
  }
}

function renderLineChart(lineData) {
  const ctx = document.getElementById('intensityLineChart').getContext('2d');

  const labels = lineData.map(d => d.date);
  const values = lineData.map(d => d.avgIntensity.toFixed(1));

  if (intensityChart) intensityChart.destroy();

  intensityChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Average Mood Intensity',
        data: values
      }]
    }
  });
}

function renderBarChart(barData) {
  const ctx = document.getElementById('routineBarChart').getContext('2d');

  const labels = ['Sleep Hours', 'Screen Time', 'Activity Minutes', 'Stress Level'];
  const values = [
    barData.avgSleepHours.toFixed(1),
    barData.avgScreenTime.toFixed(1),
    barData.avgActivityMinutes.toFixed(1),
    barData.avgStressLevel.toFixed(1)
  ];

  if (routineChart) routineChart.destroy();

  routineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Routine Averages',
        data: values
      }]
    }
  });
}

rangeSelect.addEventListener('change', loadDashboard);

// Load dashboard on page load
loadDashboard();
