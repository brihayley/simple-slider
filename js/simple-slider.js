//SimpleSlider is an immediately invoked function expression (IIFE)
//It creates a nice protected scope for our slider code
//Helps us avoid declaring variable in the "Global Scope"
const SimpleSlider = (function ($) {
    //initialize "global" variables
    let slider = {},
        $container,
        $slides,
        $prev,
        $next,
        $dots;
    //set slider config defaults
    slider.config = {
        slideDuration: 3000,
        auto: false,
        containerSelector: '#simpleSlider',
        slideSelector: 'p',
        prevArrowSelector: '.arrows.prev',
        nextArrowSelector: '.arrows.next',
        dotsSelector: '.dot'
    };
    
    //initialize slider with config
    //this sets everything up
    slider.init = config => {
        //if config provided, merge it with default config
        if (config && typeof(config) == 'object') {
            $.extend(slider.config, config);
        }
        //get slider element
        $container = $(slider.config.containerSelector);
        //get slides
        $slides = $container.find(slider.config.slideSelector);
        //get prev button element
        $prev = $(slider.config.prevArrowSelector);
        //get next button element
        $next = $(slider.config.nextArrowSelector);
        //get dots container element
        $dots = $(slider.config.dotsSelector);
        //hook up prev button
        $prev.click(slider.prev);
        //hook up next button
        $next.click(slider.next);
        //hook up dots nav
        $dots.each( (i,dot) => {
            $(dot).click( () => slider.setSlideByIndex(i) );
        });
        //activate first slide
        $($slides[0]).addClass('activeText');
        //activate first dot
        $($dots[0]).addClass('active');
        //slide automatically or nah...
        if (slider.config.auto) autoNext();
    };
    
    //slide automatically
    //private function
    function autoNext() {
        setInterval(slider.next, slider.config.slideDuration);
    }
    
    //navigate to next slide
    //public method
    slider.next = () => {
        //get active slide
        const activeSlide = $slides.filter('.activeText');
        //get active dot
        const activeDot = $dots.filter('.active');
        //get current Index
        const currentIndex = $slides.index(activeSlide);
        //remove active class from active slide
        activeSlide.removeClass('activeText');
        activeDot.removeClass('active');
        //apply activeText class to next slide
        //if on last slide
        if (currentIndex === $slides.length - 1) {
            //make first slide active
            $($slides[0]).addClass('activeText');
            //make first dot active
            $($dots[0]).addClass('active');
            } else {
            //make next slide active
            $($slides[currentIndex + 1]).addClass('activeText');
            //make next slide dot
            $($dots[currentIndex + 1]).addClass('active');
            }
    };
    
    slider.prev = () => {
        //get active slide
        const activeSlide = $slides.filter('.activeText');
        //get active dot
        const activeDot = $dots.filter('.active');
        //get current Index
        const currentIndex = $slides.index(activeSlide);
        //remove active class from active slide
        activeSlide.removeClass('activeText');
        activeDot.removeClass('active');
        //apply activeText class to next slide
        //if on last slide
        if (currentIndex === 0) {
            //make last slide active
            $($slides[$slides.length - 1]).addClass('activeText');
            //make last dot active
            $($dots[$dots.length - 1]).addClass('active');
            } else {
            //make prev slide active
            $($slides[currentIndex - 1]).addClass('activeText');
            //make prev slide dot
            $($dots[currentIndex - 1]).addClass('active');
            }
    };
    //Navigate to slide by index
    slider.setSlideByIndex = index => {
        //get active slide
        const activeSlide = $slides.filter('.activeText');
        //get active dot
        const activeDot = $dots.filter('.active');
        //remove active class froma ctive slide & dot
        activeSlide.removeClass('activeText');
        activeDot.removeClass('active');
        //make slide at given index active
        $($slides[index]).addClass('activeText');
        //make slide at given index active
        $($dots[index]).addClass('active');
    };
    //return the slider object with public 
    return slider;
    
    //user change auto slide 
    changeAuto() = () => {
        if (slider.config.auto) {
            SimpleSlider.init({auto: false});
        } else {
            SimpleSlider.init({auto: true});
            $.addClass('change-auto');
        }
    };
}(jQuery));

