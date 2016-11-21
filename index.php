<?php

parse_str($_SERVER['QUERY_STRING']);

if (!isset($w) || !isset($h)) {
    $w = 10;
    $h = 10;
}
if ($w > 30) {
    $w = 30;
}
if ($h > 30) {
    $h = 30;
}

?><!DOCTYPE html>
<html>
    <head>
        <title>Minesweeper Image Builder</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script type="text/javascript">

            var gridlength = <?php echo ($w * $h); ?>;
            var vWidth = <?php echo $w; ?>;
            var vHeight = <?php echo $h; ?>;

        </script>
        <script type="text/javascript" src="js/builder.js"></script>
    </head>

    <body>

        <h1 id="head">Image Builder</h1>

        <p id="links"><b>Links:</b>
            [ <a href="../">Back to samples</a> ]
        </p>

        <form name="info" action="viewer.php" method="GET" onsubmit="return false">
            <label>Field size:</label>(w x h)
            <input type="text" name="width"  maxlength="2" size="3" value="<?php echo $w; ?>" onchange="check2(this)" /> x
            <input type="text" name="height" maxlength="2" size="3" value="<?php echo $h; ?>" onchange="check2(this)" />
            <input type="button" value="Change" onclick="location.href = '?mode=resize&amp;w=' + this.form.width.value + '&amp;h=' + this.form.height.value + '&amp;frame=' + this.form.frame[0].checked" />
            <input type="button" value="Reset" onclick="location.href = 'builder.php'" />
            <label>Note:</label> This <em>will</em> erase the board.

            <table><tr>
                    <th rowspan="3" valign="top">Key:</th>
                    <td>B = Bomb (normal)</td>
                    <td>C = Bomb (clicked)</td>
                    <td>W = Bomb (wrong)</td>
                </tr><tr>
                    <td>N = Normal square</td>
                    <td>E = Empty square</td>
                    <td>M = Marked Mine</td>
                </tr><tr>
                    <td>Q = Question Mark</td>
                    <td colspan="2">1-8 = Numbers</td>
                </tr></table>

            <label>Fill:</label>
            <input type="button" value="Normal" onclick="fill('N')" />
            <input type="button" value="Empty" onclick="fill('E')" />
            <input type="button" value="Clear field" onclick="fill('')" /><br />
            <label>Use frame?</label>
            [<input type="radio" name="frame" value="true" <?php
if (!isset($frame) || $frame == 'true') {
    echo 'checked';
}
?> onclick="frameoff()"/> Yes
            <input type="radio" name="frame" value="false" <?php
                   if ($frame == 'false') {
                       echo 'checked';
                   }
                   ?>/> No ]
            <label>Smily:</label>
            <input type="radio" name="smily" value="1" checked /><img src="images/smily1.png" alt="normal" align="middle" onclick="document.forms[0].elements[9].checked = true" onmouseover="this.style.cursor = 'pointer'" />
            <input type="radio" name="smily" value="2" /><img src="images/smily2.png" alt="ooh!" align="middle" onclick="document.forms[0].elements[10].checked = true" onmouseover="this.style.cursor = 'pointer'" />
            <input type="radio" name="smily" value="3" /><img src="images/smily3.png" alt="ouch!" align="middle" onclick="document.forms[0].elements[11].checked = true" onmouseover="this.style.cursor = 'pointer'" />
            <input type="radio" name="smily" value="4" /><img src="images/smily4.png" alt="yes!" align="middle" onclick="document.forms[0].elements[12].checked = true" onmouseover="this.style.cursor = 'pointer'" /><br />
            <label>Mines:</label>
            <input type="text" name="mines" size="2" maxlength="3" value="99" />
            <label>Time:</label>
            <input type="text" name="time" size="2" maxlength="3" value="0" />
            <input type="button" value="Create Image" onclick="checkgrid()" />
            <input type="hidden" name="mode" value="frame" />
            <input type="hidden" name="graph" value="0" />

        </form>

        <form name="grid" onsubmit="return false">

            <?php
            $out = '<table id="gridz">';
            for ($x = 0; $x < $h; $x++) {
                $out .= "<tr>\n";
                for ($y = 0; $y < $w; $y++) {
                    $out .= '<td><input type="text" name="grid[]" maxlength="1" size="1" onchange="check1(this)" /></td>' . "\n";
                }
                $out .= '</tr>';
            }

            echo $out . "</table>\n";
            ?>

        </form>

    </body>
</html>