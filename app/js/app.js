$(document).ready(function () {

    setTimeout(function() {

        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "app/js/leaflet.min.js";

        document.getElementsByTagName("body")[0].appendChild(script)

        script.onload = function () {
            let map;
            if ($(window).width() <= 980) {
                map = L.map('map', {
                    attributionControl: false,
                    scrollWheelZoom: false
                }).setView([55.342998, 86.090009], 16);
            } else {
                map = L.map('map', {
                    attributionControl: false,
                    scrollWheelZoom: false
                }).setView([55.342698, 86.089009], 18);
            }

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
            let pin = L.icon({
                iconUrl: 'app/images/sprite.svg#pin',
                iconSize: [76, 80],
                iconAnchor: [38, 80],
            });

            L.marker([55.342698, 86.090009], {icon: pin}).addTo(map);
        };

    }, 1200);

    $('.btn-burger')
        .click(function() {
            $('body').addClass('mobile-menu');
        })

    $('.menu button')
        .click(function() {
            $('body').removeClass('mobile-menu');
        })

    console.log("%cCreated with ❤", "color: #000; padding: 5px 0px 1px; border-bottom:2px solid #87b0dd;");
});
