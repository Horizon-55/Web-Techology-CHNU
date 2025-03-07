$(document).ready(function() {
    $('#moveBtn').click(function() {
        $('p:nth-child(3), p:nth-child(5)').animate({ left: '-=100px' }, 'slow');
    });
    $('.WeightHeight').click(function() {
        $(this).animate({ top: '+=30px' }, 'slow');
    });
});