function styleFunctions($app, settings) {
    btnStyle($app, settings);
    arrowStyle($app, settings);
    // dotStyle($app, settings);
    // selectorStyle($app, settings);
    // arrowSelectorStyle($app, settings);

    bgStyle($app, settings);
    imageContainer($app, settings);

    // socialNetworkStyle($app, settings);
}

function btnStyle($app, settings) {
    let $btnElem = $app.find('.WS-lb-ctrl--close, .WS-lb-arrow--left, .WS-lb-arrow--right');
    if (settings.buttons.border_width > 3) {
        settings.buttons.border_width = 0;
    }

    $btnElem.css({
        'background-color': settings.buttons.color,
        'color': settings.buttons.color_icon,
        'border-width': settings.buttons.border_width + 'px',
        'border-color': settings.buttons.border_color,
        'height': settings.buttons.size + 'px',
        'width': settings.buttons.size + 'px',
        'opacity': settings.buttons.opacity
    });

    switch (settings.buttons.style) {
        case 'square':
            $btnElem.css('border-radius', '0px');
            break;
        case 'rounded':
            $btnElem.css('border-radius', '5px');
            break;
        case 'circle':
            $btnElem.css('border-radius', '100%');
            break;
    }
}

function arrowStyle($app, settings) {
    let $arrows = $app.find('[class^="WS-lb-arrow-"]');
    switch (settings.arrows.style) {
        case 'circle':
            $arrows.css('border-radius', '100%');
            break;
        default:
            break;
    }
    $app.find('.WS-lb-arrow--left i').removeClass().addClass(`${settings.arrows.icon_style}-left`);
    $app.find('.WS-lb-arrow--right i').removeClass().addClass(`${settings.arrows.icon_style}-right`);

    if (settings.arrows.position === 'attached') {
        $app.find('.WS-ligtbox--container').append($('.WS-lb-arrows'));
        let $arr = ['right', 'left'];
        $.each($arr, function (key, value) {
            $app.find(`.WS-lb-arrow--${value}`).css(value, `-${$app.find(`.WS-lb-arrow--${value}`).width() + 10}px`);
        });
    }
    if (settings.arrows.icon_size > $arrows.width()) {
        settings.arrows.icon_size = $arrows.width();
    }

    $arrows.css({ 'font-size': `${settings.arrows.icon_size}px`,
        'opacity': settings.arrows.opacity }).addClass(`${settings.arrows.hover_effect}-hover`);
    $arrows.hover(function () {
        $(this).css({ 'opacity': settings.arrows.hover_opacity });
    }, function () {
        $(this).css({
            'opacity': settings.arrows.opacity

        });
    });
}

function bgStyle($app, settings) {
    $app.css('background-color', settings.background.filter);
    if (settings.background.filter === 'image') {
        $app.append(`
            <span class="WS-lightbox--bg" style="opacity:${settings.background.opacity};">
            </span>
        `);
    }
}

function imageContainer($app, settings) {
    $app.find('.WS-lightbox--container .WS-lb-caption').css({
        'border-bottom-left-radius': settings.image.border_radius,
        'border-bottom-right-radius': settings.image.border_radius
    });
    $app.find('.WS-lightbox--subcontainer').css('background', settings.image.bg).find('img').css({
        'border-radius': settings.image.border_radius,
        'border-color': settings.image.border_color,
        'border-width': settings.image.border_width
    });
}