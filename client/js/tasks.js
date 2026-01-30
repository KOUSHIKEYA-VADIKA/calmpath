const taskListDiv = document.getElementById('taskList');
const streakBox = document.getElementById('streakBox');
const badgeBox = document.getElementById('badgeBox');

document.getElementById('addTaskBtn').addEventListener('click', addTask);

async function addTask() {
  const title = document.getElementById('taskTitle').value;
  const dueDate = document.getElementById('taskDate').value;
  const dueTime = document.getElementById('taskTime').value;

  console.log('Adding task:', { title, dueDate, dueTime }); // DEBUG

  if (!title) return alert('Enter task title');

  const res = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, dueDate, dueTime })
  });

  console.log('Task POST status:', res.status); // DEBUG

  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskTime').value = '';

  loadTasks();
}

async function loadTasks() {
  const res = await fetch('http://localhost:5000/api/tasks');
  const tasks = await res.json();

  taskListDiv.innerHTML = tasks.map(t => `
    <div class="suggestion">
      <strong>${t.title}</strong><br>
      <small>${t.dueDate || ''} ${t.dueTime || ''}</small><br>
      ${t.completed 
  ? '✅ Completed' 
  : `<button onclick="completeTask('${t._id}')">Mark Done</button>`
}
<button onclick="deleteTask('${t._id}')" style="margin-left:6px">
  🗑️ Delete
</button>

    </div>
  `).join('');

  calculateStreakAndBadges(tasks);
}

async function completeTask(id) {
  await fetch(`http://localhost:5000/api/tasks/${id}/complete`, {
    method: 'PUT'
  });
  loadTasks();
}

/* ========================= */
/* Streak + Badge Logic */
/* ========================= */

function calculateStreakAndBadges(tasks) {
  const completed = tasks.filter(t => t.completed && t.completedAt);
  const dates = completed.map(t => new Date(t.completedAt).toDateString());

  const uniqueDates = [...new Set(dates)].sort(
    (a,b) => new Date(a) - new Date(b)
  );

  let streak = 0;
  for (let i = uniqueDates.length - 1; i > 0; i--) {
    const diff = (new Date(uniqueDates[i]) - new Date(uniqueDates[i-1])) / (1000*60*60*24);
    if (diff === 1) streak++;
    else break;
  }
  if (uniqueDates.length > 0) streak++;

  streakBox.textContent = `🔥 Current streak: ${streak} day(s)`;

  const total = completed.length;
  let badges = [];

  if (total >= 1) badges.push('🏅 Fresh Start');
  if (streak >= 3) badges.push('🔥 Consistency Champ');
  if (total >= 5) badges.push('💪 Resilience Builder');
  if (streak >= 5) badges.push('🌟 Focus Hero');
  if (total >= 10) badges.push('🌈 Wellbeing Warrior');

  badgeBox.textContent = badges.length
    ? `Badges: ${badges.join(' · ')}`
    : 'No badges yet — your journey begins 🌱';
}

// Initial load
loadTasks();
async function deleteTask(id) {
  if (!confirm('Delete this task?')) return;

  await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: 'DELETE'
  });

  loadTasks();
}

