let Question = prompt('Добрий день виберіть що хочете конвертувати! 1.Пек в літри 2.Пек в саку');

function AmericanPeackToLitr(AmericanPeakNum) {
    const litr = 8.809768;
    return AmericanPeakNum * litr;
};

function AmericanPeackToSaku(AmericanPeakNum) {
    const saka = 0.07929;
    return AmericanPeakNum * saka;
}

switch (Question) {
    case '1':
        let AmericanPeack = prompt('На яку сумму ви хочете конвертувати Американський пек в літри?');
        if (AmericanPeack != null) {
            let Answer = AmericanPeackToLitr(AmericanPeack);
            alert(`Ваша відповідь: ${Answer}`);
        } else alert('Ви нічого не ввели!');
        break;
    case '2':
        let AmrPeak = prompt('На яку суму ви хочете конвертувати пек в саку?');
        if (AmrPeak != null) {
            let Answer = AmericanPeackToSaku(AmrPeak);
            alert(`Ваша відповідь: ${Answer}`);
        } else alert('Ви нічого не ввели!');
        break; 
    default:
        alert('Ви нічого не ввели!');
        break;
}