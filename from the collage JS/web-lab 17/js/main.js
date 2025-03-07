const AllAnswerCheckBox = document.querySelectorAll('#AnswerCheckBox');
const OutputFullAnswer = document.querySelector('.OutputFullAnswer'); 
const InputTextArea = document.querySelector('.InputTextArea');
const SendBtn = document.querySelector('.SelectThisBtn');
const AllAnswerCheckBoxZavd2 = document.querySelectorAll('#AnswersCheckBox2');
const OutputFullAnswerZavd2 = document.querySelector('.OutputFullAnswerZavd2');
const SendBtn2 = document.querySelector('.SelectBtnForZavd2');
const SelectInformatics = document.querySelector('#InputInformatics');
const SelectDataBase = document.querySelector('#InputDataBase');
const SelectInternetResouse = document.querySelector('#InputInternetResouse');
const SelectAlgoritm = document.querySelector('#InputAlgoritm');
const SelectDuration36 = document.querySelector('#InputDuration36');
const SelectDuration64 = document.querySelector('#InputDuration64');
const SelectDuration128 = document.querySelector('#InputDuration128');
const SelectUkrainianLang = document.querySelector('#InputUkrainianLang');
const SelectEnglishLang = document.querySelector('#InputEnglishLang');
const SelectExam = document.querySelector('#InputExam');
const SelectCredit = document.querySelector('#InputCredit');
const OutputFullAnswerZavd3 = document.querySelector('.OutputFullAnswerZavd3');
const SentBtn3 = document.querySelector('.SelectBtnForZavd3');
//1 завдання по Анкеті користувача..
function CheckAnwers() {
  for (const CheckBoxes of AllAnswerCheckBox) {
    if (CheckBoxes.checked) {
        return OutputFullAnswer.innerHTML = `Обрано: ${CheckBoxes.value}  Тема: ${InputTextArea.value}`;
    }
  }  
};
SendBtn.addEventListener('click', CheckAnwers);
// 2 завдання по Анкеті перекладача.
function ResultCalculate() {
  let FullSalary = 0;
  for (const CheckAnwers of AllAnswerCheckBoxZavd2) {
    if (CheckAnwers.checked && CheckAnwers.value == 'English') {
      const EnglishSalary = 200;
      FullSalary += EnglishSalary;
    }
    else if (CheckAnwers.checked && CheckAnwers.value == 'Ukrainian') {
      const UkrainianSalary = 1000;
      FullSalary += UkrainianSalary;
    }
    else if (CheckAnwers.checked && CheckAnwers.value == 'German') {
      const GermanSalary = 500;
      FullSalary += GermanSalary;
    }
    else if (CheckAnwers.checked && CheckAnwers.value == 'French') {
      const FrenchSalary = 400;
      FullSalary += FrenchSalary;
    }
    else if (CheckAnwers.checked && CheckAnwers.value == 'Romainian') {
      const RomainianSalary = 300;
      FullSalary += RomainianSalary;
    }
    else if (CheckAnwers.checked && CheckAnwers.value == 'Polish') {
      const PolishSalary = 200;
      FullSalary += PolishSalary;
    }
  };
  return OutputFullAnswerZavd2.innerHTML = `Ваша винагорода: ${FullSalary}`;
}
SendBtn2.addEventListener('click', ResultCalculate);
//3 завдання по обробки анкети слухачів курсів
function CalculateResult() {
  let FullOplata = 0;
  if (SelectInformatics.checked && SelectDuration36.checked && SelectUkrainianLang.checked && SelectExam.checked) {
    let Oplata = 250;
    FullOplata += Oplata;
  }
  else if (SelectInformatics.checked && SelectDuration64.checked && SelectEnglishLang.checked && SelectCredit.checked) {
    let oplata = 500;
    FullOplata += oplata;
  }
  else if (SelectInformatics.checked && SelectDuration128.checked && SelectEnglishLang.checked && SelectCredit.checked) {
    let oplata = 1000;
    FullOplata += oplata;
  }
  if (SelectDataBase.checked && SelectDuration36.checked && SelectUkrainianLang.checked && SelectExam.checked) {
    let Oplata = 400;
    FullOplata += Oplata;
  }
  else if (SelectDataBase.checked && SelectDuration64.checked && SelectEnglishLang.checked && SelectCredit.checked) {
    let Oplata = 800;
    FullOplata += Oplata;
  }
  else if (SelectDataBase.checked && SelectDuration128.checked && SelectEnglishLang.checked && SelectCredit.checked) {
    let Oplata = 1600;
    FullOplata += Oplata;
  }
  if (SelectInternetResouse.checked && SelectDuration36.checked && SelectUkrainianLang.checked && SelectExam.checked) {
    let Oplata = 300;
    FullOplata += Oplata;
  }
  else if (SelectInternetResouse.checked && SelectDuration64.checked && SelectEnglishLang.checked && SelectCredit.checked) {
    let Oplata = 600;
    FullOplata += Oplata;
  }
  else if (SelectInternetResouse.checked && SelectDuration64.checked && SelectEnglishLang.checked && SelectCredit.checked) {
    let Oplata = 600;
    FullOplata += Oplata;
  }
  else if (SelectInternetResouse.checked && SelectDuration128.checked && SelectEnglishLang.checked && SelectCredit.checked) {
    let Oplata = 1200;
    FullOplata += Oplata;
  }
  if (SelectAlgoritm.checked && SelectDuration36.checked && SelectUkrainianLang.checked && SelectExam.checked) {
    let Oplata = 600;
    FullOplata += Oplata;
  }
  else if (SelectAlgoritm.checked && SelectDuration64.checked && SelectEnglishLang.checked && SelectCredit.checked) {
    let Oplata = 1200;
    FullOplata += Oplata;
  }
  else if (SelectAlgoritm.checked && SelectDuration128.checked && SelectEnglishLang.checked && SelectCredit.checked) {
    let Oplata = 2400;
    FullOplata += Oplata;
  }
   return OutputFullAnswerZavd3.innerHTML = `З вас оплата: ${FullOplata}`;
};
SentBtn3.addEventListener('click', CalculateResult);