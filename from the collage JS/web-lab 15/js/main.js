// 2 завдання при наведені курсора відображається поточний час! 
const GetDotcome = document.querySelector('.SetTime');
function SetTime() {
    const Now = new Date();
    const GetMinutes = Now.getMinutes();
    const GetHours = Now.getHours();
    let FullTime = `${GetHours}:${GetMinutes}`;
    return GetDotcome.innerHTML = FullTime;
};
function SetFullTime() {
    const Now = new Date();
    const GetDay = Now.getDate();
    const GetMounth = Now.getUTCMonth();
    const GetYear = Now.getFullYear();
    let FullData = `${GetDay}.${GetMounth}.${GetYear}`;
    return GetDotcome.innerHTML = FullData;
}
GetDotcome.addEventListener('mouseover', SetTime);
GetDotcome.addEventListener('mouseout', SetFullTime);
//3 завдання праця з логотипом після наведення курсору миші на логотип деякі зображення, з яких він складається, повинні замінюватися на більш яскраві
const ChangeLogo = document.querySelector('.contaier-logo');
const MyLogo1 = document.querySelector('.Mylogo');
const MyLogo2 = document.querySelector('.hidden');
ChangeLogo.addEventListener('mouseover', () => {
    MyLogo1.classList.add('hidden');
    MyLogo2.classList.remove('hidden');
});
ChangeLogo.addEventListener('mouseout', () => {
    MyLogo2.classList.add('hidden');
    MyLogo1.classList.remove('hidden');
});
//4 завдання Клацанням по логотипу повинно створюватися вікно 800x600px, в яке завантажиться головна сторінка сайту JavaScript.
const SendJsSite = document.querySelector('.SendJsSite');
const WindowConfig = "width=800,height=600";
const handle = window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'mozillaWindow', WindowConfig);
SendJsSite.querySelector('click', handle);