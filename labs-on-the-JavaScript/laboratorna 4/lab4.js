// Create an array of fruit names
let fruits = ["яблуко", "груша", "апельсин", "банан", "ківі"];
console.log("Початковий масив:", fruits);

// 1. Видалення останнього елементу з масиву та вставка нового 
let removedFruit = fruits.pop();
console.log("Видалений елемент:", removedFruit);
console.log("Масив після видалення останнього елемента:", fruits);

// 2. Додавання нового елементу в масив!
fruits.unshift("ананас");
console.log("Масив після додавання 'ананаса' на початок:", fruits);

// 3. Сортувати масив в зворотньому напрямку
fruits.sort().reverse();
console.log("Масив у зворотному алфавітному порядку:", fruits);

// 4. Знайти в елементі масиві яблуко!
let appleIndex = fruits.indexOf("яблуко");
console.log("Індекс елемента 'яблуко':", appleIndex);

// 1. Створення в масиві різних кольорів 
let colors = ["червоний", "синій", "зелений", "жовтий", "синій", "фіолетовий", "білий", "чорний"];
console.log("Масив кольорів:", colors);

// 2. Знайти довгий та короткий елемент в масиві
let shortestColor = colors.reduce((shortest, current) => 
    current.length < shortest.length ? current : shortest, colors[0]);
    
let longestColor = colors.reduce((longest, current) => 
    current.length > longest.length ? current : longest, colors[0]);
    
console.log("Найкоротший елемент:", shortestColor);
console.log("Найдовший елемент:", longestColor);

// 3. Видалення всіх елементів в масиві де є синій
let filteredColors = colors.filter(color => color !== "синій");
console.log("Масив без елементів 'синій':", filteredColors);

//Завдання 3 
// 1. Create an array of objects containing employee data (name, age, position)
let employees = [
    { Name: "Марія", вік: 28, посада: "розробник" },
    { Name: "Олександр", вік: 35, посада: "менеджер" },
    { Name: "Анна", вік: 26, посада: "розробник" },
    { Name: "Петро", вік: 42, посада: "директор" },
    { Name: "Ірина", вік: 31, посада: "розробник" }
  ];
  console.log("Початковий масив працівників:", employees);
  
  // 2. Sort the array alphabetically by employee names
  employees.sort((a, b) => a.вік.localeCompare(b.Name));
  console.log("Відсортований масив за іменами:", employees);
  
  // 3. Find all employees with the position "розробник"
  let developers = employees.filter(employee => employee.посада === "розробник");
  console.log("Працівники з посадою 'розробник':", developers);
  
  // 4. Remove employee by certain condition (e.g., by age)
  let removedEmployees = employees.filter(employee => employee.вік < 30);
  employees = employees.filter(employee => employee.вік >= 30);
  console.log("Видалені працівники (вік < 30):", removedEmployees);
  console.log("Масив після видалення:", employees);
  
  // 5. Add a new employee to the array and display the updated array
  employees.push({ Name: "Василь", "вік": "дизайнер" });  
  console.log("Оновлений масив після додавання нового працівника:", employees);

  //4 завдання

  // 1. Створення масиву студентів
let students = [
    { Name: "Олексій", вік: 20, курс: 2 },
    { Name: "Наталія", вік: 19, курс: 1 },
    { Name: "Михайло", вік: 22, курс: 3 },
    { Name: "Софія", вік: 21, курс: 3 },
    { Name: "Андрій", вік: 20, курс: 2 }
  ];
  console.log("Початковий масив студентів:", students);
  
  // 2. Видалення студента з масиву!
  students = students.filter(student => student.Name !== "Олексій");
  console.log("Масив після видалення студента з ім'ям 'Олексій':", students);
  
  // 3. Додати студента в масив
  students.push({ Name: "Оксана", вік: 18, курс: 1 });
  console.log("Масив після додавання нового студента:", students);
  
  // 4. Сортування по віку з старих до молодих!
  students.sort((a, b) => b.вік - a.вік);
  console.log("Студенти відсортовані за віком (від найстаршого до наймолодшого):", students);
  
  // 5. Знайти студента який на 3 по списку
  let thirdYearStudents = students.filter(student => student.курс === 3);
  console.log("Студенти, які навчаються на 3-му курсі:", thirdYearStudents);

  //5 завдання
  // Task 5: Working with array methods (map, filter, reduce, splice)

// 1. Створення масиву
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Початковий масив чисел:", numbers);
// числа підняті до квадрату
let squaredNumbers = numbers.map(num => num * num);
console.log("Числа, підняті до квадрату:", squaredNumbers);

// 2. 
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Парні числа з масиву:", evenNumbers);

// 3. Знайти всі суми в елементів
let sum = numbers.reduce((total, current) => total + current, 0);
console.log("Сума всіх елементів масиву:", sum);

