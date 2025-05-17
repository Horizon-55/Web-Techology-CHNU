// 1. Реалізація цифрового годинника
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            // Toggle the 'blink' class on the seconds separator every second
            const clockElement = document.getElementById('digital-clock');
            const timeString = `${hours}<span class="${now.getSeconds() % 2 === 0 ? 'blink' : ''}">:</span>${minutes}<span class="${now.getSeconds() % 2 === 0 ? 'blink' : ''}">:</span>${seconds}`;
            
            clockElement.innerHTML = timeString;
        }
        
        // Оновлюйте годинник негайно, а потім щосекунди
        updateClock();
        setInterval(updateClock, 1000);
        
        // 2. Реалізація таймера зворотного відліку
        let countdownInterval;
        
        function startCountdown() {
            const targetDateInput = document.getElementById('countdown-datetime').value;
            
            if (!targetDateInput) {
                alert("Please select a date and time");
                return;
            }
            
            const targetDate = new Date(targetDateInput);
            const now = new Date();
            
            if (targetDate <= now) {
                alert("Please select a future date and time");
                return;
            }
            
            // Почиситити кожний інтервал
            clearInterval(countdownInterval);
            
            function updateCountdown() {
                const now = new Date();
                const timeDifference = targetDate - now;
                
                if (timeDifference <= 0) {
                    clearInterval(countdownInterval);
                    document.getElementById('countdown-display').textContent = "Countdown completed!";
                    return;
                }
                
                // Calculate time components
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
                
                // Update the display
                document.getElementById('countdown-display').textContent = 
                    `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
            
            // Оновлення вчасно та кожної секунди!
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
        }
        
        document.getElementById('set-countdown').addEventListener('click', startCountdown);
        
        // 3. Календарна імплімітація
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        let currentDate = new Date();
        let selectedDate = null;
        let birthdayDate = null;
        let birthdayCountdownInterval;
        
        function initializeCalendar() {
            // Обрання місяці та тижні
            const monthSelect = document.getElementById('month-select');
            monthNames.forEach((month, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = month;
                monthSelect.appendChild(option);
            });
            
            // Заповнення вибір року (поточний рік - 100 до поточного року + 50)
            const yearSelect = document.getElementById('year-select');
            const currentYear = currentDate.getFullYear();
            for (let year = currentYear - 100; year <= currentYear + 50; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }
            
            // Встановіть поточні місяць і рік
            monthSelect.value = currentDate.getMonth();
            yearSelect.value = currentDate.getFullYear();
            
            //  Додати слухачів події
            monthSelect.addEventListener('change', () => {
                currentDate.setMonth(parseInt(monthSelect.value));
                renderCalendar();
            });
            
            yearSelect.addEventListener('change', () => {
                currentDate.setFullYear(parseInt(yearSelect.value));
                renderCalendar();
            });
            
            document.getElementById('prev-month').addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                monthSelect.value = currentDate.getMonth();
                yearSelect.value = currentDate.getFullYear();
                renderCalendar();
            });
            
            document.getElementById('next-month').addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                monthSelect.value = currentDate.getMonth();
                yearSelect.value = currentDate.getFullYear();
                renderCalendar();
            });
            
            // Початковий рендеринг
            renderCalendar();
        }
        
        function renderCalendar() {
            const calendarGrid = document.getElementById('calendar-grid');
            calendarGrid.innerHTML = '';
            
            // Додайте заголовки днів
            dayNames.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day-header';
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Обчислюємо перший день місяця
            const firstDay = new Date(year, month, 1);
            const startingDay = firstDay.getDay(); // 0 = неділя, 6 = Субота
            
            // Підрахуйте кількість днів у місяці
            const lastDay = new Date(year, month + 1, 0);
            const totalDays = lastDay.getDate();
            
            // Обчислити кількість днів від попереднього місяця
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            
            // Отримання сьогодні для виділення
            const today = new Date();
            const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
            
            // Створення днів календаря
            let day = 1;
            let nextMonthDay = 1;
            
            // Загальна кількість рядків у календарі (максимум 6 тижнів)
            for (let i = 0; i < 42; i++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                
                // Дні попереднього місяця
                if (i < startingDay) {
                    const prevMonthDay = prevMonthLastDay - startingDay + i + 1;
                    dayElement.textContent = prevMonthDay;
                    dayElement.className += ' other-month';
                }
                // Дні поточного місяця
                else if (day <= totalDays) {
                    dayElement.textContent = day;
                    
                    // Основні моменти сьогоднішнього дня
                    if (isCurrentMonth && day === today.getDate()) {
                        dayElement.className += ' current';
                    }
                    
                    // Виділіть обрану дату
                    if (selectedDate && 
                        selectedDate.getDate() === day && 
                        selectedDate.getMonth() === month && 
                        selectedDate.getFullYear() === year) {
                        dayElement.className += ' selected';
                    }
                    
                    // Додати подію кліку, щоб вибрати дату
                    dayElement.dataset.day = day;
                    dayElement.addEventListener('click', () => {
                        // Видалити попередній вибір
                        const selected = document.querySelector('.calendar-day.selected');
                        if (selected) {
                            selected.classList.remove('selected');
                        }
                        
                        // Додати на обраний день нажаття
                        dayElement.classList.add('selected');
                        
                        // Встановити конкретний день!
                        selectedDate = new Date(year, month, parseInt(dayElement.dataset.day));
                        
                        // Встановити день народження!
                        birthdayDate = new Date(
                            today.getFullYear(),  // Використовувати поточний день
                            month,                // Обраний місяць 
                            parseInt(dayElement.dataset.day)  // Обраний день!
                        );
                        
                        // Якщо день народження вже минув у цьому році, то перенести його на наступний рік
                        if (birthdayDate < today) {
                            birthdayDate.setFullYear(today.getFullYear() + 1);
                        }
                        
                        // Показати розділ результатів дня народження
                        document.getElementById('birthday-result').style.display = 'block';
                        
                        // Почніть відлік дня народження
                        startBirthdayCountdown();
                    });
                    
                    day++;
                }
                // Наступний місяці дні!
                else {
                    dayElement.textContent = nextMonthDay;
                    dayElement.className += ' other-month';
                    nextMonthDay++;
                }
                
                calendarGrid.appendChild(dayElement);
                
                // Перерва після останнього дня поточного місяця, якщо це останній рядок
                if (day > totalDays && (i + 1) % 7 === 0) 
                    break;
            }
        }
        
        // 4. Реалізація зворотного відліку дня народження
        function startBirthdayCountdown() {
            if (!birthdayDate) return;
            
            // Очистити будь-який існуючий інтервал
            clearInterval(birthdayCountdownInterval);
            
            function updateBirthdayCountdown() {
                const now = new Date();
                const timeDifference = birthdayDate - now;
                
                if (timeDifference <= 0) {
                    // Якщо день народження 
                    birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
                    updateBirthdayCountdown();
                    return;
                }
                
                // Розрахувати часові складові
                const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44));
                const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
                
                // Оновити про відобрадення місяців!
                document.getElementById('bd-months').textContent = months;
                document.getElementById('bd-days').textContent = days;
                document.getElementById('bd-hours').textContent = hours;
                document.getElementById('bd-minutes').textContent = minutes;
                document.getElementById('bd-seconds').textContent = seconds;
            }
            
            // Оновлення вчасно та встановлення інтервалу!
            updateBirthdayCountdown();
            birthdayCountdownInterval = setInterval(updateBirthdayCountdown, 1000);
        }
        
        // Інціалізація календаря коли сторінка загружається!
        document.addEventListener('DOMContentLoaded', initializeCalendar);