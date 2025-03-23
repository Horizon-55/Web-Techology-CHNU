// Глобальні змінні
let isOn = false;
let brightness = 50;
let autoOffTimer;
let inactivityTimeout = 5 * 60 * 1000; // 5 хвилин
let countdownInterval;
let timeLeft = inactivityTimeout;

// Отримання елементів DOM
const lightbulb = document.getElementById('lightbulb');
const toggleBtn = document.getElementById('toggleBtn');
const brightnessBtn = document.getElementById('brightnessBtn');
const bulbType = document.getElementById('bulbType');
const statusText = document.getElementById('statusText');
const brightnessText = document.getElementById('brightnessText');
const timerText = document.getElementById('timerText');

// Функція включення/виключення лампочки
function toggleLight() {
    isOn = !isOn;
    
    if (isOn) {
        lightbulb.classList.remove('off');
        lightbulb.classList.add('on');
        statusText.textContent = 'Включено';
        toggleBtn.textContent = 'Виключити';
        
        // Встановлюємо яскравість
        lightbulb.style.filter = `brightness(${brightness/100})`;
        
        // Запускаємо таймер автовимкнення
        startAutoOffTimer();
    } else {
        lightbulb.classList.remove('on');
        lightbulb.classList.add('off');
        statusText.textContent = 'Виключено';
        toggleBtn.textContent = 'Включити';
        
        // Скидаємо яскравість до стандартної
        lightbulb.style.filter = 'brightness(0.5)';
        
        // Зупиняємо таймер
        clearAutoOffTimer();
    }
}

// Функція зміни типу лампочки
function changeBulbType() {
    // Видаляємо всі класи типів лампочок
    lightbulb.classList.remove('regular', 'energy-saving', 'led');
    
    // Додаємо новий клас відповідно до вибраного типу
    lightbulb.classList.add(bulbType.value);
    
    // Оновлюємо доступність кнопки яскравості
    updateBrightnessButtonState();
}

// Функція зміни яскравості
function changeBrightness() {
    // Перевіряємо, чи можливо змінювати яскравість для даного типу лампочки
    if (bulbType.value === 'regular') {
        alert('Звичайна лампочка не підтримує зміну яскравості');
        return;
    }
    
    // Запитуємо у користувача нове значення яскравості
    const newBrightness = prompt('Введіть значення яскравості (від 10 до 100):', brightness);
    
    // Перевіряємо введене значення
    if (newBrightness === null) return; // Користувач натиснув "Скасувати"
    
    const brightnessValue = parseInt(newBrightness);
    
    if (isNaN(brightnessValue) || brightnessValue < 10 || brightnessValue > 100) {
        alert('Будь ласка, введіть число від 10 до 100');
        return;
    }
    
    // Оновлюємо яскравість
    brightness = brightnessValue;
    brightnessText.textContent = `${brightness}%`;
    
    // Якщо лампочка включена, застосовуємо нову яскравість
    if (isOn) {
        lightbulb.style.filter = `brightness(${brightness/100})`;
    }
    
    // Скидаємо таймер при взаємодії користувача
    resetInactivityTimer();
}

// Функція оновлення стану кнопки яскравості
function updateBrightnessButtonState() {
    if (bulbType.value === 'regular') {
        brightnessBtn.disabled = true;
    } else {
        brightnessBtn.disabled = false;
    }
}

// Функції для автоматичного вимкнення
function startAutoOffTimer() {
    // Очищаємо попередні таймери
    clearAutoOffTimer();
    
    // Встановлюємо новий таймер автовимкнення
    timeLeft = inactivityTimeout;
    updateTimerDisplay();
    
    countdownInterval = setInterval(updateTimerDisplay, 1000);
    autoOffTimer = setTimeout(() => {
        if (isOn) {
            toggleLight();
        }
    }, inactivityTimeout);
}

function clearAutoOffTimer() {
    clearTimeout(autoOffTimer);
    clearInterval(countdownInterval);
}

function resetInactivityTimer() {
    if (isOn) {
        clearAutoOffTimer();
        startAutoOffTimer();
    }
}

// Функція оновлення відображення таймера
function updateTimerDisplay() {
    timeLeft -= 1000;
    if (timeLeft <= 0) {
        timerText.textContent = '0:00';
        return;
    }
    
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Встановлення обробників подій
toggleBtn.addEventListener('click', () => {
    toggleLight();
    resetInactivityTimer();
});

brightnessBtn.addEventListener('click', () => {
    changeBrightness();
});

bulbType.addEventListener('change', () => {
    changeBulbType();
    resetInactivityTimer();
});

// Встановлення обробника для відстеження бездіяльності користувача
['mousemove', 'mousedown', 'keypress', 'touchstart', 'click'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer);
});

// Ініціалізація
updateBrightnessButtonState();