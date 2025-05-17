// API Module
class UserAPI {
  constructor() {
    this.baseUrl = "https://randomuser.me/api/";
    this.users = [];
    this.favorites = new Set(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );
  }

  async fetchUsers(page = 1, results = 30) {
    try {
      const response = await fetch(
        `${this.baseUrl}?page=${page}&results=${results}&seed=abc`
      );
      const data = await response.json();
      this.users = data.results.map((user) => ({
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
      return this.users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  searchUsers(query) {
    if (!query) return this.users;
    const searchTerm = query.toLowerCase();
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.location.toLowerCase().includes(searchTerm)
    );
  }

  sortUsers(users, sortBy) {
    const sortedUsers = [...users];
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

  filterUsers(users, filters) {
    return users.filter((user) => {
      if (filters.age && user.age !== parseInt(filters.age)) return false;
      if (
        filters.location &&
        !user.location.toLowerCase().includes(filters.location.toLowerCase())
      )
        return false;
      return true;
    });
  }

  toggleFavorite(userId) {
    if (this.favorites.has(userId)) {
      this.favorites.delete(userId);
    } else {
      this.favorites.add(userId);
    }
    localStorage.setItem("favorites", JSON.stringify([...this.favorites]));
    return this.favorites.has(userId);
  }

  isFavorite(userId) {
    return this.favorites.has(userId);
  }

  getFavorites() {
    return this.users.filter((user) => this.favorites.has(user.id));
  }
}

// Initialize API
const userAPI = new UserAPI();
