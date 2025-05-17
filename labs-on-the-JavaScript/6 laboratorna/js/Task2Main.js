// DOM елементи
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const sortButtons = document.querySelectorAll('.sort-btn');

// Модель даних - чисті функції для роботи з завданнями
const TaskModel = (() => {
    // Створення нового завдання
    const createTask = (text) => ({
        id: Date.now().toString(),
        text: text,
        completed: false,
        dateAdded: new Date(),
        dateUpdated: new Date()
    });

    // Завершення завдання
    const toggleTaskCompletion = (task) => ({
        ...task,
        completed: !task.completed,
        dateUpdated: new Date()
    });

    // Редагування тексту завдання
    const updateTaskText = (task, newText) => ({
        ...task,
        text: newText,
        dateUpdated: new Date()
    });

    // Сортування завдань
    const sortTasks = (tasks, sortBy) => {
        const tasksCopy = [...tasks];
        
        switch (sortBy) {
            case 'date-added':
                return tasksCopy.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            case 'completion':
                return tasksCopy.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);
            case 'date-updated':
                return tasksCopy.sort((a, b) => new Date(b.dateUpdated) - new Date(a.dateUpdated));
            default:
                return tasksCopy;
        }
    };
    
    return {
        createTask,
        toggleTaskCompletion,
        updateTaskText,
        sortTasks
    };
})();

// Утіліти форматування та допоміжні функції
const Utils = (() => {
    // Форматування дати
    const formatDate = (date) => {
        const options = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return new Date(date).toLocaleString('uk-UA', options);
    };

    // Зберігання даних у localStorage
    const saveTasksToStorage = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Завантаження даних з localStorage
    const loadTasksFromStorage = () => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    };

    return {
        formatDate,
        saveTasksToStorage,
        loadTasksFromStorage
    };
})();

// Контролер для керування UI та логікою
const TaskController = ((model, utils) => {
    let tasks = utils.loadTasksFromStorage();
    let currentSortMethod = 'date-added';

    // Ініціалізація додатку
    const init = () => {
        renderTasks();
        addEventListeners();
    };

    // Додавання обробників подій
    const addEventListeners = () => {
        addTaskBtn.addEventListener('click', handleAddTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleAddTask();
        });

        sortButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const sortMethod = btn.getAttribute('data-sort');
                setActiveSortMethod(sortMethod);
            });
        });
    };

    // Обробка додавання нового завдання
    const handleAddTask = () => {
        const text = taskInput.value.trim();
        
        if (text) {
            const newTask = model.createTask(text);
            tasks = [newTask, ...tasks];
            
            utils.saveTasksToStorage(tasks);
            renderTasks();
            
            taskInput.value = '';
            taskInput.focus();
        }
    };

    // Обробка видалення завдання
    const handleDeleteTask = (taskId) => {
        const taskElement = document.getElementById(`task-${taskId}`);
        taskElement.classList.add('deleting');
        
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== taskId);
            utils.saveTasksToStorage(tasks);
            renderTasks();
        }, 500);
    };

    // Обробка зміни статусу завдання
    const handleToggleCompletion = (taskId) => {
        tasks = tasks.map(task => 
            task.id === taskId ? model.toggleTaskCompletion(task) : task
        );
        
        utils.saveTasksToStorage(tasks);
        renderTasks();
    };

    // Обробка редагування тексту завдання
    const handleUpdateTaskText = (taskId, newText) => {
        tasks = tasks.map(task => 
            task.id === taskId ? model.updateTaskText(task, newText) : task
        );
        
        utils.saveTasksToStorage(tasks);
        renderTasks();
    };

    // Встановлення активного методу сортування
    const setActiveSortMethod = (sortMethod) => {
        currentSortMethod = sortMethod;
        
        sortButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-sort') === sortMethod);
        });
        
        renderTasks();
    };

    // Рендеринг списку завдань
    const renderTasks = () => {
        const sortedTasks = model.sortTasks(tasks, currentSortMethod);
        
        // Очищення списку
        taskList.innerHTML = '';
        
        if (sortedTasks.length === 0) {
            taskList.innerHTML = '<li class="empty-list">Поки що немає завдань. Додайте нове завдання вище!</li>';
            return;
        }
        
        // Додавання завдань у список
        sortedTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.id = `task-${task.id}`;
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <input type="text" class="task-text" value="${task.text}" maxlength="100">
                <span class="task-date" title="Дата оновлення: ${utils.formatDate(task.dateUpdated)}">
                    ${utils.formatDate(task.dateAdded)}
                </span>
                <div class="task-actions">
                    <button class="task-btn delete-btn" title="Видалити завдання">❌</button>
                </div>
            `;
            
            taskList.appendChild(taskItem);
            
            // Додавання обробників подій до елементів завдання
            const checkbox = taskItem.querySelector('.task-checkbox');
            const textInput = taskItem.querySelector('.task-text');
            const deleteBtn = taskItem.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', () => handleToggleCompletion(task.id));
            
            textInput.addEventListener('blur', (e) => {
                const newText = e.target.value.trim();
                if (newText && newText !== task.text) {
                    handleUpdateTaskText(task.id, newText);
                } else {
                    e.target.value = task.text; // Повернути оригінальний текст
                }
            });
            
            textInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.target.blur();
                }
            });
            
            deleteBtn.addEventListener('click', () => handleDeleteTask(task.id));
        });
    };

    return {
        init
    };
})(TaskModel, Utils);

// Запуск додатку після завантаження DOM
document.addEventListener('DOMContentLoaded', TaskController.init); 