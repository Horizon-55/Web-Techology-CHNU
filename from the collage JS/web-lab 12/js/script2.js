let Answer = document.getElementById('congratulation');
let AskQuestion = prompt("Вгадай коли я народився? (1)15 березня (2) 14 квітня (3).5 травня (4).14 грудня");
switch (AskQuestion) {
    case '1':
        Answer.textContent = 'Молодець ти вгадав моє день народження 15 безезня 2004р';
        break;
    case '2':
        Answer.textContent = 'не вгадав тут ти)';
        break;
    case '3':
        Answer.textContent = 'ух далеко ти пішов не вгадав =(';
        break;
    case '4':
        Answer.textContent = 'співчуваю но не вгадав бо дуже далеко від мого день народження!';
        break;
    default:
        Answer.textContent = 'Ти шо лінивий пиши інакше бан!';
        break;
}