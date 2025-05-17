// Authentication Module
class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.init();
  }

  init() {
    // Check for existing session
    const userData = localStorage.getItem("user");
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.isAuthenticated = true;
      this.showMainContent();
    } else {
      this.showAuthForm();
    }

    // Event Listeners
    document
      .getElementById("login-form")
      .addEventListener("submit", (e) => this.handleLogin(e));
    document
      .getElementById("show-register")
      .addEventListener("click", (e) => this.toggleAuthForm(e));
    document
      .getElementById("logout-btn")
      .addEventListener("click", () => this.handleLogout());
  }

  showAuthForm() {
    document.getElementById("auth-section").classList.remove("hidden");
    document.getElementById("main-content").classList.add("hidden");
  }

  showMainContent() {
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    document.getElementById("user-name").textContent =
      this.currentUser?.name || "User";
  }

  async handleLogin(e) {
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
      this.currentUser = userData;
      this.isAuthenticated = true;
      this.showMainContent();

      // Clear form
      e.target.reset();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  }

  handleLogout() {
    localStorage.removeItem("user");
    this.currentUser = null;
    this.isAuthenticated = false;
    this.showAuthForm();
  }

  toggleAuthForm(e) {
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
}

// Initialize Auth
const auth = new Auth();
