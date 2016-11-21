<?php
$arg = $_SERVER['QUERY_STRING'];

$a = strpos($arg, 'mode') + 5;
$b = strpos($arg, '&', $a);

$path = str_replace('&', '&amp;', substr_replace($arg, 'draw', $a, $b - $a));
?><!DOCTYPE html>
<html>
    <head>
        <title>Minesweeper - Image Builder</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <style type="text/css">

            h2 { font-size: 18pt; }
            a { color: red; text-decoration: none; }
            .main  { position: absolute; }
            .image { text-align: center; margin-top: 100px; }

        </style>
    </head>

    <body>

        <h1 id="head">Minesweeper Image Builder</h1>
        <div class="main">
            <h2>Completed image</h2>
            <p id="links">[ <a href="./">Create new image</a> ]</p>
            <div><label>Width: </label><?php echo $width; ?></div>
            <div><label>Height: </label><?php echo $height; ?></div>
            <div><label>Frame: </label><?php echo $frame; ?></div>
            <div><label>Smily: </label><?php echo $smily; ?></div>
            <div><label>Mines: </label><?php echo $mines; ?></div>
            <div><label>Time: </label><?php echo $time; ?></div>
        </div>
        <div class="image">
            <img src="generator.php?<?php echo $path; ?>" alt="abiogenesis.me - Minesweeper image" title="Minesweeper image" />
        </div>

    </body>
</html>