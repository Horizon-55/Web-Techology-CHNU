// API Module (Functional)
let users = [];
let favorites = new Set(JSON.parse(localStorage.getItem("favorites") || "[]"));
const baseUrl = "https://randomuser.me/api/";

async function fetchUsers(page = 1, results = 30) {
  try {
    const response = await fetch(
      `${baseUrl}?page=${page}&results=${results}&seed=abc`
    );
    const data = await response.json();
    users = data.results.map((user) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      phone: user.phone,
      picture: user.picture.large,
      age: user.dob.age,
      dob: user.dob.date,
      location: `${user.location.city}, ${user.location.country}`,
      registered: new Date(user.registered.date),
    }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

function searchUsers(query) {
  if (!query) return users;
  const searchTerm = query.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.location.toLowerCase().includes(searchTerm)
  );
}

function sortUsers(userList, sortBy) {
  const sortedUsers = [...userList];
  switch (sortBy) {
    case "name-asc":
      return sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    case "age-asc":
      return sortedUsers.sort((a, b) => a.age - b.age);
    case "age-desc":
      return sortedUsers.sort((a, b) => b.age - a.age);
    default:
      return sortedUsers;
  }
}

function filterUsers(userList, filters) {
  return userList.filter((user) => {
    if (filters.age && user.age !== parseInt(filters.age)) return false;
    if (
      filters.location &&
      !user.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;
    return true;
  });
}

function toggleFavorite(userId) {
  if (favorites.has(userId)) {
    favorites.delete(userId);
  } else {
    favorites.add(userId);
  }
  localStorage.setItem("favorites", JSON.stringify([...favorites]));
  return favorites.has(userId);
}

function isFavorite(userId) {
  return favorites.has(userId);
}

function getFavorites() {
  return users.filter((user) => favorites.has(user.id));
}

// Export as a single object for easy use
const userAPI = {
  fetchUsers,
  searchUsers,
  sortUsers,
  filterUsers,
  toggleFavorite,
  isFavorite,
  getFavorites,
  get users() {
    return users;
  },
};
