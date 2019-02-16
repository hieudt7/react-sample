var scrollEnabled = true;

function resize() {
    var fontSize = 10;
    var width = $(window).width();
    if (width > 880 && width < 1290) {
        width = width + 20;
    }
    if (width >= 1920) {
        $('html').css('font-size', fontSize + 'px');
    } else if (width >= 1280) {
        // $('html').css('font-size', 10 + 'px');
        $('html').css('font-size', fontSize * width / 1920 + 'px');

    } else if (width >= 900) {
        // $('html').css('font-size', 10 + 'px');
        $('html').css('font-size', fontSize * 1280 / 1920 + 'px');
        $('.section-1').css('background-size', 1280 + 'px ' + 1280 * .469791667 + 'px ');
        $('.section-1').height(1280 * .469791667 + 'px ');

    } else if (width >= 750) {
        $('html').css('font-size', fontSize + 'px');
        $('body').css('font-size', '3rem');
    } else {
        $('html').css('font-size', fontSize * width / 750 + 'px');
        $('body').css('font-size', '3rem');
    }
    var heightTr = $('body').find('.base-table .table-title').height();
    var length = $('body').find('.base-table tr').length;
    for (var i = 1; i <= length; i++) {
        $('body').find('.list-border .border-' + i).css('top', (heightTr * (i + 1)) + 'px');
    }
}

function scrollBar() {
    $('.scrollbar-outer').scrollbar();
}

function animation() {
    $('.mouse-scroll').velocity({
        translateY: [0, "10px"],
        translateX: ["-50%", "-50%"]
    }, {
        loop: true
    }).velocity("reverse");

    $('body').on('click', '.mouse-scroll', function () {
        $('.section-2').first().velocity("scroll", {
            duration: 1350,
            easing: "ease-in"
        });
    })
    $('body').on('click', '.box-1 .actions a', function (e) {
        e.preventDefault();
        $('.section-2').first().velocity("scroll", {
            duration: 650,
            easing: "ease-in"
        });
    })
    $('body').on('click', '.box-2 .actions a', function (e) {
        e.preventDefault();
        $('.section-3').first().velocity("scroll", {
            duration: 1000,
            easing: "ease-in"
        });
    })
    $('body').on('click', '.box-3 .actions a', function (e) {
        e.preventDefault();
        $('.section-4').first().velocity("scroll", {
            duration: 1350,
            easing: "ease-in"
        });
    })
    $('body').on('click', '.go-to', function (e) {
        e.preventDefault();
        var des = $(this).attr('des');
        $(des).first().velocity("scroll", {
            duration: 1350,
            easing: "ease-in"
        });
    })
}

function animateHome() {
    $('#homeChar').on("animationend", function () {
        $('#bossChar').addClass('animated jackInTheBox');
        $('#bossChar').show();
        $('.img-effect-1').show();
        $('.img-effect-2').show();
        $('.img-effect-1').addClass('animated fadeInLeftMid');
        $('.img-effect-2').addClass('animated fadeInRighMid');
    });
}

function timerCountdown() {
    var currentDate = new Date();
    var date = 1542664800000 - Date.parse(new Date())
    var oneDay = 24 * 60 * 60 * 1000, // hours*minutes*seconds*milliseconds
        hour = 29 - currentDate.getHours(),
        minute = 60 - currentDate.getMinutes(),
        second = 60 - currentDate.getSeconds();
    var diffDays = Math.round(date / (oneDay));
    $('#countdown').countdown({
        timestamp: {
            'days': diffDays,
            'hours': hour,
            'minutes': minute,
            'seconds': second
        },
        duration: 360,
    })
}

function paegScroll() {
    $('.menu-left li:not(.disable) a').on('click', function () {
        var section = $(this).attr('data-section');
        console.log(section)
        $('.animate-in').addClass('animate-out').removeClass('animate-in');
        $('#' + section).removeClass('animate-out').addClass('animate-in');
        $('.menu-left li').removeClass('active-menu');
        $(this).parent().addClass('active-menu');
    })
    $('main').on('DOMMouseScroll mousewheel', function (event) {
        event.stopPropagation()
        var currentSection = $('.animate-in');
        if ($(window).width() <= 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            return
        if (!scrollEnabled)
            return;
        var target;
        $('.menu-left li').removeClass('active-menu');
        if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
            if (currentSection.next().is('section')) {
                currentSection.next().removeClass('animate-out').addClass('animate-in');
                currentSection.addClass('animate-out').removeClass('animate-in');
                target = currentSection.next().attr('data-menu');
            }
        } else {
            if (currentSection.prev().is('section')) {
                currentSection.prev().removeClass('animate-out').addClass('animate-in');
                currentSection.addClass('animate-out').removeClass('animate-in');
                target = currentSection.prev().attr('data-menu');
            }
        }

        $('#main-nav').find('a').removeClass('active');
        $('#' + target).addClass('active-menu');

        disableScroll();
        return false;
    });

}

function flame() {
    var flame = $('.flame_wrap').find('.flame');
    if (flame.length <= 0) {
        var index = 60;
        for (i = 0; i <= index; i++) {
            $('.flame_wrap').append('<div class="flame flame_' + i + '"></div>');
        }
    }
}

function disableScroll() {
    scrollEnabled = false;

    setTimeout(function () {
        scrollEnabled = true;
    }, 1500);
}

function danceMenu() {
    $('.menu-left li:not(.disable)').each(function () {
        var newText = '',
            menuTxt = $(this).find('h3'),
            text = menuTxt.text(),
            oldSize = menuTxt.css('font-size'),
            length = text.length,
            i;
        for (i = 0; i < length; i++) {
            newText += '<span>' + text.charAt(i) + '</span>';
        }
        menuTxt.html(newText);
        menuTxt.on('mouseenter mouseleave', 'span', function (e) {
            var span = $(this);
            if (e.type == 'mouseenter') {
                span.stop(true, false).animate({
                    fontSize: 1.6 + 'rem'
                });
            } else if (e.type == "mouseleave") {
                span.animate({
                    fontSize: oldSize
                });
            }
        });
    })
}

function playvideo() {
    $('.video-list li:not(.disable) a').on('click', function () {
        $('.video-list li a').removeClass('active');
        var srcVideo = $(this).attr('data-src');
        $('#playVideo iframe').attr('src', srcVideo);
        $(this).addClass('active');
    })
}
$(document).ready(function () {
    if ($('.bg-parallax').length) {
        // $('.bg-parallax').mousemove(function(event) { 
        //    console.log(event.pageX)
        //    console.log($(this).offset().left)
        //    $('.bg-parallax').css('background-position',)
        //     //console.log (left, top);
        // });
    }
    resize();
    // cowndow();
    timerCountdown();
    paegScroll();
    flame();
    //  danceMenu();
    playvideo();
    $(window).resize(function () {
        resize();
    });
});