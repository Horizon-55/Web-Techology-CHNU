// 5 завдання
$(document).ready(function () {
    $('p').dblclick(function () {
        $(this).hide();
    });
});
// 6 завдання
$(document).ready(function () {
    $("#p1").mouseenter(function ()
    {
        alert("You entered p1!");
    });
});
// 7 завдання
$(document).ready(function () {
    $("input").focus(function () {
        $(this).css("background-color", "#cccccc");
    });
    $("input").blur(function () {
        $(this).css("background-color", "#ffffff");
    });
});
