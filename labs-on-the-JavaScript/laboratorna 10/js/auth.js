// Authentication Module (Functional)
let isAuthenticated = false;
let currentUser = null;

function init() {
  // Check for existing session
  const userData = localStorage.getItem("user");
  if (userData) {
    currentUser = JSON.parse(userData);
    isAuthenticated = true;
    showMainContent();
  } else {
    showAuthForm();
  }

  // Event Listeners
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document
    .getElementById("show-register")
    .addEventListener("click", toggleAuthForm);
  document.getElementById("logout-btn").addEventListener("click", handleLogout);
}

function showAuthForm() {
  document.getElementById("auth-section").classList.remove("hidden");
  document.getElementById("main-content").classList.add("hidden");
}

function showMainContent() {
  document.getElementById("auth-section").classList.add("hidden");
  document.getElementById("main-content").classList.remove("hidden");
  document.getElementById("user-name").textContent =
    currentUser?.name || "User";
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simulate API call
  try {
    // In a real application, this would be an API call
    const userData = {
      email,
      name: email.split("@")[0], // Simple name generation
      id: Date.now().toString(),
    };

    // Store user data
    localStorage.setItem("user", JSON.stringify(userData));
    currentUser = userData;
    isAuthenticated = true;
    showMainContent();

    // Clear form
    e.target.reset();
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again.");
  }
}

function handleLogout() {
  localStorage.removeItem("user");
  currentUser = null;
  isAuthenticated = false;
  showAuthForm();
}

function toggleAuthForm(e) {
  e.preventDefault();
  const form = document.getElementById("login-form");
  const isLogin =
    form.querySelector('button[type="submit"]').textContent === "Login";

  if (isLogin) {
    form.querySelector('button[type="submit"]').textContent = "Register";
    document.getElementById("show-register").textContent = "Login";
  } else {
    form.querySelector('button[type="submit"]').textContent = "Login";
    document.getElementById("show-register").textContent = "Register";
  }
}

// Export as a single object for easy use
const auth = {
  init,
  showAuthForm,
  showMainContent,
  handleLogin,
  handleLogout,
  toggleAuthForm,
  get isAuthenticated() {
    return isAuthenticated;
  },
  get currentUser() {
    return currentUser;
  },
};

// Initialize Auth
auth.init();
