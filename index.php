<?php require 'data.php'; ?>

<html lang="fr" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Demo Lightbox | Alexandre Buleté</title>
    </head>
    <body>
        <ul>
            <li> <img src="images/01.jpg" alt=""> </li>
            <li> <img src="images/02.jpg" alt=""> </li>
            <li> <img src="images/03.jpg" alt=""> </li>
            <li> <img src="images/04.jpg" alt=""> </li>
        </ul>


<div id="lightbox">
    <div class="lightbox-bg">
        <div class="lightbox--container">
            <div class="lightbox--content">
                <div class="cross-icon">
                    <i class="far fa-times-circle"></i>
                </div>
                <img src="<?= $portfolio['image'] ?>" alt="crea1" data-index="0">
                <span class="arrow-left"><i class="fas fa-angle-left"></i></span>
                <span class="arrow-right"><i class="fas fa-angle-right"></i></span>
            </div>
        </div>
        <div class="lightbox--banner">
            <div class="banner-title d_grid gt-col-4">
                <h3 class="weight-200 project-title"></h3>
                <p class="count m-2-r">#</p>
            </div>
            <ul class="lightbox-navbar d_flex-start justify">
                <?php foreach ($portfolios as $portfolio): ?>
                    <p><?= $portfolio['title']?></p>
                    <li class="items"
                        style="background-image: url(<?= $portfolio['image'] ?>)"
                        title="<?= $portfolio['title'] ?>"
                        data-position="<?= $portfolio['position'] ?>" data-sort="">
                    </li>
                <?php endforeach ?>
            </ul>
        </div>
    </div>
</div>

    </body>
</html>
