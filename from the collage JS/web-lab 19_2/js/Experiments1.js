$(document).ready(function() {
      // Приховати непарні елементи з класом MsoNormal
      $('#hideBtn').click(function() {
        $('.MsoNormal:odd').addClass('hidden');
        //$('.MsoNormal').addClass('hidden');
      });
      // Відобразити приховані елементи
      $('#showBtn').click(function() {
        $('.MsoNormal.hidden').removeClass('hidden');
      });
    });