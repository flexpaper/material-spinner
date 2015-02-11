/*
    Material spinner loader with fallback for browsers that do not support SVG animations

    Created and maintained by The FlexPaper Project : http://flexpaper.devaldi.com

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.

*/

if(!window.FLEXPAPER){
    window.FLEXPAPER = {};
}

if(!FLEXPAPER.utils){
    FLEXPAPER.utils = {};

    var userAgent = navigator.userAgent.toLowerCase();

    FLEXPAPER.utils.platform = {
        win:/win/.test(userAgent),
        mac:/mac/.test(userAgent),
        touchdevice : (function(){try {return 'ontouchstart' in document.documentElement;} catch (e) {return false;} })(),
        ios : ((userAgent.match(/iphone/i)) || (userAgent.match(/ipod/i)) || (userAgent.match(/ipad/i))),
        android : (userAgent.indexOf("android") > -1),
        ios6 : (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 6_\d/i)),
        iphone : (userAgent.match(/iphone/i)) || (userAgent.match(/ipod/i)),
        ipad : (userAgent.match(/ipad/i)),
        winphone : userAgent.match(/Windows Phone/i),
        blackberry : userAgent.match(/BlackBerry/i),
        webos : userAgent.match(/webOS/i),
        androidportrait : ((userAgent.indexOf("android") > -1) && !(window.innerHeight<window.innerWidth)),
        pixelratio : (window.devicePixelRatio)?window.devicePixelRatio:1
    };

    FLEXPAPER.utils.browser = {
        version: (userAgent.match(/.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)(?!.+opera)/) || [])[1],
        majorversion : (userAgent.match(/.+?(?:version|chrome|firefox|opera|msie|OPR)[\/: ]([\d.]+)(?!.+opera)/) || [])[1],
        safari: (/webkit/.test(userAgent) || /applewebkit/.test(userAgent)) && !(/chrome/.test(userAgent)),
        opera: /opera/.test(userAgent),
        msie: /msie/.test(userAgent) && !/opera/.test(userAgent) && !/applewebkit/.test(userAgent),
        msietrident : (((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))) && !/opera/.test(userAgent),
        mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
        chrome: /chrome/.test(userAgent)
    };

    FLEXPAPER.utils.browser.msie = FLEXPAPER.utils.browser.msie || FLEXPAPER.utils.browser.msietrident;

    // strip any extra .'s at the end. Some versions come in XXX.XXX.X
    if(FLEXPAPER.utils.browser.version && FLEXPAPER.utils.browser.version.match(/\./g).length>1){
        FLEXPAPER.utils.browser.version = FLEXPAPER.utils.browser.version.substr(0,FLEXPAPER.utils.browser.version.indexOf(".",FLEXPAPER.utils.browser.version.indexOf(".")));
    }

    // strip any extra .'s at the end. Some versions come in XXX.XXX.X
    if(FLEXPAPER.utils.browser.majorversion && FLEXPAPER.utils.browser.majorversion.match(/\./g).length>1){
        FLEXPAPER.utils.browser.majorversion = FLEXPAPER.utils.browser.majorversion.substr(0,FLEXPAPER.utils.browser.majorversion.indexOf(".",FLEXPAPER.utils.browser.majorversion.indexOf(".")));
    }
}

String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
};

FLEXPAPER.utils.addSpinner = function(settings){
    var el          = document.getElementById(settings.element)
    var width       = settings.width;
    var height      = settings.height;
    var logo        = settings.logo;
    var logo_width  = width * .55;
    var logo_height = width * .55;
    var left        = el.style.left;
    var top         = el.style.top;

    var cssstyle = String.format("position:absolute;left:{4};top:{5};margin-left:-{2}px;margin-top:-{3}px;background-repeat:no-repeat;width:{0}px;height:{1}px;background-size:100% 100%;",logo_width,logo_height,logo_width/2,logo_height/1.7,left,top);

    if(FLEXPAPER.utils.browser.chrome || FLEXPAPER.utils.browser.safari){
        el.innerHTML =  String.format(
            '<div class="flexpaper_spinner_logo" style="background-image: url(\'{0}\');{1}"></div>'+
                '<svg class="flexpaper_cssspinner" style="margin-left:-{4}px;margin-top:-{5}px;left:{6};top:{7};" width="{2}px" height="{3}px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">'+
                '<circle class="flexpaper_spinner_path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>'+
                '</svg>',logo,cssstyle,width,height,logo_width/1.1,logo_height/1.1,left,top);

    }else if(!FLEXPAPER.utils.browser.msie && !FLEXPAPER.utils.browser.msietrident){
        el.innerHTML =  String.format(
            '<div class="flexpaper_spinner_logo" style="background-image: url(\'{0}\');{1}"></div>'+
                '<svg version="1.1" x="0" y="0" width="{2}px" height="{3}px" viewBox="-10 -10 120 120" enable-background="new 0 0 200 200" xml:space="preserve" class="flexpaper_spinner_fallback" style="margin-left:-{4}px;margin-top:-{5}px;left:{6};top:{7};">'+
                '<path class="flexpaper_spinner_fallback_circle" d="M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50" />'+
                '</svg>',logo,cssstyle,width+10,height+10,logo_width,logo_height,left,top);
    }else{
        if(FLEXPAPER.utils.browser.version>9){
            el.innerHTML =  String.format(
                '<div class="flexpaper_spinner_fallback_msie2" style="left: calc({2} - 40px);top: calc({3} - 40px);width:80px;height:80px;"></div><div class="flexpaper_spinner_logo" style="background-image: url(\'{0}\');{1}">'+
                    '</div>',logo,cssstyle,left,top,width,height);
        }else{
            el.innerHTML =  String.format(
                '<div class="flexpaper_spinner_logo" style="background-image: url(\'{0}\');{1}">'+
                    '</div>',logo,cssstyle);
        }
    }
};

FLEXPAPER.utils.removeSpinner = function(el){
    document.getElementById(el).innerHTML = '';
};