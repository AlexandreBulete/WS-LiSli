<?php require 'data.php'; ?>

<html lang="fr" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Demo Lightbox | Alexandre Buleté</title>
    <script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous">
    </script>
    <link rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
        integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
        crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <!-- <link rel="stylesheet" href="grid.css"> -->
    <script src="lightbox.js" defer></script>
    <script type="text/javascript">
    $(function() {
        $('#my_lightbox').WS_lightbox({
            backgroundImage : true,
            disableArrow : false,
            arrowStyle : 'style_4',
            template : 'heaven'
        });
    });
    </script>
</head>
<body>

<!-- The first model with background-image on <li> -->
<h1 class="title">Demo - WS Lightbox | Alexandre Buleté</h1>
<div class="grid">
    <ul class="grid-content" id="my_lightbox">
        <?php foreach ($portfolios as $portfolio): ?>
            <li title="<?= $portfolio['title'] ?>"
                style="background-image: url('images/<?= $portfolio['image'] ?>')">
                <i class="fas fa-plus"></i>
            </li>
        <?php endforeach; ?>
    </ul>
</div>


<!-- The second model with <img> -->
<!-- <ul class="WS_Lightbox_bis">
    <?php foreach ($portfolios as $portfolio): ?>
        <li>
            <img title="<?= $portfolio['title'] ?>" src="images/<?= $portfolio['image'] ?>"
            style="max-width:200px;">
        </li>
    <?php endforeach; ?>
</ul> -->


<div class="credits">
    <p>I Will Soon add a new open source for this grid model ;)</p>
    <p><em>All this pictures are available on : <a href="https://pixabay.com/" target="_blank">pixabay</a></em></p>
</div>

</body>
</html>
