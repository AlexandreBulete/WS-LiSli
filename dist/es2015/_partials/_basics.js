function slideFunctions($app, options, $_THIS) {
    displayLightbox($app, options, $_THIS);
    hideLightbox($app, options);

    nextSlide($app, options, $_THIS);
    prevSlide($app, options, $_THIS);

    keySlideControls($app, options);
}

function displayLightbox($app, options, $_THIS) {
    // conversVelocity(options);
    $_THIS.find('li img').click(function () {
        $('body').addClass('WS-lightbox--opened');
        let $getSrc = $(this).attr('src');
        let $getTitle = $(this).attr('title');
        let $getDescription = $(this).attr('data-description');
        let $getLength = $_THIS.find('li').length;
        let $getCurrentOrder = $(this).attr('data-item-order');

        $app.fadeIn(options.display_velocity).css('display', 'grid');

        $app.find('.WS-lightbox--container img').attr('src', $getSrc).attr('title', $getTitle).attr('alt', $getTitle).attr('description', $getDescription).attr('data-item-order', $getCurrentOrder);
        currentBg($app, options, $getSrc);
    });
}

function hideLightbox($app, options) {
    // conversVelocity(options);
    $app.find('.WS-lb-ctrl--close').click(function () {
        $('body').removeClass('WS-lightbox--opened');
        $app.fadeOut(800);
    });
    var checkTime = 0;
    $(document).keydown(function (e) {
        var currentTime = new Date();
        if (currentTime.getTime() - checkTime > options.slide_velocity + 400) {
            if (e.key === 'Escape') {
                $('body').removeClass('WS-lightbox--opened');
                $app.fadeOut(800);
            }
            checkTime = currentTime.getTime();
        }
    });
}

function nextSlide($app, options, $_THIS) {
    var checkTime = 0;
    $app.find('.WS-lb-arrow--right').click(function () {
        var currentTime = new Date();
        if (currentTime.getTime() - checkTime > options.slide_velocity + 400) {
            let $currentImg = $(this).parent().parent().find('img');
            let $nextDataItemOrder = parseInt($currentImg.attr('data-item-order')) + 1;
            if ($nextDataItemOrder > $_THIS.find('li').length) {
                $nextDataItemOrder = 1;
            }
            let $nextItem = $_THIS.find(`li[data-item-order=${$nextDataItemOrder}]`);
            let $nextImg = $nextItem.find('img');
            transitionFade($app, $nextImg, options);

            checkTime = currentTime.getTime();
        }
    });
}

function prevSlide($app, options, $_THIS) {
    var checkTime = 0;
    $app.find('.WS-lb-arrow--left').click(function () {
        var currentTime = new Date();
        if (currentTime.getTime() - checkTime > options.slide_velocity + 400) {
            let $currentImg = $(this).parent().parent().find('img');
            let $prevDataItemOrder = parseInt($currentImg.attr('data-item-order')) - 1;
            if ($prevDataItemOrder <= 0) {
                $prevDataItemOrder = $_THIS.find('li').length;
            }
            let $prevItem = $_THIS.find(`li[data-item-order=${$prevDataItemOrder}]`);
            let $prevImg = $prevItem.find('img');
            transitionFade($app, $prevImg, options);

            checkTime = currentTime.getTime();
        }
    });
}

function keySlideControls($app, options) {
    var checkTime = 0;
    $(document).keydown(function (e) {
        var currentTime = new Date();
        if (currentTime.getTime() - checkTime > options.slide_velocity + 400) {
            if (e.key === 'Escape') {
                hideLightbox($app, options);
            }
            if (e.key === 'ArrowRight') {
                $app.find('.WS-lb-arrow--right').trigger('click');
            }
            if (e.key === 'ArrowLeft') {
                $app.find('.WS-lb-arrow--left').trigger('click');
            }
            checkTime = currentTime.getTime();
        }
    });
}

function selectItem($app, options, $_THIS) {
    $app.find('.WS-lightbox--selector .WS-thumb img').click(function () {
        transitionFade($app, $(this), options);
    });
    $app.find('.WS-lb--dot').click(function () {
        let $imgSelected = $_THIS.find(`li[data-item-order=${parseInt($(this).attr('data-item-order'))}]`);
        transitionFade($app, $imgSelected.find('img'), options);
    });
}

// TRANSITIONS
function transitionFade($app, $img_n1, options) {
    let $getSrc = $img_n1.attr('src');
    let $getTitle = $img_n1.attr('title');
    let $getDescription = $img_n1.attr('data-description');
    let $getCurrentOrder = $img_n1.attr('data-item-order');

    $app.find('.WS-lightbox--container img').fadeOut(options.slide_velocity).attr('data-item-order', $getCurrentOrder);
    setTimeout(function () {
        $app.find('.WS-lightbox--container img').attr('src', $getSrc).attr('title', $getTitle).attr('alt', $getTitle).attr('description', $getDescription);
        // .attr('data-item-order', $getCurrentOrder);
    }, options.slide_velocity);
    $app.find('.WS-lightbox--container img').fadeIn(options.slide_velocity);
    if (options.background.filter === 'image') {
        currentBg($app, options, $getSrc);
    }
}

// extras

function currentBg($app, options, $getSrc) {
    // if ( options.background.filter === 'image' ) {
    $app.find('.WS-lightbox--bg').fadeOut(options.slide_velocity);
    setTimeout(function () {
        $app.find('.WS-lightbox--bg').css('background-image', `url(${$getSrc})`);
    }, options.slide_velocity);
    $app.find('.WS-lightbox--bg').fadeIn(options.slide_velocity);
    // }
}