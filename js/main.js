$(document).ready(function(){

    var $navigationLinks = $('.menu-nav > li > a');
    var $sections = $(".whyena-section");

    var sectionIdTonavigationLink = {};
    $sections.each(function() {
        var id = $(this).attr('id');
        sectionIdTonavigationLink[id] = $('.menu-nav > li > a[href=\\#' + id + ']');
    });
    function getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }
    function throttle(fn, interval) {
        var lastCall, timeoutId;
        return function () {
            var now = new Date().getTime();
            if (lastCall && now < (lastCall + interval) ) {
                // if we are inside the interval we wait
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    lastCall = now;
                    fn.call();
                }, interval - (now - lastCall) );
            } else {
                // otherwise, we directly call the function 
                lastCall = now;
                fn.call();
            }
        };
    }
    function highlightNavigation() {
        // get the current vertical position of the scroll bar
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
        // iterate the sections
        for (var i = $sections.length-1; i >= 0; i--) {
            var currentSection = $sections[i];
            // get the position of the section
            var sectionTop = getOffset(currentSection).top;
    
           // if the user has scrolled over the top of the section  
            if (scrollPosition >= sectionTop - 250) {
                // get the section id
                var id = currentSection.id;
                // get the corresponding navigation link
                var $navigationLink = sectionIdTonavigationLink[id];
                // if the link is not active
                if (typeof $navigationLink[0] !== 'undefined') {
                    if (!$navigationLink[0].classList.contains('active')) {
                        // remove .active class from all the links
                        for (i = 0; i < $navigationLinks.length; i++) {
                            $navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
                        }
                        // add .active class to the current link
                        $navigationLink[0].className += (' active');
                    }
                } else {
                        // remove .active class from all the links
                        for (i = 0; i < $navigationLinks.length; i++) {
                            $navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
                        }
                }	
                // we have found our section, so we return false to exit the each loop
                return false;
            }
        }
    }
    
    window.addEventListener('scroll',throttle(highlightNavigation,150));

    $('.menu-container').on('click', '.menu-bar', function(){
        $('.menu-bar').toggleClass('change');
        $('#mobile-nav').height('100%');
    });

    $('.menu-container').on('click', '.menu-bar.change', function(){
        $('#mobile-nav').height('0');
    });

    $('.overlay-menu-content ul li').on('click', 'a', function(){
        $('.menu-bar').toggleClass('change');
        $('#mobile-nav').height('0');
    });

    $('#send-message').click(function(e) {
        e.preventDefault();

        window.location = 'mailto:hello@whyena.com?subject=' + $('input[name ="subject"]').val() +'&body=' +  $('textarea[name ="message"]').val();
    });

    $('.carousel').carousel();

    $('.this-year').text(new Date().getFullYear());
    
});