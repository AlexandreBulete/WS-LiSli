(function($)
{
    $.fn.WS_lightbox = function(options)
    {
        var settings = $.extend({
            color : 'rgb(29, 124, 159)',
            backgroundImage : false,
            overlay : true,
            disableArrow : false,
            arrowStyle : 'style_1',
            arrowColor : 'white',
            arrowHover : 'rectangle',
            crossStyle : 'style_1',
            template : 'dark',
            bannerCaption : true,
            title : true,
            count : true,
            bannerSelector : true,
            animationSpeed : 400,

        }, options);

        var $element = this.find('li');

        return this.each(function() {
            putOnTheDOM();
            init();

            $navbarLength = $('.lightbox--navbar li').length - 1;
            $lightbox = $('#WS_Lightbox ');

            if ( settings.backgroundImage ) {
                overFlowGrid();
            }

            displayLightbox();
            removeLightbox();

            switchWithNavBar();
            switchWithArrow('arrow-left');
            switchWithArrow('arrow-right');
            switchWithKeyBoard();

            slideToggleBanner();

        });

        function displayLightbox() {
            $element.click( function() {
                switch ( settings.backgroundImage ) {
                    case true:
                    var $imgSelected = $(this).css('background-image');
                    $imgSrc = $imgSelected.replace('url(','').replace(')','').replace(/\"/gi, "");
                    var $titleSelected = $(this).attr('title');
                    break;
                    case false:
                    var $imgSelected = $(this).find('img');
                    var $imgSrc = $imgSelected.attr('src');
                    var $titleSelected = $imgSelected.attr('title');
                    break;
                }

                if ( !$titleSelected || !settings.title )
                {
                    $titleSelected = "";
                }

                var $index = parseInt($(this).attr('data-position')) - 1;

                var $position = $(this).attr('data-position');

                $lightbox.fadeIn();

                checkImage($('.lightbox--content img').attr('src', $imgSrc));

                var $itemNavbar = $('.lightbox--navbar li:eq('+($index)+')');
                addStyle($itemNavbar);

                $('.lightbox--content img').attr('src', $imgSrc).attr('data-index', $index);
                $('.lightbox--banner .banner-title .project-title').text($titleSelected);
                $('.lightbox--banner .banner-title .count').text($position + '/' + ($navbarLength + 1) );
            });
        }

        function removeLightbox() {
            $('#WS_Lightbox .cross-icon').click(function() {
                $('#WS_Lightbox ').fadeOut();
            });
            $(document).mouseup(function (e){
                var $usedArea = $(".lightbox--content img, .lightbox--content [class*='arrow-'], .lightbox--navbar, .lightbox--banner, .btn-toggle-banner");
                if ( !$usedArea.is(e.target) && $usedArea.has(e.target).length === 0 && $lightbox.css('display') == 'block' ) {
                    $('#WS_Lightbox ').fadeOut();
                }
            });
            $(document).keydown(function(e) {
                if (e.keyCode == 27) {
                    $('#WS_Lightbox ').fadeOut();
                }
            });

        }

        function switchWithNavBar() {
            $('.lightbox--navbar li').click(function() {
                var $dataIndexSelected = $(this).index();
                switchItem($dataIndexSelected);
            });
        }

        function switchWithArrow($arrow) {
            $('.lightbox--content .'+$arrow).click(function() {
                var $index = $('.lightbox--content img').attr('data-index');
                switch ($arrow) {
                    case 'arrow-left':
                    if ($index > 0) { $index--; } else { $index = $navbarLength; }
                    break;
                    case 'arrow-right':
                    if ($index < $navbarLength) { $index++; } else { $index = 0; }
                    break;
                }
                switchItem($index);
            });
        }

        function switchWithKeyBoard() {
            $(document).keydown(function(e) {
                var $index = $('.lightbox--content img').attr('data-index');
                switch (e.keyCode) {
                    case 37:
                    if ( $index > 0 ) { $index--; } else { $index = $navbarLength; }
                    break;
                    case 39:
                    if ( $index < $navbarLength ) { $index++; } else { $index = 0; }
                    break;
                }
                switchItem($index);
            });
        }

        function switchItem($index) {
            $('.lightbox--content img').attr('data-index', $index);

            if ( $index != $(this) ) {
                var $itemNavbar = $('.lightbox--navbar li:eq('+($index)+')');
                var $titleItemNavbar = $itemNavbar.attr('title');
            }

            var $imgNext = ($itemNavbar.css('background-image')).replace('url(','').replace(')','').replace(/\"/gi, "");

            var $titleSelected = $itemNavbar.attr('title');
            var $position = $itemNavbar.attr('data-position');
            var $length = $('.lightbox--navbar li').length;

            $('.lightbox--banner .banner-title .project-title').text($titleItemNavbar);
            $('.lightbox--banner .banner-title .count').text($position + '/' + $length);

            transitionFaded($('.lightbox--content img'), $imgNext);

            addStyle($itemNavbar);
        }

        function transitionFaded($elem, $data) {
            $elem
            .fadeOut(settings.animationSpeed, function() {
                setTimeout(function() {
                    checkImage($elem.attr('src', $data));
                }, 20);
            })
            .fadeIn(settings.animationSpeed);
        };

        function checkImage($img) {
            if ( $img.width() > $img.height() ) {
                $img.addClass('horizontal').removeClass('vertical');
            } else {
                $img.addClass('vertical').removeClass('horizontal');
            }
            return $img;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////// PUT ON THE DOM ////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function init() {
            $element.each(function(index) {
                index ++;
                $(this).addClass('items item-'+index).attr('data-position', index);

                switch ( settings.backgroundImage ) {
                    case true:
                    var $itemSrc = "background-image:" + $(this).css('background-image');
                    if ( $(this).is('[title]') ) {
                        var $itemTitle = $(this).attr('title');
                    }
                    break;
                    case false:
                    var $img = $(this).find('img');
                    $itemSrc = 'background-image:url(' + $img.attr('src') + ')';
                    if ( $img.is('[title]') ) {
                        var $itemTitle = $img.attr('title');
                    }
                    break;
                }

                if ( !$itemTitle || !settings.title )
                {
                    $itemTitle = "";
                }

                var $itemPos = $(this).index();

                $('#WS_Lightbox .lightbox--navbar')
                .append(
                    "<li class='items' style=" + $itemSrc + " title=" + "'" + $itemTitle + "'" + " data-position=" + ($itemPos+1) +
                    ">" +
                    "</li>"
                );
            });

        }
        function putOnTheDOM() {
            $('body').append(
                "<div id='WS_lightbox'>" +
                    "<div class='lightbox--bg'>" +
                        "<div class='lightbox--container'>" +
                            "<div class='lightbox--content'>" +
                                "<div class='cross-icon'>" +
                                    "<i id='WS-lb-cross-icon' class='far fa-times-circle'></i>" +
                                "</div>" +
                                "<img>" +
                                "<span class='arrow-left'><i id='WS-lb-icon-left' class='fas fa-angle-left'></i></span>" +
                                "<span class='arrow-right'><i id='WS-lb-icon-right' class='fas fa-angle-right'></i></span>" +
                            "</div>" +
                        "</div>" +
                        "<div class='lightbox--banner'>" +
                            "<span class='btn-toggle-banner'><i id='WS-lb-toggle-icon' class='rotate-0 fas fa-caret-down'></i></span>" +
                            "<div class='lightbox--banner-elements'>" +
                                "<div class='banner-title'>" +
                                    "<h3 class='project-title'></h3>" +
                                    "<p class='count'></p>" +
                                "</div>" +
                                "<ul class='lightbox--navbar'>" +
                                "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
            );
            if (settings.disableArrow) {
                $('#WS_lightbox .arrow-left, #WS_lightbox .arrow-right').css('display', 'none');
            }
            if ( !settings.bannerCaption ) {
                $('#WS_lightbox .banner-title').css('display', 'none');
                $('#WS_lightbox .lightbox--container').css('height', 'calc(98% - 104px)');
            }
            if ( !settings.count ) {
                $('#WS_lightbox .banner-title .count').css('display', 'none');
            }
            if ( !settings.title ) {
                $('#WS_lightbox .banner-title .project-title').css('display', 'none');
            }
            if ( !settings.bannerSelector ) {
                $('#WS_lightbox .lightbox--navbar').css('display', 'none');
                $('#WS_lightbox .lightbox--container').css('height', 'calc(98% - 39px)');
            }
            if ( !settings.bannerSelector ) {
                $('#WS_lightbox .lightbox--navbar').css('display', 'none');
                $('#WS_lightbox .lightbox--container').css('height', 'calc(98% - 39px)');
            }
            if ( !settings.bannerCaption && !settings.bannerSelector ) {
                $('#WS_lightbox .lightbox--container').css('height', '98%');
            }
            if ( !settings.overlay ) {
                $('#WS_lightbox .lightbox--bg').css('background', 'none');
            }
        }

        function slideToggleBanner() {
            $('.btn-toggle-banner').click(function() {
                $('.lightbox--banner-elements').slideToggle();
                var $icon = $('.btn-toggle-banner #WS-lb-toggle-icon');
                switch ($icon.hasClass('rotate-180')) {
                    case true:
                        $icon.removeClass('rotate-180').addClass('rotate-0');
                        break;
                    case false:
                        $icon.removeClass('rotate-0').addClass('rotate-180');
                        break;

                }
            });
        }

        function overFlowGrid() {
            var $items = $element;
            var $limit = 3;
            var $rest = $items.length - $limit;
            var $elem = $element.siblings(('.item-'+$limit));
            if ( $rest > 0 ) {
                $elem
                .append(
                    "<div class='layout-grid-overflow'>" +
                    "<p class='rest'>" +
                    "<span>+" + $rest + "</span>" +
                    "</p>" +
                    "</div>")
                    .hover(function() {
                        $('.WS_Lightbox .item-'+$limit+' svg').css('display', 'none');
                    });
                }
            }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////// STYLES ////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////////

            function addStyle($elem) {
                var $arrowLeft = $('#WS_Lightbox .arrow-left #WS-lb-icon-left');
                var $arrowRight = $('#WS_Lightbox .arrow-right #WS-lb-icon-right');
                var $cross = $('#WS_Lightbox .lightbox--content .cross-icon #WS-lb-cross-icon');

                switch (settings.arrowStyle) {
                    case 'style_1':
                    $arrowLeft.removeClass().addClass('fas fa-arrow-left');
                    $arrowRight.removeClass().addClass('fas fa-arrow-right');
                    break;
                    case 'style_2' :
                    $arrowLeft.removeClass().addClass('fas fa-caret-left');
                    $arrowRight.removeClass().addClass('fas fa-caret-right');
                    break;
                    case 'style_3' :
                    $arrowLeft.removeClass().addClass('fas fa-chevron-circle-left');
                    $arrowRight.removeClass().addClass('fas fa-chevron-circle-right');
                    break;
                    case 'style_4' :
                    $arrowLeft.removeClass().addClass('fas fa-angle-left');
                    $arrowRight.removeClass().addClass('fas fa-angle-right');
                    break;
                }

                switch (settings.crossStyle) {
                    case 'style_1':
                    $cross.removeClass().addClass('fas fa-times');
                    break;
                    case 'style_2':
                    $cross.removeClass().addClass('fas fa-times-circle');
                    break;
                    case 'style_3':
                    $cross.removeClass().addClass('far fa-times-circle');
                    break;
                    case 'style_3':
                    $cross.removeClass().addClass('fas fa-window-close');
                    break;
                    case 'style_4':
                    $cross.removeClass().addClass('far fa-window-close');
                    break;

                }

                $arrowLeft.css('color', settings.arrowColor);
                $arrowLeft.css('color', settings.arrowColor);

                switch (settings.template) {
                    case 'default': case 'cinema':
                    var template = {
                        border_navbar_items : 'white',
                        cross : 'white',
                        title : 'white'
                    }
                    break;
                    case 'heaven' :
                    var template = {
                        border_navbar_items : 'lightgrey',
                        cross : 'grey',
                        title : '#525252'
                    }
                    $('.lightbox--bg').css('background-color', 'white');
                    $('.lightbox--bg').css('background-color', 'rgba(255, 255, 255, .8)');
                    $('.lightbox--banner .btn-toggle-banner').css('background-color', 'rgba(255, 255, 255, .5)').css('color', 'lightgrey');
                    $('.lightbox--banner .banner-title').css('background-color', 'rgba(255, 255, 255, .5)').css('box-shadow', '0 -2px 5px rgba(0, 0, 0, 0.1)');
                    $('.lightbox--banner .banner-title .project-title, .lightbox--banner .banner-title .count').css('color', template.title);
                    $('.lightbox--navbar').css('background-color', 'white').css('box-shadow', '0 -2px 5px rgba(0,0,0, 0.1)');
                    $('.lightbox--navbar .items').css('border-color', 'grey');
                    $('.lightbox--content .cross-icon').css('color', template.cross);
                    break;
                }

                switch ( settings.arrowHover ) {
                    case 'none' :
                    $arrowLeft.parent().addClass('none-hover');
                    $arrowRight.parent().addClass('none-hover');
                    break;
                    case 'rectangle':
                    $arrowLeft.parent().addClass('rectangle-hover');
                    $arrowRight.parent().addClass('rectangle-hover');
                    break;
                    case 'square':
                    $arrowLeft.parent().addClass('square-hover');
                    $arrowRight.parent().addClass('square-hover');
                    break;
                    case 'circle':
                    $arrowLeft.parent().addClass('circle-hover');
                    $arrowRight.parent().addClass('circle-hover');
                    break;
                }

                $('.lightbox--content .cross-icon').on({
                    mouseenter: function () {
                        $(this).css('color', settings.color);
                    },
                    mouseleave: function () {
                        $(this).css('color', template.cross);
                    }
                });

                $('.lightbox--navbar .items').each(function() {
                    if ( $(this).attr('data-position') == $elem.attr('data-position') ) {
                        $(this).css('border-color', settings.color);
                    } else {
                        $(this).css('border-color', template.border_navbar_items);
                    }
                });
            }
        };
    })(jQuery);
