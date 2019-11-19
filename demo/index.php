<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Demo WS-LiSli | Alexandre Buleté</title>
    <script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous">
    </script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <link rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
        integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
        crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">

    <script src="es2015/lightbox.js" defer></script>
</head>
<body>
    <?php require 'data.php'; ?>
        <h1 class="title">Demo - WS-LiSli</h1>

        <ul id="WS-LiSli" class="grid">
            <?php foreach ($portfolios as $portfolio): ?>
                <li>
                    <img title="<?= $portfolio['title'] ?>" src="images/<?= $portfolio['image'] ?>" data-description="<?= $portfolio['description'] ?>">
                </li>
            <?php endforeach; ?>
        </ul>
    </body>

    <script type="text/javascript">
    $(function() {
        $('#WS-LiSli').WS_lightbox_free({
            'enable' : ['close', 'arrows'],
            buttons : {
                size          : 40,
                style         : 'square', // ( default, square, circle, rounded )
                color         : 'black',
                color_icon    : 'white',
                border_width  : 0,
                border_color  : '',
                opacity       : .5,
                hover_opacity : 1
            },
            arrows : {
                position      : 'attached', // ( inside, outside, attached )
                style         : 'svelt', // (default, square, circle, rounded, svelt)
                icon_style    : 'angle', // (default, caret, angle, chevron)
                icon_size     : 20,
                opacity       : .5,
                hover_effect  : 'shrink', // (zoom, shrink, translate)
                hover_opacity : .8
            },
            image : {
                border_radius : 0,
                border_color : '',
                border_width : 0,
                bg : 'none'
            },
            background : {
                filter : 'image',
                opacity : .5
            },
            display_velocity : 'low',
            slide_velocity : 'fast'
        });
        
    });
    </script>
</html>


