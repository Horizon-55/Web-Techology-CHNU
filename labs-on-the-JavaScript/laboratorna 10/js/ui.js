// UI Module (Functional)
let userCardsContainer = document.getElementById("user-cards");
let searchInput = document.getElementById("search-input");
let sortSelect = document.getElementById("sort-select");
let ageFilter = document.getElementById("age-filter");
let locationFilter = document.getElementById("location-filter");
let paginationContainer = document.getElementById("pagination");
const TOTAL_USERS = 100;
const usersPerPage = 30;
let currentPage = 1;

function init() {
  loadUsers();
  setupEventListeners();
  loadStateFromURL();
}

async function loadUsers() {
  try {
    const users = await userAPI.fetchUsers(currentPage, usersPerPage);
    renderUserCards(users);
    renderPagination();
  } catch (error) {
    console.error("Error loading users:", error);
  }
}

function setupEventListeners() {
  searchInput.addEventListener(
    "input",
    debounce(() => handleSearch(), 300)
  );
  sortSelect.addEventListener("change", handleSort);
  ageFilter.addEventListener("input", handleFilter);
  locationFilter.addEventListener("input", handleFilter);
}

function debounce(func, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), delay);
  };
}

function handleSearch() {
  const query = searchInput.value;
  const filteredUsers = userAPI.searchUsers(query);
  renderUserCards(filteredUsers);
  updateURLState();
}

function handleSort() {
  const sortBy = sortSelect.value;
  const sortedUsers = userAPI.sortUsers(userAPI.users, sortBy);
  renderUserCards(sortedUsers);
  updateURLState();
}

function handleFilter() {
  const filters = {
    age: ageFilter.value,
    location: locationFilter.value,
  };
  const filteredUsers = userAPI.filterUsers(userAPI.users, filters);
  renderUserCards(filteredUsers);
  updateURLState();
}

function renderUserCards(users) {
  userCardsContainer.innerHTML = "";
  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";
    // Format the date of birth
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
    userCardsContainer.appendChild(card);
  });
  setupFavoriteButtons();
}

function setupFavoriteButtons() {
  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const userId = e.target.dataset.id;
      const isFavorite = userAPI.toggleFavorite(userId);
      e.target.textContent = isFavorite ? "❤️" : "🤍";
    });
  });
}

function renderPagination() {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(TOTAL_USERS / usersPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = i === currentPage ? "active" : "";
    button.addEventListener("click", () => {
      currentPage = i;
      loadUsers();
      updateURLState();
    });
    paginationContainer.appendChild(button);
  }
}

function updateURLState() {
  const params = new URLSearchParams();
  params.set("page", currentPage);
  params.set("search", searchInput.value);
  params.set("sort", sortSelect.value);
  params.set("age", ageFilter.value);
  params.set("location", locationFilter.value);
  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, "", newURL);
}

function loadStateFromURL() {
  const params = new URLSearchParams(window.location.search);
  currentPage = parseInt(params.get("page")) || 1;
  searchInput.value = params.get("search") || "";
  sortSelect.value = params.get("sort") || "name-asc";
  ageFilter.value = params.get("age") || "";
  locationFilter.value = params.get("location") || "";
  loadUsers();
}

// Export as a single object for easy use
const ui = {
  init,
  loadUsers,
  setupEventListeners,
  handleSearch,
  handleSort,
  handleFilter,
  renderUserCards,
  setupFavoriteButtons,
  renderPagination,
  updateURLState,
  loadStateFromURL,
};

// Initialize UI
ui.init();
