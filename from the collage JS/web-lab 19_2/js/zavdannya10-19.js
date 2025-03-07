// 10 завдання
$(document).ready(function () {
    $('.btn1').click(function () {
        $('#div1').fadeIn();
        $('#div2').fadeIn('slow');
        $('#div3').fadeIn(3000);
    });
});
// 11 завдання
$(document).ready(function () {
    $(".btn2").click(function () {
        $("#div1").fadeOut();
        $("#div2").fadeOut("slow");
        $("#div3").fadeOut(3000);
    });
});
// 12 завдання пропуск
//13 завдання 
$(document).ready(function () {
    $('.btn3').click(function () {
        $('.explain').animate({ left: '250px' });
    });
});
//14 завдання з web3schools
$(".btn4").click(function(){
  $(".explain2").animate({
    left: '250px',
    opacity: '0.5',
    height: '150px',
    width: '150px'
  });
}); 
//15 завдання
$(document).ready(function () {
    $(".check").click(function () { let links = $('li> a');
        // перебір результатів
        for (let i = 0; i < links.length; i++)
        {
            alert(links[i].href);
        }
    });
});
//16 завдання
/*var links = $('a', 'li');
for (var i = 0; i < links.length; i++) {
    alert(i + ": " + links[i].href);
};
*/
//17 завдання
$(document).ready(function () {
    $("#btn1").click(function () {
        alert("Text: " + $("#test").text());
    });
    $("#btn2").click(function () {
        alert("HTML: " + $("#test").html());
    });
});
//18 завдання
$(document).ready(function () {
    $(".NewBtn19").click(function () {
        alert("Value: " + $("#Test12").val());
    });
});
//19 завдання
$(document).ready(function () {
    $(".NewBtn20").click(function () {
        alert($("#w3s").attr("href"));
    });
});


