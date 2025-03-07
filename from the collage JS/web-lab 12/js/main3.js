let x1 = prompt("Enter 'x1' for A:"),
y1 = prompt("Enter 'y1' for A:"),
x2 = prompt("Enter 'x2' for B:"),
y2 = prompt("Enter 'y2' for B:"),
x3 = prompt("Enter 'x3' for C:"),
y3 = prompt("Enter 'y3' for C:");

x1 = parseInt(x1); y1 = parseInt(y1);
x2 = parseInt(x2); y2 = parseInt(y2);
x3 = parseInt(x3); y3 = parseInt(y3);

sideAB = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
sideBC = Math.sqrt(Math.pow((x3 - x2), 2) + Math.pow((y3 - y2), 2));
sideAC = Math.sqrt(Math.pow((x3 - x1), 2) + Math.pow((y3 - y1), 2));

alert(`AB = ${sideAB}; BC = ${sideBC}; AC = ${sideAC}.`);

if (sideAB + sideBC > sideAC || sideBC + sideAC > sideAB || sideAC + sideAB > sideBC) {
    if (sideAB == sideBC == sideAC) alert("All side equal!");
    else if (sideAB != sideBC == sideAC || sideAB == sideBC != sideAC || sideAB == sideAC != sideBC) alert("Two sides equal!");
    else alert("All sides are different");
    let p = (sideAB + sideBC + sideAC) / 2;
    alert("Square of triangle ABC = " + Math.sqrt(p * (p - sideAB) * (p - sideBC) * (p - sideAC)));
}
else alert("There isn't triangle!");
