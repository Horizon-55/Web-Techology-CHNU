// UI Module
class UI {
  constructor() {
    this.userCardsContainer = document.getElementById("user-cards");
    this.searchInput = document.getElementById("search-input");
    this.sortSelect = document.getElementById("sort-select");
    this.ageFilter = document.getElementById("age-filter");
    this.locationFilter = document.getElementById("location-filter");
    this.paginationContainer = document.getElementById("pagination");
    this.TOTAL_USERS = 100;
    this.usersPerPage = 30;
    this.currentPage = 1;
    this.init();
  }

  init() {
    this.loadUsers();
    this.setupEventListeners();
    this.loadStateFromURL();
  }

  async loadUsers() {
    try {
      const users = await userAPI.fetchUsers(
        this.currentPage,
        this.usersPerPage
      );
      this.renderUserCards(users);
      this.renderPagination();
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  setupEventListeners() {
    this.searchInput.addEventListener(
      "input",
      this.debounce(() => this.handleSearch(), 300)
    );
    this.sortSelect.addEventListener("change", () => this.handleSort());
    this.ageFilter.addEventListener("input", () => this.handleFilter());
    this.locationFilter.addEventListener("input", () => this.handleFilter());
  }

  debounce(func, delay) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
  }

  handleSearch() {
    const query = this.searchInput.value;
    const filteredUsers = userAPI.searchUsers(query);
    this.renderUserCards(filteredUsers);
    this.updateURLState();
  }

  handleSort() {
    const sortBy = this.sortSelect.value;
    const sortedUsers = userAPI.sortUsers(userAPI.users, sortBy);
    this.renderUserCards(sortedUsers);
    this.updateURLState();
  }

  handleFilter() {
    const filters = {
      age: this.ageFilter.value,
      location: this.locationFilter.value,
    };
    const filteredUsers = userAPI.filterUsers(userAPI.users, filters);
    this.renderUserCards(filteredUsers);
    this.updateURLState();
  }

  renderUserCards(users) {
    this.userCardsContainer.innerHTML = "";
    users.forEach((user) => {
      const card = document.createElement("div");
      card.className = "user-card";
      // Format the date of birth
      //console.log("User DOB:", user.dob); // Debug log
      //console.log("Parsed DOB:", dob); // Debug log
      const dob = new Date(user.dob);
      const formattedDob = dob.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      card.innerHTML = `
        <img src="${user.picture}" alt="${user.name}">
        <div class="user-info">
          <h3>${user.name}</h3>
          <p>Age: ${user.age}</p>
          <p>Date of Birth: ${formattedDob}</p>
          <p>Location: ${user.location}</p>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <button class="favorite-btn" data-id="${user.id}">
            ${userAPI.isFavorite(user.id) ? "❤️" : "🤍"}
          </button>
        </div>
      `;
      this.userCardsContainer.appendChild(card);
    });
    this.setupFavoriteButtons();
  }

  setupFavoriteButtons() {
    document.querySelectorAll(".favorite-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const userId = e.target.dataset.id;
        const isFavorite = userAPI.toggleFavorite(userId);
        e.target.textContent = isFavorite ? "❤️" : "🤍";
      });
    });
  }

  renderPagination() {
    this.paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(this.TOTAL_USERS / this.usersPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.className = i === this.currentPage ? "active" : "";
      button.addEventListener("click", () => {
        this.currentPage = i;
        this.loadUsers();
        this.updateURLState();
      });
      this.paginationContainer.appendChild(button);
    }
  }

  updateURLState() {
    const params = new URLSearchParams();
    params.set("page", this.currentPage);
    params.set("search", this.searchInput.value);
    params.set("sort", this.sortSelect.value);
    params.set("age", this.ageFilter.value);
    params.set("location", this.locationFilter.value);
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newURL);
  }

  loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    this.currentPage = parseInt(params.get("page")) || 1;
    this.searchInput.value = params.get("search") || "";
    this.sortSelect.value = params.get("sort") || "name-asc";
    this.ageFilter.value = params.get("age") || "";
    this.locationFilter.value = params.get("location") || "";
    this.loadUsers();
  }
}

// Initialize UI
const ui = new UI();
