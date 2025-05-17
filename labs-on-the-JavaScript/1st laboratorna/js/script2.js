let input1 = document.getElementById('inputPeka');
let input2 = document.getElementById('outputlitr');
let select_options = document.getElementById('conversion-options1'); // має бути пека тут супер! 
let select_options2 = document.getElementById('conversion-options2'); // має бути літр та сака тут супер!
let btnresult = document.getElementById('btnresult');
function ConvectortoLitr() {
    const litr = 8.809768;
    let Process = input1.value * litr;
    let Answer = input2.value = Process;
    return Answer;
};
function ConvectortoSaka() {
    const saka = 0.07929;
    let Process = input1.value * saka;
    let Answer = input2.value = Process;
    return Answer;
};
function ChoosetoConvert() {
    if (select_options.value && select_options2.value == "litr") ConvectortoLitr();
    else if (select_options.value && select_options2.value == "Saka")ConvectortoSaka();
    else alert('Вибери те що хочеш конвертувати будь ласка!');
};
btnresult.addEventListener("click", () => ChoosetoConvert());
