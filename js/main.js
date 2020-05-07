$(document).ready(function(){
    $('.menu-container').on('click', '.menu-bar', function(){
        $('.menu-bar').toggleClass('change');
        $('#mobile-nav').height('100%');
    });

    $('.menu-container').on('click', '.menu-bar.change', function(){
        $('#mobile-nav').height('0');
    });
    
});