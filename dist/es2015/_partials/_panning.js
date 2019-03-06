function zoomButton(settings, $app) {
    $('.WS-lb-ctrl--zoom').click(function () {
        let $selector = $app.find('.WS-lightbox--selector');
        let $subcontainer = $app.find('.WS-lightbox--subcontainer');
        let $op = parseInt($subcontainer.attr('data-zoom-open'));
        $subcontainer.attr('data-zoom-open', ($op += 1) % 2);

        // quand clic = 0+1 = 1 / quand ferme = 2
        if ($op === 2) {
            $subcontainer.removeAttr('style');
            if ($selector.hasClass('waiting-panning')) {
                $selector.removeClass('waiting-panning');
                $app.find('.WS-lb-ctrl--zoom i').removeClass().addClass('fas fa-search-plus');
                $('.WS-lb-ctrl--wrapper').click();
            }
            if ($app.find('.WS-lb--dots').hasClass('waiting-panning')) {
                $app.find('.WS-lb--dots').removeClass('waiting-panning').fadeIn();
            }
        } else {
            // ouvert
            $app.find('.WS-lb-ctrl--zoom i').removeClass().addClass('fas fa-search-minus');
            if ($app.find('.WS-lb--dots').css('display') != 'none') {
                $app.find('.WS-lb--dots').addClass('waiting-panning').fadeOut();
            }
            $subcontainer.animate({ width: '98vw', height: '98vh' });
            $(window).mousemove(function (e) {
                let $diff_h = $(window).height() - $subcontainer.height();
                let $diff_w = $(window).width() - $subcontainer.width();
                let $cur_Y = e.clientY - $diff_h / 2;
                let $cur_X = e.clientX - $diff_w / 2;

                let $img_w = $subcontainer.find('img').width();
                let $img_h = $subcontainer.find('img').height();
                let $sub_w = $subcontainer.width();
                let $sub_h = $subcontainer.height();

                let $perc_sub_w = $cur_X * 100 / $sub_w;
                let $perc_sub_h = $cur_Y * 100 / $sub_h;

                let $rel_img_w = $img_w * $perc_sub_w / 100;
                let $rel_img_h = $img_h * $perc_sub_h / 100;

                $subcontainer.find('img').css('left', `calc(-${$rel_img_w}px + ${$cur_X}px )`).css('top', `calc(-${$rel_img_h}px + ${$cur_Y}px )`);
            });
            if ($app.find('.WS-lightbox--selector').attr('data-open') == 1) {
                $selector.addClass('waiting-panning');
                $('.WS-lb-ctrl--wrapper').click();
            }
        }
        $app.toggleClass('zoom-view');

        // display arrows
        if ($app.find('.WS-lightbox--subcontainer').attr('data-zoom-open') == 1) {
            $app.find('.WS-selector--arrows').fadeOut();
        } else {
            $app.find('.WS-selector--arrows').fadeIn();
        }
        //
    });
}