let $transition = false;

$('[type="tel"]').mask('+7 (000) 000-00-00');

function init() {
    if (!$transition && $('.navigation').length > 0) {
        if ($(window).scrollTop() > $('section.slider').offset().top - 120 && $(window).scrollTop() < $('section.about').offset().top - 120) {
            $('[href=".slider"]').addClass('active').siblings().removeClass('active');
        }

        if ($(window).scrollTop() > $('section.about').offset().top - 120 && $(window).scrollTop() < $('section.catalog').offset().top - 120) {
            $('[href=".about"]').addClass('active').siblings().removeClass('active');
        }

        if ($(window).scrollTop() > $('section.catalog').offset().top - 120 && $(window).scrollTop() < $('section.contacts').offset().top - 120) {
            $('[href=".catalog"]').addClass('active').siblings().removeClass('active');
        }

        if ($(window).scrollTop() > $('section.contacts').offset().top - 120) {
            $('[href=".contacts"]').addClass('active').siblings().removeClass('active');
        }

    }
}

$(document).ready(function () {

    if ($('#map').length > 0) {
        setTimeout(function () {

            let script = document.createElement("script");
            script.type = "text/javascript";
            // script.src = "/bitrix/templates/eurostyle/js/leaflet.min.js";
            script.src = "app/js/leaflet.min.js";

            document.getElementsByTagName("body")[0].appendChild(script)

            script.onload = function () {
                let map;
                map = L.map('map', {
                    attributionControl: false,
                    scrollWheelZoom: false
                }).setView([55.342698, 86.090009], 16);


                L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
                let pin = L.icon({
                    // iconUrl: '/bitrix/templates/eurostyle/images/sprite.svg#pin',
                    iconUrl: 'app/images/sprite.svg#pin',
                    iconSize: [76, 80],
                    iconAnchor: [38, 80],
                });

                L.marker([55.342698, 86.090009], {icon: pin}).addTo(map);
            };

        }, 1300);
    }

    $('.btn-burger')
        .click(function() {
            $('body').addClass('mobile-menu');
        });

    $('.menu button')
        .click(function() {
            $('body').removeClass('mobile-menu');
        });

    $('.input')
        .on('blur', 'input', function() {
            if ($(this).val() === '')
                $(this).closest('.input').removeClass('active');
        })
        .on('focus', 'input', function() {
            $(this).closest('.input').addClass('active');
        });

    $('.close-button')
        .click(function() {
            $('body').removeClass('opened');
        });

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $('body').removeClass('opened');
        }
    });

    $('.scroll-to__catalog')
        .click(function() {
            $('body, html').animate({'scrollTop': $('.product-grid').offset().top - 140}, 500);
            return false;
        });

    $('.product-thumbnails').on('click', 'a', function() {
        $('.product-image').find('img').attr('src', $(this).attr('href'));
        $('.product-image').find('source').attr('srcset', $(this).attr('href'));
        return false;
    });

    $('form').submit(function() {
        let $form = $(this);
        $.ajax({
            url: '/bitrix/templates/eurostyle/mail.php',
            data: $(this).serialize(),
            type: 'post',
            success: function() {
                $form.prev().remove();
                $form.remove();
                $('.popup').find('.title').html('Спасибо! Мы свяжемся с вами в ближайшее время.');
                $('.popup').css('min-height', 'auto');
            }
        })
        return false;
    });

    $('.overlay').on('click', function(e) {
        if ($(e.target).hasClass('overlay')) {
            $('body').removeClass('opened');
        }
    });

    $('.categories').on('click', '.category-item', function() {

        $(this).addClass('active').siblings().removeClass('active');

        $.ajax({
            url: '/bitrix/templates/eurostyle/ajax.php',
            data: {
                'SECTION_ID': $(this).attr('data-id'),
            },
            type: 'post',
            success: function(data) {
                if ($(data).find('.product-card ').length > 0) {
                    $('.product-grid').html($(data).html()).removeClass('inline');
                } else {
                    $('.product-grid').html('На данный момент товары для этой категории не предоставлены.').addClass('inline');
                }
            }
        })

        return false;
    });

    let swiper = new Swiper('.slider-block', {
        speed: 400,
        watchSlidesVisibility: false,
        slidesPerView: 1,
        virtualTranslate: true,
        on: {
            transitionStart: function() {
                $('.navigation .navigation-item').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active');
            },
            init: function () {
                $('.navigation .navigation-item:nth-child(1)').addClass('active');
            },
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        fadeEffect: {
            crossFade: true
        },
        effect: "fade",
    });

    let thumbnails = new Swiper('.product-thumbnails', {
        speed: 400,
        breakpoints: {
            0: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            500: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            640: {
                slidesPerView: 6,
                spaceBetween: 15,
            },
            850: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 15,
            },
            1230: {
                slidesPerView: 7,
                spaceBetween: 15,
            },
        }
    });

    let similar = new Swiper('.product-similar', {
        speed: 400,
        pagination: {
            el: '.similar-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            800: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1120: {
                slidesPerView: 3,
                spaceBetween: 30
            },
        }
    });

    $('.navigation').on('click', 'a', function () {
        $transition = true;
        $('body, html').animate({scrollTop: $('section'+$(this).attr('href')).offset().top}, 600, function() {
            $transition = false;
        });
        $(this).addClass('active').siblings().removeClass('active');
        return false;
    });

    $('.tabs').on('click', 'a', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.tab-content').find('.page').eq($(this).index()).show().siblings().hide();
        return false;
    });

    $('[data-open="consultation"]').click(function() {
        openConsultation();
        return false;
    });

    $('[data-open="request"]').click(function() {
        openRequest();
        return false;
    });
});

function openConsultation() {
    let $popup = $('.popup');
    $('body').addClass('opened');
    $popup.find('.title').text('Получить консультацию');
    $popup.find('[name="form_type"]').val('consultation');
}

function openRequest() {
    let $popup = $('.popup');
    $('body').addClass('opened');
    $popup.find('.title').text('Запросить стоимость');
    $popup.find('[name="form_type"]').val('request');
}

$(window).scroll(function() {
    init();
});