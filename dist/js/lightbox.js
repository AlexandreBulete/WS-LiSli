($ =>
    {   
        $.fn.WS_lightbox_free = function(options)
        {            
            createBaseDOM();
            const $app = $('.WS-lightbox');
            let $_THIS = this;
    
            const settings = $.extend({
                enable : [
                    'arrows',
                    'close'
                ],
                buttons : {
                    size : 50,
                    style : 'square',
                    color : 'white',
                    color_icon : 'black',
                    border_width : 0,
                    border_color : 'white',
                    opacity : .8,
                    hover_opacity : 1
                },

                arrows : {
                    position : 'outside',
                    style : 'square',
                    icon_style : 'caret',
                    icon_size : 24,
                    opacity : .2,
                    hover_effect : 'translate',
                    hover_opacity : .5
                },

                background : {
                    filter : 'image',
                    opacity : .5
                },

                image : {
                    border_radius : 0,
                    border_color : '',
                    border_width : 0,
                    bg : 'none'
                },

                display_velocity : 'low',
                slide_velocity : 'normal',
    
            }, options);

            ////// transf icon_styles
            let $icon_styles = {
                default : 'fas fa-angle',
                angle : 'fas fa-angle',
                caret : 'fas fa-caret',
                chevron : 'fas fa-chevron'
            }
            $.each($icon_styles, function(key, value) {
                if ( settings.arrows.icon_style === key ) {
                    settings.arrows.icon_style = value;
                }
            }); 
            //////

            switch ( settings.display_velocity ) {
                case 'fast' :
                    settings.display_velocity = 200;
                    break;
                case 'normal' :
                    settings.display_velocity = 400;
                    break;
                case 'low' :
                    settings.display_velocity = 800;
                    break;
            }
            switch ( settings.slide_velocity ) {
                case 'fast' :
                    settings.slide_velocity = 200;
                    break;
                case 'normal' :
                    settings.slide_velocity = 400;
                    break;
                case 'low' :
                    settings.slide_velocity = 800;
                    break;
            }
            switch ( settings.autoplay_velocity ) {
                case 'fast' :
                    settings.autoplay_velocity = 1000;
                    break;
                case 'normal' :
                    settings.autoplay_velocity = 4000;
                    break;
                case 'low' :
                    settings.autoplay_velocity = 8000;
                    break;
            }
    
            return this.each(function() {
                let $getPath = window.location.href;

                $(this).find('li').each(function(index) {
                    $(this).attr('data-item-order', index+1);
                    $(this).find('img').attr('data-item-order', index+1);
                });
                
                createDOMElem();
                init();
                preloader();

                // EnableOptions();

                // basics mechanics
                $.getScript( `${$getPath}/js/_partials/_basics.js` , function() {
                    slideFunctions($app, settings, $_THIS);
                });
                
                // wrappSelector();
                // pos_Elements();
                
                // statusBoxPosition();
               
                // stylizer
                $.getScript( `${$getPath}/js/_partials/_stylizer.js` , function() {
                    styleFunctions($app, settings);
                });
                
            });
    
            function init() {
                $app.find('.WS-lightbox--container img').css({
                    'max-width' : `calc(95vw - ${settings.buttons.size*2}px)`,
                    'max-height' : `calc(95vh - ${settings.buttons.size*2}px)`
                });
            }
    
    
            function preloader() {
                $app.ready(()=> {
                    $('.WS-lightbox-preloader').css('display', 'none');
                });
            }


            //////////////////////////////////////////////////////////////////
            //// CREATE ON DOM  /////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////
            function createButtonDOM($button) {
                let $iconElem = {
                    close   : 'far fa-times-circle',
                }
                $.each($iconElem, function(key, value) {
                    if ( key === $button ) {
                        let $newElem = `<div class="WS-lb-ctrl--${$button}"><i class="${value}"></i></div>`;
                        $app.append($newElem);
                    }
                });
                if ( $button === 'arrows' ) {
                    let $newElem = 
                    `<div class="WS-lb-${$button}">
                        <span class="WS-lb-arrow--left">
                            <i class="${settings.arrows.icon_style}-left"></i>
                        </span> 
                        <span class="WS-lb-arrow--right">
                            <i class="${settings.arrows.icon_style}-right"></i>
                        </span> 
                    </div>`;
                    $app.append($newElem);
                }
            }

            // function createBoxDOM($name, $value) {
            //     let $val = $value[1].replace('-X', '').replace('-Y', '');
            //     let $elem = `<div class="WS-lb-pos--${$value[0]}_${$val}"></div>`;  

            //     if ( $(`.WS-lb-pos--${$value[0]}_${$val}`).length === 0 ) {
            //         if ( $value[1] === 'inside' || $val === 'attached' ) {
            //             $container.append($elem);
            //         } else {
            //             $app.append($elem);
            //         }
            //     }
            // }
            
            function createDOMElem() {
                // settings.arrows.position ??
                $.each(settings ,function(key, value) {
                    if ( key === 'arrows' && settings.enable.includes('arrows') ) { createButtonDOM(key); }
                });
                if ( settings.enable.includes('close') ) {
                    createButtonDOM('close');
                }
            }

            function createBaseDOM() {
                let $base = 
                    `<div class="WS-lightbox" data-display="0">
                        <div class="WS-lightbox--container">
                            <div class="WS-lightbox--subcontainer">
                                <img 
                                    src="" 
                                    alt="alt" 
                                    title="title" 
                                    description="description">
                            </div>
                        </div>
                    </div>`;
                $('body').append($base);
            }
  
            
        };
    })(jQuery);
    