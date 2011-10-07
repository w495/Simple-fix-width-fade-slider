/**
 * 	Fade Slider 0.1 - jQuery plugin
 *	    written by Ilya w-495 Nikitin
 *	
 *	Copyright (c) 2011 Ilya w-495 Nikitin (http://w-495.ru)
 *	Licensed under BSD-like license.
 *
 *	Built for jQuery library
 *	http://jquery.com
**/

/* ---------------------------------------------------------------------------
    <div id="slider">
        <ul class="slider-items">
            ...
            <li class="active">
                <a href="#">
                    <img src="/images/slide.png" />
                    <span class="slider-item-capture">
                        Capture
                    </span>
                </a>
            </li>
            ...
        </ul>
        <div class="slider-bord">
            <span id="slider-prev" class="slider-button">&lt;&lt;</span>
            <span class="slider-circle">&bull;<span>&bull;</span>&bull;</span>
            <span id="slider-next" class="slider-button">&gt;&gt;</span>
        </div>
    </div>
    ---------------------------------------------------------------------------
*/

(function($) {
    $.fn.fadeSliderSwitch = function(a_options){
        var defaults = {
			next:	true,   // use prev-button as a next one
			speed:  2000,   // fade duration [ms]
            min:    0.0,    // min opacity
            max:    1.0     // max opacity
		};
        var options = $.extend(defaults, a_options);
        var obj = $(this);
        var active = $("li.active", obj);
        if (!active.length )
            if(options.next)
                active = $("li:last", obj);
            else
                active = $("li:first", obj);
        var next = null;
        if(active.next().length)
            next = active.next();
        else
            if(options.next)
                next = $("li:first", obj);
            else
                next = $("li:last", obj);
        active.addClass("last-active");
        next.css({opacity: options.min})
        next.addClass("active")
        next.animate({opacity: options.max}, options.speed, function() {
            active.removeClass("active last-active");
        });
    }
    
// ---------------------------------------------------------------------------
    $.fn.fadeSlider = function(a_options){
        var obj = $(this);
        var defaults = {
            move : {
                next:	true,   // use prev-button as a next one
                speed:  2000,   // fade duration [ms]
                min:    0.0,    // min opacity
                max:    1.0     // max opacity
            },
            interval:   10000   // auto-switch duration [ms]
                                // If it is 0, there is no auto-switching.
		};
        var options = $.extend(defaults, a_options);
        $("#slider-next", obj).click(function(){
            $("ul.slider-items", obj).fadeSliderSwitch(options.move);
        });
        $("#slider-prev", obj).click(function(){
            $("ul.slider-items", obj).fadeSliderSwitch(options.move);
        });
        if(options.interval){
            _setInterval = function(){
                return setInterval( function(){$("ul.slider-items", obj)
                    .fadeSliderSwitch(options.move);}, options.interval);
            }
            var refreshIntervalId = _setInterval()
            $(this).mouseover(function(){
                clearInterval(refreshIntervalId);
            }).mouseout(function(){
                refreshIntervalId = _setInterval();
            });
        }        
    }
})(jQuery);

$(function() {
   $("#slider").fadeSlider();
   
});