<?php

parse_str($_SERVER['QUERY_STRING']);

#################### MODE: normal ####################

if (!isset($mode) || $mode == 'resize') {

if (!isset($w) || !isset($h)) { $w = 10; $h = 10; }
if ($w > 30) { $w = 30; }
if ($h > 30) { $h = 30; }

?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Minesweeper Image Builder</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript">

    var valid = new Array('1','2','3','4','5','6','7','8','B','C','W','N','E','M','Q');

    var gridlength = <?php echo ($w*$h); ?>;
    var vWidth = <?php echo $w; ?>;
    var vHeight = <?php echo $h; ?>;

    function fill(val) {
     for (x=0; x<gridlength; x++) {
      document.forms['grid'].elements[x].value = val;
     }
    }

    function check1(el) {
     var a = false;
     for (x=0; x<valid.length; x++) {
      el.value = el.value.toUpperCase();
      if (el.value == valid[x] || el.value == '') { a = true; }
     }
     if (!a) {
      alert('Error: invalid character - ' + el.value + '\nPlease enter a valid character.');
      el.value = '';
     }
    }

    function check2(el) {
     if (parseInt(el.value) < 9 && document.forms['info'].frame[0].checked) {
      alert('Grid must be at least 9x9 when frame is on.');
      if (el.name == 'width') { el.value = vWidth; }
       else { el.value = vHeight; }
     }
     if (parseInt(el.value) > 30 && el.name == 'width') {
      alert('Width must not exceed 30 blocks.');
      el.value = 30;
     }
     if (parseInt(el.value) > 20 && el.name == 'height') {
      alert('Height must not exceed 20 blocks.');
      el.value = 20;
     }
    }

    function checkgrid() {
     var a = false;
     var prep = '';
     for (b=0; b<gridlength; b++) {
      el = document.forms['grid'].elements[b];
      if (el.value == '') {
       alert('Error: empty cell - #' + (b+1) + '\nPlease fill out all cells.');
       return;
      }
      for (x=0; x<valid.length; x++) {
       el.value = el.value.toUpperCase();
       if (el.value == valid[x]) { a = true; }
      }
      if (!a) {
       alert('Error: invalid character - ' + el.value + '\nPlease enter a valid character.');
       el.value = '';
       return;
      }
      prep += el.value;
     }
     document.forms['info'].elements['graph'].value = prep;
     document.forms['info'].submit();
    }

    function frameoff() {
     if (vWidth < 9 || vHeight < 9) {
      alert('Minimum frame size is 9x9');
      document.forms['info'].frame[1].checked = true;
     }
    }

</script>
</head>

<body>

<h1 id="head">Image Builder</h1>

<p id="links"><b>Links:</b>
[ <a href="../">Back to samples</a> ]
</p>

<form name="info" action="builder.php" method="GET" onsubmit="return false">
<label>Field size:</label>(w x h)
<input type="text" name="width"  maxlength="2" size="3" value="<?php echo $w; ?>" onchange="check2(this)" /> x
<input type="text" name="height" maxlength="2" size="3" value="<?php echo $h; ?>" onchange="check2(this)" />
<input type="button" value="Change" onclick="location.href='?mode=resize&amp;w='+this.form.width.value+'&amp;h='+this.form.height.value+'&amp;frame='+this.form.frame[0].checked" />
<input type="button" value="Reset" onclick="location.href='builder.php'" />
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
[<input type="radio" name="frame" value="true" <?php if (!isset($frame) || $frame == 'true') { echo 'checked'; } ?> onclick="frameoff()"/> Yes
<input type="radio" name="frame" value="false" <?php if ($frame == 'false') { echo 'checked'; } ?>/> No ]
<label>Smily:</label>
<input type="radio" name="smily" value="1" checked /><img src="images/smily1.png" alt="normal" align="middle" onclick="document.forms[0].elements[9].checked=true" onmouseover="this.style.cursor='pointer'" />
<input type="radio" name="smily" value="2" /><img src="images/smily2.png" alt="ooh!" align="middle" onclick="document.forms[0].elements[10].checked=true" onmouseover="this.style.cursor='pointer'" />
<input type="radio" name="smily" value="3" /><img src="images/smily3.png" alt="ouch!" align="middle" onclick="document.forms[0].elements[11].checked=true" onmouseover="this.style.cursor='pointer'" />
<input type="radio" name="smily" value="4" /><img src="images/smily4.png" alt="yes!" align="middle" onclick="document.forms[0].elements[12].checked=true" onmouseover="this.style.cursor='pointer'" /><br />
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
for ($x=0; $x<$h; $x++) {
 $out .= "<tr>\n";
 for ($y=0; $y<$w; $y++) {
  $out .= '<td><input type="text" name="grid[]" maxlength="1" size="1" onchange="check1(this)" /></td>'."\n";
 }
 $out .= '</tr>';
}

echo $out."</table>\n";

?>

</form>

</body>
</html><?php

}

