let Answer = document.getElementById('Answer');
function Getfulltime() {
    const Now = new Date();
    let currentHour = Now.getHours();
    let currentMinute = Now.getMinutes();
    const fullformattime = `${currentHour}:${currentMinute}`;
    return fullformattime;
};
let Fulltime = Getfulltime(); //теж стрінг перевірив
function GetHours() {
    const hours = new Date();
    let CurrentHours = hours.getHours();
    return CurrentHours;
};
let CurrentHours = GetHours(); //тут буде стрінг!
function GetMinutes() {
    const Minutes = new Date();
    let CurrentMinutes = Minutes.getMinutes();
    return CurrentMinutes;
};
let CurrentMinutes = GetMinutes(); //тут теж буде стрінг!
function WhenEndLesson(EndHours,EndMinutes) {
    if (EndHours && EndMinutes != null) {
        let IntEndHours = parseInt(EndHours);
        let IntEndMinutes = parseInt(EndMinutes);
        let FinishAnswerHours = IntEndHours - CurrentHours;
        let FinishAnswerMinutes = IntEndMinutes - CurrentMinutes;
        const FullAnswer = Answer.textContent = `залишилось ${FinishAnswerHours} годин та ${FinishAnswerMinutes} хвилин`; 
        return FullAnswer;
    }else Answer.textContent = 'Введіть годин та хвилини будь ласка';
};
let greeting = prompt(`Добрий день як вас звати?`);
let lesson = prompt(`Вітаю! ${greeting} яка у вас зараз пара?`);
let LessonAnswer = alert(`У вас зараз пара ${lesson} та зараз повна година ${Fulltime}`);
let EndHours = prompt(`В якій годині закінчиться пара? зараз годин ${CurrentHours}`); //тут стрінг перевірив!
let EndMinutes = prompt(`Та в якій хвилині закінчиться пара? зараз хвилин ${CurrentMinutes}`); // тут теж має бути стрінг!
WhenEndLesson(EndHours,EndMinutes);