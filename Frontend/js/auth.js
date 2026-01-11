// Signup Form
const signupForm = document.getElementById('signupForm');
if(signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    if (!username || !email || !password) {
      message.textContent = 'All fields are required';
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, email, password})
      });
      const data = await res.json();
      if(res.ok){
        message.style.color = 'green';
        message.textContent = data.message;
        signupForm.reset();
      } else {
        message.style.color = 'red';
        message.textContent = data.error;
      }
    } catch (err) {
      message.style.color = 'red';
      message.textContent = 'Server error';
    }
  });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if(loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    if (!email || !password) {
      message.textContent = 'All fields are required';
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });
      const data = await res.json();
      if(res.ok){
        message.style.color = 'green';
        message.textContent = `Welcome, ${data.user.username}`;
        loginForm.reset();
      } else {
        message.style.color = 'red';
        message.textContent = data.error;
      }
    } catch (err) {
      message.style.color = 'red';
      message.textContent = 'Server error';
    }
    if(res.ok){
  message.style.color = 'green';
  localStorage.setItem('token', data.token); // Store JWT
  message.textContent = `Welcome, ${data.user.username}`;
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
}

  });
}
