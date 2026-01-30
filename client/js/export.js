const exportBtn = document.getElementById('exportDataBtn');
const exportStatus = document.getElementById('exportStatus');

if (exportBtn) {
  exportBtn.addEventListener('click', async () => {
    try {
      exportStatus.textContent = 'Preparing your data (CSV)...';

      const res = await fetch('http://localhost:5000/api/export');
      const data = await res.json();

      const moodsCSV = convertMoodsToCSV(data.moods || []);
      const tasksCSV = convertTasksToCSV(data.tasks || []);

      downloadCSV(moodsCSV, 'calmpath-moods.csv');
      downloadCSV(tasksCSV, 'calmpath-tasks.csv');

      exportStatus.textContent = 'Export complete. CSV files downloaded.';
    } catch (err) {
      console.error('Export error:', err);
      exportStatus.textContent = 'Failed to export data.';
    }
  });
}

function convertMoodsToCSV(moods) {
  const headers = [
    'Date','Mood','Intensity','Triggers','Note',
    'SleepHours','SleepQuality','ScreenTime',
    'EnergyLevel','FocusLevel','ActivityMinutes','StressLevel'
  ];

  const rows = moods.map(m => [
    formatDate(m.createdAt),
    safe(m.mood),
    safe(m.intensity),
    safe((m.triggers || []).join('; ')),
    safe(m.note),
    safe(m.sleepHours),
    safe(m.sleepQuality),
    safe(m.screenTime),
    safe(m.energyLevel),
    safe(m.focusLevel),
    safe(m.activityMinutes),
    safe(m.stressLevel)
  ]);

  return buildCSV(headers, rows);
}

function convertTasksToCSV(tasks) {
  const headers = [
    'Title','DueDate','DueTime',
    'Completed','CompletedAt','CreatedAt'
  ];

  const rows = tasks.map(t => [
    safe(t.title),
    safe(t.dueDate),
    safe(t.dueTime),
    safe(t.completed),
    formatDate(t.completedAt),
    formatDate(t.createdAt)
  ]);

  return buildCSV(headers, rows);
}

function buildCSV(headers, rows) {
  const csvRows = [];
  csvRows.push(headers.join(','));

  rows.forEach(row => {
    const escaped = row.map(v =>
      `"${String(v ?? '').replace(/"/g, '""')}"`
    );
    csvRows.push(escaped.join(','));
  });

  return csvRows.join('\n');
}

function downloadCSV(csvText, filename) {
  const blob = new Blob([csvText], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10);
}

function safe(val) {
  return val === undefined || val === null ? '' : val;
}
