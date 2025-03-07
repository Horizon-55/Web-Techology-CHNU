$(document).ready(function() {
      // Обробка події "наведення мишки на елемент"
      $('table img').hover(function() {
        $(this).css('opacity', '0');
      },
    function () {
        $(this).css('opacity', '1');
    });
});
// 3 Індивідуальне завдання 1 варіант 
$(document).ready(function() {
      let intervalId;
    $('#toggleBtn').click(function() {
        intervalId = setInterval(function() {
          $('#image1').fadeIn(2000).delay(2000).fadeOut(2000);
          $('#image2').fadeOut(2000).delay(2000).fadeIn(2000);
        }, 4000);
    });
    $('#stopBtn').click(function() {
        clearInterval(intervalId);
        $('#image1, #image2').stop(true, true).fadeIn();
    });
});