// header bg reveal 
const headerBG = () => {
    const header = document.querySelector('.js-header');
    window.addEventListener('scroll', function () {
        if (this.scrollY > 0) {
            header.classList.add("bg-reveal");
        }
        else {
            header.classList.remove("bg-reveal");
        }
    });
}
headerBG();
// вставка в батьківський контейнер введення адреси! 4 завдання!
const CheckBox = document.querySelector('#Email-checkbox');
const parentContainer = document.querySelector('.input-Email');
let EmailInput = document.createElement('input');
function ifChecked() {
    if (CheckBox.checked === true) {
        EmailInput.classList.toggle('input-control');
        EmailInput.setAttribute("type", "email");
        EmailInput.placeholder = 'Email';
        parentContainer.appendChild(EmailInput);
    } else {
        EmailInput.classList.remove('input-control');
        EmailInput.removeAttribute("type");
        EmailInput.remove();
    }
}
CheckBox.addEventListener('click', ifChecked);
// ганвігація 
const navigation = () => {
    const navToggler = document.querySelector('.js-nav-toggler');
    const nav = document.querySelector('.js-nav');
    const navItems = nav.querySelectorAll('li');
    const navToggle = () => {
        nav.classList.toggle('open'); // тут працює перемикач
        navToggler.classList.toggle('active');
    }
    navToggler.addEventListener('click', navToggle);

    navItems.forEach((li) => {
        li.querySelector('a').addEventListener('click', () => {
            if (window.innerWidth <= 767)
                navToggle();
        });
    });
}
navigation();
// запуск анімації бібліотеки
window.addEventListener('load', () => {
    const preloader = document.querySelector('.js-preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
        //Анімація на екранні
        AOS.init();
    }, 600);
});
// вбудувати в footer сайту логотип 2 завдання!
const GetLogo = () => {
    const FullLogo = document.getElementById('GetFullLogo');
    const InputFooterLogo = document.getElementById('Js_InputLogoName');
    InputFooterLogo.innerHTML = FullLogo.innerHTML;
};
GetLogo();
// Вивести в консоль значення продукцій через GetElementsByName 3 завдання
const GetValue = () => {
    const GetBasicPrice = document.getElementsByName('BasicPrice');
    const GetStandartPrice = document.getElementsByName('StandartPrice');
    const GetPremiumPrice = document.getElementsByName('PremiumPrice');
    const BasicPriceConvert = Array.from(GetBasicPrice).map((element) => element.textContent.replace('$', '')).filter((value) => value !== '').map((value) => parseInt(value));
    const StandartPriceConvert = Array.from(GetStandartPrice).map((element) => element.textContent.replace('$', '')).filter((value) => value !== '').map((value) => parseInt(value));
    const PremiumPriceConvert = Array.from(GetPremiumPrice).map((element) => element.textContent.replace('$', '')).filter((value) => value !== '').map((value) => parseInt(value));
    let AllArrPrices = [...BasicPriceConvert, ...StandartPriceConvert, ...PremiumPriceConvert];
    //console.table(AllArrPrices);
};
GetValue();