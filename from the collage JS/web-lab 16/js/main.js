//1 завдання
const GetRadius = document.querySelector('#radius'); ///отримаєм від імпута число
//витягуємо довжину кола, площа круга, та обсєм кулі 
const GetLength = document.querySelector('#length');
const GetArea = document.querySelector('#area');
const GetVolume = document.querySelector('#volume');
//Витягуємо кнопку для розрахунку відповіді
const GetButtonResult = document.querySelector('.Buttons');
const Output = document.querySelector('#output');
function Zavd1Check() {
    let result;
    if (GetLength.checked) {
        //довжина кола обчислення
        result = 2 * Math.PI * GetRadius.value;
        return Output.value = result;
    }
    else if (GetArea.checked) {
        //Зона круга обчислення 
        result = Math.PI * Math.pow(GetRadius.value, 2);
        return Output.value = result;
    }
    else if (GetVolume.checked) {
        //Обчислення об'єму кулі
        result = (4 / 3) * Math.PI * Math.pow(GetRadius.value, 3); 
        return Output.value = result;
    } else if (GetLength || GetArea || GetVolume != checked) 
        // У випадку якщо нічого не вибрано із тих 3-ох радіобатонів
        return Output.value = "Нічого не вибрано!";
};
GetButtonResult.addEventListener('click', Zavd1Check);
//2 завдання 
const GetInputRadius2 = document.querySelector('#radius2');
const GetInputHeight2 = document.querySelector('#height2');
const GetRadioCone = document.querySelector('#cone2');
const GetRadioCylinder = document.querySelector('#cylinder2');
const GetButtonResult2 = document.querySelector('.Buttons2');
const OutputTextArea = document.querySelector('.ForTextArea');
function Zavd2Check() {
    let volume;
    if (GetRadioCone.checked) {
        volume = (1 / 3) * Math.PI * Math.pow(GetInputRadius2.value, 2) * GetInputHeight2.value;
        return OutputTextArea.value = volume;
    }
    else if (GetRadioCylinder.checked) {
        volume = Math.PI * Math.pow(GetInputRadius2.value, 2) * GetInputHeight2.value;
        return OutputTextArea.value = volume;
    }
    else if (GetRadioCone || GetRadioCylinder != checked)
        return OutputTextArea.value = "Нічого не вибрано!";
};
GetButtonResult2.addEventListener('click', Zavd2Check);
const GetWrongAnswers = document.querySelectorAll('#WrongAnswer');
const GetCurrectAnswers = document.querySelectorAll('#CurrectAnswer');
const GetNameFullAnswer = document.querySelector('#FullAnswer');
const BtnSendAnswer = document.querySelector('.Buttons3');
function CheckAnwers() {
    let CollectGrade = 0;
    let CurrentAnswers = 0;
    for (let i = 0; i < GetCurrectAnswers.length; i++) {
        if (GetCurrectAnswers[i].checked) {
            CurrentAnswers = Number(CurrentAnswers) + 1;
            CollectGrade += CurrentAnswers;
        }
    }
    let WrongAnswers = 0;
    for (let i = 0; i < GetWrongAnswers.length; i++) {
        if (GetWrongAnswers[i].checked) {
            WrongAnswers = Number(WrongAnswers) + 1;
            CollectGrade -= WrongAnswers;
        }
    }
   return GetNameFullAnswer.innerHTML = `Правильних відповідей: ${CollectGrade}`;
};
BtnSendAnswer.addEventListener('click', CheckAnwers);