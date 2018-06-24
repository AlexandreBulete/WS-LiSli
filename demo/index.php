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
        $('.WS_lightbox').WS_lightbox({
            backgroundImage : false
        });
    });
    </script>
</head>
<body>

<h1 class="title">Demo - WS Lightbox | Alexandre Buleté</h1>
<div class="grid">
    <!-- <ul class="WS_Lightbox grid-content">
        <?php foreach ($portfolios as $portfolio): ?>
            <li title="<?= $portfolio['title'] ?>"
                style="background-image: url('images/<?= $portfolio['image'] ?>')">
                <i class="fas fa-plus"></i>
            </li>
        <?php endforeach; ?>
    </ul> -->
</div>

<ul class="WS_Lightbox">
    <?php foreach ($portfolios as $portfolio): ?>
        <li>
            <img title="<?= $portfolio['title'] ?>" src="images/<?= $portfolio['image'] ?>"
            style="max-width:200px;">
        </li>
    <?php endforeach; ?>
</ul>

</body>
</html>
