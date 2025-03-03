const OutputH1Tag = document.getElementById("Output");
const CheckBtn = document.querySelector("ClickBtn");

function ShowHelloWorld() {
  //Якщо немає то створюємо!
  if (!OutputH1Tag) {
    OutputH1Tag = document.createElement("Output");
    document.body.appendChild(OutputH1Tag);
  }

  return (OutputH1Tag.textContent = `Hello World`);
}

function showStudentName() {
  const StudentInfoElement = document.getElementById("StudentInfo");
  return alert("Ім'я студента: Іван");
}
