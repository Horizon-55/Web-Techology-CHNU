// Отримання елементів
const redLight = document.getElementById('red');
const yellowLight = document.getElementById('yellow');
const greenLight = document.getElementById('green');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const nextBtn = document.getElementById('nextBtn');

// Отримати відстані введення
const redDurationInput = document.getElementById('redDuration');
const yellowDurationInput = document.getElementById('yellowDuration');
const greenDurationInput = document.getElementById('greenDuration');
const blinkCountInput = document.getElementById('blinkCount');

//статус світлофора
const STATES = {
    RED: 'red',
    YELLOW: 'yellow',
    GREEN: 'green',
    YELLOW_BLINKING: 'yellow_blinking'
};

let currentState = null;
let timerRef = null;
let blinkTimerRef = null;
let blinkCount = 0;
let isRunning = false;

// функція виключення світла
function resetLights() {
    redLight.className = 'light red';
    yellowLight.className = 'light yellow';
    greenLight.className = 'light green';
}

// Функція зміни стану світла
function changeState(state) {
    resetLights();
    currentState = state;
    
    switch(state) {
        case STATES.RED:
            redLight.className = 'light red active-red';
            statusDisplay.textContent = 'RED - Stop!';
            break;
            
        case STATES.YELLOW:
            yellowLight.className = 'light yellow active-yellow';
            statusDisplay.textContent = 'YELLOW - Prepare!';
            break;
            
        case STATES.GREEN:
            greenLight.className = 'light green active-green';
            statusDisplay.textContent = 'GREEN - Go!';
            break;
            
        case STATES.YELLOW_BLINKING:
            statusDisplay.textContent = 'YELLOW BLINKING - Prepare to stop!';
            startBlinking();
            break;
    }
}

// Функція отримання відстані 
function getDurations() {
    return {
        red: parseInt(redDurationInput.value) * 1000,
        yellow: parseInt(yellowDurationInput.value) * 1000,
        green: parseInt(greenDurationInput.value) * 1000,
        blinkCount: parseInt(blinkCountInput.value)
    };
}

// Функція початку блимання жовтого світла
function startBlinking() {
    const durations = getDurations();
    blinkCount = 0;
    
    function blinkYellow() {
        if (blinkCount < durations.blinkCount) {
            yellowLight.classList.toggle('active-yellow');
            blinkCount++;
            blinkTimerRef = setTimeout(blinkYellow, 500);
        } else {
            if (isRunning) {
                changeState(STATES.RED);
                scheduleNextState();
            }
        }
    }
    
    blinkYellow();
}

// Заплануйте наступний перехід стану
function scheduleNextState() {
    if (!isRunning) return;
    
    const durations = getDurations();
    
    clearTimeout(timerRef);
    
    switch(currentState) {
        case STATES.RED:
            timerRef = setTimeout(() => {
                changeState(STATES.YELLOW);
                scheduleNextState();
            }, durations.red);
            break;
            
        case STATES.YELLOW:
            timerRef = setTimeout(() => {
                changeState(STATES.GREEN);
                scheduleNextState();
            }, durations.yellow);
            break;
            
        case STATES.GREEN:
            timerRef = setTimeout(() => {
                changeState(STATES.YELLOW_BLINKING);
                // Наступний стан буде заплановано після завершення миготіння
            }, durations.green);
            break;
    }
}

// Функція запуску світлофора
function startTrafficLight() {
    if (isRunning) return;
    
    isRunning = true;
    changeState(STATES.RED);
    scheduleNextState();
    startBtn.textContent = "Restart";
}

// Функція зупинки світлофора
function stopTrafficLight() {
    isRunning = false;
    clearTimeout(timerRef);
    clearTimeout(blinkTimerRef);
    resetLights();
    statusDisplay.textContent = "Stopped";
    startBtn.textContent = "Start Traffic Light";
}

// Функція ручного переходу до наступного стану
function goToNextState() {
    clearTimeout(timerRef);
    clearTimeout(blinkTimerRef);
    
    if (!currentState) {
        changeState(STATES.RED);
        return;
    }
    
    switch(currentState) {
        case STATES.RED:
            changeState(STATES.YELLOW);
            break;
            
        case STATES.YELLOW:
            changeState(STATES.GREEN);
            break;
            
        case STATES.GREEN:
            changeState(STATES.YELLOW_BLINKING);
            break;
            
        case STATES.YELLOW_BLINKING:
            clearTimeout(blinkTimerRef);
            changeState(STATES.RED);
            break;
    }
    
    if (isRunning) {
        scheduleNextState();
    }
}

// Слухачі для застосування!
startBtn.addEventListener('click', startTrafficLight);
stopBtn.addEventListener('click', stopTrafficLight);
nextBtn.addEventListener('click', goToNextState);

// Інціалізація
resetLights();