#################### MODE: frame ####################

if ($mode == 'frame') {

$arg = $_SERVER['QUERY_STRING'];

$a = strpos($arg,'mode')+5;
$b = strpos($arg,'&',$a);

$path = str_replace('&','&amp;',substr_replace($arg,'draw',$a,$b-$a));

?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
<p id="links">[ <a href="../">Back to samples</a> | <a href="builder.php">Create new image</a> ]</p>
<div><label>Width: </label><?php echo $width; ?></div>
<div><label>Height: </label><?php echo $height; ?></div>
<div><label>Frame: </label><?php echo $frame; ?></div>
<div><label>Smily: </label><?php echo $smily; ?></div>
<div><label>Mines: </label><?php echo $mines; ?></div>
<div><label>Time: </label><?php echo $time; ?></div>
</div>
<div class="image">
<img src="builder.php?<?php echo $path; ?>" alt="emoritzx.com - Minesweeper image" title="Minesweeper image" />
</div>

</body>
</html><?php

}

#################### MODE: draw ####################

if ($mode == 'draw') {

$img_width  = $width  * 16;
$img_height = $height * 16;

for ($x=0; $x<strlen($graph); $x++) {
$grid[$x] = $graph{$x};
}

if ($frame == 'true') {
$img_width  += 26;
$img_height += 110;
$grid_x = 15;
$grid_y = 99;
} else {
$grid_x = 0;
$grid_y = 0;
}

$img = @imagecreate($img_width,$img_height)
    or die("Cannot Initialize new GD image stream");
$bg1 = imagecolorallocate($img,0,0,0);
$txt = imagecolorallocate($img,255,0,0);

if ($frame == 'true') {

$img_frame = imagecreate($img_width,$img_height);
$bg2 = imagecolorallocate($img_frame,0,0,0);

# title2.png - 104x43
$img_f_title = imagecreatefrompng('images/title2.png');
imagecopy($img_frame,$img_f_title,0,0,0,0,104,43);

# close.png - 72x43
$img_f_close = imagecreatefrompng('images/close2.png');
imagecopy($img_frame,$img_f_close,$img_width-72,0,0,0,72,43);

# titlebar2.png - 1x43
$img_f_titlebar = imagecreatefrompng('images/titlebar2.png');
for($x=104; $x<$img_width-72; $x++) {
imagecopy($img_frame,$img_f_titlebar,$x,0,0,0,1,43);
}

# minebox.png - 60x56
$img_f_minebox = imagecreatefrompng('images/minebox.png');
imagecopy($img_frame,$img_f_minebox,0,43,0,0,60,56);

# timebox.png - 58x56
$img_f_timebox = imagecreatefrompng('images/timebox.png');
imagecopy($img_frame,$img_f_timebox,$img_width-58,43,0,0,58,56);

# smilybar.png - 1x56
$img_f_smilybar = imagecreatefrompng('images/smilybar.png');
for($x=60; $x<$img_width-58; $x++) {
imagecopy($img_frame,$img_f_smilybar,$x,43,0,0,1,56);
}

# smily - 26x26
$img_f_smily = imagecreatefrompng('images/smily'.$smily.'.png');
imagecopy($img_frame,$img_f_smily,($img_width-26)/2,59,0,0,26,26);

# left.png - 15x1
$img_f_left = imagecreatefrompng('images/left.png');
for($x=99; $x<$img_height-11;$x++) {
imagecopy($img_frame,$img_f_left,0,$x,0,0,15,1);
}

# right.png - 15x1
$img_f_right = imagecreatefrompng('images/right.png');
for($x=99; $x<$img_height-11;$x++) {
imagecopy($img_frame,$img_f_right,$img_width-11,$x,0,0,15,1);
}

# cornerL.png - 15x11
$img_f_cornerL = imagecreatefrompng('images/cornerL.png');
imagecopy($img_frame,$img_f_cornerL,0,$img_height-11,0,0,15,11);

# cornerR.png - 11x11
$img_f_cornerR = imagecreatefrompng('images/cornerR.png');
imagecopy($img_frame,$img_f_cornerR,$img_width-11,$img_height-11,0,0,11,11);

# bottom.png - 1x11
$img_f_bottom = imagecreatefrompng('images/bottom.png');
for($x=15; $x<$img_width-11; $x++) {
imagecopy($img_frame,$img_f_bottom,$x,$img_height-11,0,0,1,11);
}

# mines(3) - 13x23 @ 20,60
$str = sprintf("%03d",$mines);
$img_f_mine1 = imagecreatefrompng('images/big'.$str{0}.'.png');
$img_f_mine2 = imagecreatefrompng('images/big'.$str{1}.'.png');
$img_f_mine3 = imagecreatefrompng('images/big'.$str{2}.'.png');
imagecopy($img_frame,$img_f_mine1,20,60,0,0,13,23);
imagecopy($img_frame,$img_f_mine2,33,60,0,0,13,23);
imagecopy($img_frame,$img_f_mine3,46,60,0,0,13,23);

# time(3) - 13x23 @ $img_width-57,60
$str = sprintf("%03d",$time);
$img_f_time1 = imagecreatefrompng('images/big'.$str{0}.'.png');
$img_f_time2 = imagecreatefrompng('images/big'.$str{1}.'.png');
$img_f_time3 = imagecreatefrompng('images/big'.$str{2}.'.png');
imagecopy($img_frame,$img_f_time1,$img_width-57,60,0,0,13,23);
imagecopy($img_frame,$img_f_time2,($img_width-57)+13,60,0,0,13,23);
imagecopy($img_frame,$img_f_time3,($img_width-57)+26,60,0,0,13,23);

# frame to main
imagecopy($img,$img_frame,0,0,0,0,$img_width,$img_height);

}

$brick = array('B'=>'mine1','C'=>'mine2','W'=>'mine3','N'=>'normal','E'=>'empty','M'=>'mark1','Q'=>'mark2');

$orig_x = $grid_x;
$orig_y = $grid_y;

for ($x=0; $x<count($grid); $x++) {

if (is_numeric($grid[$x])) { $pic = $grid[$x]; }
 else { $pic = $brick[$grid[$x]]; }

$img_sq = imagecreatefrompng('images/'.$pic.'.png');
imagecopy($img,$img_sq,$grid_x,$grid_y,0,0,16,16);

$grid_x += 16;

if (($grid_x-$orig_x)/16 == $width) {
$grid_x = $orig_x;
$grid_y += 16;
}

}

header("Content-type: image/png");
imagepng($img);
imagedestroy($img);
imagedestroy($img_sq);
if ($frame == 'true') {
imagedestroy($img_frame);
imagedestroy($img_f_title);
imagedestroy($img_f_close);
imagedestroy($img_f_titlebar);
imagedestroy($img_f_minebox);
imagedestroy($img_f_timebox);
imagedestroy($img_f_smilybar);
imagedestroy($img_f_smily);
imagedestroy($img_f_left);
imagedestroy($img_f_right);
imagedestroy($img_f_cornerL);
imagedestroy($img_f_cornerR);
imagedestroy($img_f_bottom);
imagedestroy($img_f_mine1);
imagedestroy($img_f_mine2);
imagedestroy($img_f_mine3);
imagedestroy($img_f_time1);
imagedestroy($img_f_time2);
imagedestroy($img_f_time3);
}
exit;

}

?>