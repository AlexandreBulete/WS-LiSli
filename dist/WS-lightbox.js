(function($)
{
    $.fn.WS_lightbox = function(options)
    {
        var settings = $.extend({
            color : 'rgb(29, 124, 159)',
            backgroundImage : false,
            disableArrow : false,
            arrowStyle : 'style_1',
            arrowColor : 'white',
            template : 'dark'

        }, options);

        var $element = this.find('li');
        console.log($element);

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


        });

        function displayLightbox() {
            console.log('ok');
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

                if ( !$titleSelected ) { $titleSelected = ""; }

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
                var $usedArea = $(".lightbox--content img, .lightbox--content [class*='arrow-'], .lightbox--navbar, .lightbox--banner");
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
            .fadeOut(400, function() {
                setTimeout(function() {
                    checkImage($elem.attr('src', $data));
                }, 10);
            })
            .fadeIn(400);
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

                if ( !$itemTitle ) {
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
                                    "<i class='far fa-times-circle'></i>" +
                                "</div>" +
                                "<img>" +
                                "<span class='arrow-left'><i id='WS-lb-icon-left' class='fas fa-angle-left'></i></span>" +
                                "<span class='arrow-right'><i id='WS-lb-icon-right' class='fas fa-angle-right'></i></span>" +
                            "</div>" +
                        "</div>" +
                        "<div class='lightbox--banner'>" +
                            "<div class='banner-title'>" +
                                "<h3 class='project-title'></h3>" +
                                "<p class='count'></p>" +
                            "</div>" +
                            "<ul class='lightbox--navbar'>" +
                            "</ul>" +
                        "</div>" +
                    "</div>" +
                "</div>"
            );
            if (settings.disableArrow) {
                $('#WS_lightbox .arrow-left, #WS_lightbox .arrow-right').css('display', 'none');
            }
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

            $arrowLeft.css('color', settings.arrowColor);
            $arrowLeft.css('color', settings.arrowColor);

            switch (settings.template) {
                case 'default':
                case 'cinema':
                    break;
                case 'heaven' :
                    var template = {
                        border_navbar_items : 'lightgrey',
                        cross : 'white'
                    }
                    $('.lightbox--bg').css('background-color', 'white');
                    $('.lightbox--bg').css('background-color', 'rgba(255, 255, 255, .6)');
                    $('.lightbox--banner .banner-title').css('background-color', 'rgba(255, 255, 255, .2)').css('box-shadow', '0 -2px 5px rgba(0, 0, 0, 0.1)');
                    $('.lightbox--banner .banner-title .project-title, .lightbox--banner .banner-title .count').css('color', 'darkgrey');
                    $('.lightbox--navbar').css('background-color', 'white').css('box-shadow', '0 -2px 5px rgba(0,0,0, 0.1)');
                    $('.lightbox--navbar .items').css('border-color', 'grey');
                    $('.lightbox--content .cross-icon').css('color', template.cross);
                    break;
            }

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
