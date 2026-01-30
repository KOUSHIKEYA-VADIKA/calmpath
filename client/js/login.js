document.getElementById('loginBtn').addEventListener('click', login);

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const status = document.getElementById('loginStatus');

  if (!username || !password) {
    status.textContent = 'Enter username and password';
    return;
  }

  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem('calmpathUser', username);
    window.location.href = 'index.html';
  } else {
    status.textContent = data.message || 'Login failed';
  }
}
