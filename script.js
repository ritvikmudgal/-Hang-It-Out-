// Toggle theme: since only matte black, we'll just toggle icon
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", function () {
  if (themeToggle.textContent === "☀️") {
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "☀️";
  }
});

// Open Modals
document.querySelector('.login-btn').addEventListener('click', function () {
  document.getElementById('login-modal').classList.add('show');
});
document.querySelector('.signup-btn').addEventListener('click', function () {
  document.getElementById('signup-modal').classList.add('show');
});

// Close Modals
document.getElementById('close-login').addEventListener('click', function () {
  document.getElementById('login-modal').classList.remove('show');
});
document.getElementById('close-signup').addEventListener('click', function () {
  document.getElementById('signup-modal').classList.remove('show');
});

// Close on outside click
document.getElementById('login-modal').addEventListener('click', function (event) {
  if (event.target === this) this.classList.remove('show');
});
document.getElementById('signup-modal').addEventListener('click', function (event) {
  if (event.target === this) this.classList.remove('show');
});

// Form submissions for demo ONLY (Redirect if you want post-submit action)
document.querySelector('.login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Login submitted!');
  document.getElementById('login-modal').classList.remove('show');
});
document.querySelector('.signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Sign Up submitted!');
  document.getElementById('signup-modal').classList.remove('show');
});

document.querySelector('.login-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form processing
  window.location.href = "dashboard/index.html";
});



document.getElementById("getstarted-btn").addEventListener("click", function () {
  alert('Get Started Modal Placeholder');
});