//Стоврення масиву з додатковими елементами в 1 масив spread метод
let additionalNumbers = [11, 12, 13, 14, 15];
let combinedArray = [...numbers, ...additionalNumbers];
console.log("Масив після додавання 5 нових чисел:", combinedArray);

//видалення з елементу 3 перші 
let removedElements = combinedArray.splice(0, 3);
console.log("Видалені перші 3 елементи:", removedElements);
console.log("Масив після видалення перших 3 елементів:", combinedArray);

//6 завдання 
// Створення бібліотеки 
function libraryManagement() {
  // 1. Створення масиву з книжками
  let books = [
    { title: "Гаррі Поттер", author: "Джоан Роулінг", genre: "фентезі", pages: 320, isAvailable: true },
    { title: "1984", author: "Джордж Орвелл", genre: "антиутопія", pages: 328, isAvailable: true },
    { title: "Кобзар", author: "Тарас Шевченко", genre: "поезія", pages: 840, isAvailable: false }
  ];
  
  // 2. Додавання нової книги 
  function addBook(title, author, genre, pages) {
    const newBook = {
      title,
      author,
      genre,
      pages,
      isAvailable: true
    };
    books.push(newBook);
    return books;
  }
  
  // 3. Видалення книжки по назві!
  function removeBook(title) {
    const initialLength = books.length;
    books = books.filter(book => book.title !== title);
    
    if (books.length === initialLength) {
      return `Книгу "${title}" не знайдено в бібліотеці`;
    }
    return `Книгу "${title}" видалено з бібліотеки`;
  }
  
  // 4. Знайти книжку по автору 
  function findBooksByAuthor(author) {
    const authorBooks = books.filter(book => book.author === author);
    return authorBooks;
  }
  
  // 5. Перемикач доступності книги (позичена/повернута)
  function toggleBookAvailability(title, isBorrowed) {
    const bookIndex = books.findIndex(book => book.title === title);
    
    if (bookIndex === -1) {
      return `Книгу "${title}" не знайдено в бібліотеці`;
    }
    
    books[bookIndex].isAvailable = !isBorrowed;
    const status = books[bookIndex].isAvailable ? "повернута" : "взята";
    return `Книга "${title}" ${status}`;
  }
  
  // 6. Cортування по кількості сторінок
  function sortBooksByPages() {
    return [...books].sort((a, b) => a.pages - b.pages);
  }
  
  // 7. Отримання статистики про книжку
  function getBooksStatistics() {
    const totalBooks = books.length;
    const availableBooks = books.filter(book => book.isAvailable).length;
    const borrowedBooks = totalBooks - availableBooks;
    
    //Отримання середньої кількості сторінок
    const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
    const averagePages = totalBooks > 0 ? Math.round(totalPages / totalBooks) : 0;
    
    return {
      totalBooks,
      availableBooks,
      borrowedBooks,
      averagePages
    };
  }
  
  // Повернути всі функції для взаємодії з бібліотекою
  return {
    getAllBooks: () => books,
    addBook,
    removeBook,
    findBooksByAuthor,
    toggleBookAvailability,
    sortBooksByPages,
    getBooksStatistics
  };
}

// Використання
const library = libraryManagement();

// Початковий показ бібліотеки
console.log("Початкова бібліотека:", library.getAllBooks());

// Додавання нової книжки
library.addBook("Кобзар", "Тарас Шевченко", "класика", 256);
console.log("Після додавання нової книги:", library.getAllBooks());

// Видалення книжки
console.log(library.removeBook("1984"));
console.log("Після видалення книги:", library.getAllBooks());

// Знайти книжку по автору
console.log("Книги автора 'Тарас Шевченко':", library.findBooksByAuthor("Тарас Шевченко"));

// Переключити доступність бронювання
console.log(library.toggleBookAvailability("Гаррі Поттер", true));
console.log("Після зміни статусу книги:", library.getAllBooks());

// Сортування книжок по кількості сторінки
console.log("Книги, відсортовані за кількістю сторінок:", library.sortBooksByPages());

// Отримати статистику бібліотеки
console.log("Статистика бібліотеки:", library.getBooksStatistics());

//7 завдання

// 1. Створення об'єкта студента дані (name, age, year)
let student = {
  name: "Олександр",
  вік: 20,
  курс: 2
};
console.log("Початковий об'єкт студента:", student);

// 2. додавання властивості в виді предметів 
student.предмети = ["Математика", "Фізика", "Програмування", "Англійська мова"];
console.log("Об'єкт після додавання списку предметів:", student);

// 3. Видалити властивість «вік» з об'єкта
delete student.вік;
console.log("Об'єкт після видалення властивості 'вік':", student);

// 4. Відображення оновленого об'єкта в консолі
console.log("Оновлений об'єкт студента:", student);