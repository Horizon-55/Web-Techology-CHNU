// тема кольорів
const themeColor = () => {
    const hueSlider = document.querySelector('.js-hue-slider');
    const html = document.querySelector('html');
    const setHue = (value) => {
        html.style.setProperty("--hue", value);
        document.querySelector(".js-hue").innerHTML = value;
    };

    hueSlider.addEventListener("input", function () {
        setHue(this.value);
        localStorage.setItem("--hue", this.value);
    });
    const slider = (value) => {
        hueSlider.value = value;
    }
    // перевірка чи є у клієнта конфіг про відтіннок 
    if (localStorage.getItem('--hue') !== null) {
        setHue(localStorage.getItem("--hue"));
        slider(localStorage.getItem("--hue"));
    } else {
        // звичайне значення насиченність
        const hue = getComputedStyle(html).getPropertyValue('--hue');
        setHue(hue);
        slider(hue.split(" ").join(""));
    }
}
themeColor();
// тема нічна та світла тема 
const themeLightDark = () => {
    const DarkModeCheckBox = document.querySelector('.js-dark-mode');

    const themeMode = () => {
        if (localStorage.getItem('theme-dark') === 'false')
            document.body.classList.remove('t-dark');
        else
            document.body.classList.add('t-dark');
    }

    DarkModeCheckBox.addEventListener('click', function() {
        // установка темного режиму в локальному середовищі
        localStorage.setItem('theme-dark', this.checked);
        themeMode();
    });
    //тут ми витягуєм з локального сховища назву змінної та ставить галочки
    if (localStorage.getItem('theme-dark') !== null)
        themeMode();
    
    if (document.body.classList.contains('t-dark'))
        DarkModeCheckBox.checked = true;
    
}
themeLightDark();

// стиль переключатель
const styleSwticherToggle = () => {
    const StyleSwitcher = document.querySelector('.js-style-switcher');
    const StyleSwitcherToggler = document.querySelector('.js-style-swither-toggler');
    
    StyleSwitcherToggler.addEventListener('click', function() {
        StyleSwitcher.classList.toggle('open');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-cog');
    });
}
styleSwticherToggle();