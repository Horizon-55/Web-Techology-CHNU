const increaseByOne = (arr) => arr.map((value) => value + 1); //створює та повертає масив на +1
//Варіант 9-16
function fibonacci(value = 10) {
    let a = 0, b = 1, i = 0;
    let temp = 0;

    while(i < value) {
        console.log(a); 
        temp = a;
        a = b;
        b = temp + a;

        i++;
    }
}

function calcSum(value = 1000) {
    const result = [];
    for (let i = 1; i <= value; i++) {
        result.push(i + i);
    }

    return result;
}

function numToDay(value) {
    switch(value) {
        case 1: return 'Monday';
        case 2: return 'Tueday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 7: return 'Sunday';
        default: return 'No day exists!';
    }
}

function checkTwoValues(a, b) {
    const c = a + b;
    const d = a - b;
    return (c === 10 || d === 10);
}

const arr = [2, 3, 5, 1, 4, 6, 3];

fibonacci();
console.log(calcSum());
console.log(numToDay(5));
console.log(increaseByOne(arr));
console.log(checkTwoValues(5, 5));
//4 завдання
function filterOddLengthRows(arr) {
    // Create a new array containing only rows with odd lengths
    return arr.filter(row => row.length % 2 !== 0); 
    //перевіряє чи довждина кожного ряжка масива !== 2 то не парна!
  }

const inputArray = [
    [1, 2, 3],       // Length 3 (odd)
    [4, 5, 6, 7],    // Length 4 (even)
    [8, 9],          // Length 2 (even)
    [10, 11, 12, 13, 14]  // Length 5 (odd)
  ];
  
  const result = filterOddLengthRows(inputArray);
  console.log(result);