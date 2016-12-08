<?php

$data = json_decode(base64_decode($_GET['board']), true);

$img_width = $data['width'] * 16;
$img_height = $data['height'] * 16;

if ($data['frame'] === TRUE) {
    $img_width += 26;
    $img_height += 110;
    $grid_x = 15;
    $grid_y = 99;
} else {
    $grid_x = 0;
    $grid_y = 0;
}

$img = @imagecreate($img_width, $img_height)
    or die('Cannot Initialize new GD image stream');
$bg1 = imagecolorallocate($img, 0, 0, 0);
$txt = imagecolorallocate($img, 255, 0, 0);

if ($data['frame'] == 'true') {

    $img_frame = imagecreate($img_width, $img_height);
    $bg2 = imagecolorallocate($img_frame, 0, 0, 0);

# title2.png - 104x43
    $img_f_title = imagecreatefrompng('images/title2.png');
    imagecopy($img_frame, $img_f_title, 0, 0, 0, 0, 104, 43);

# close.png - 72x43
    $img_f_close = imagecreatefrompng('images/close2.png');
    imagecopy($img_frame, $img_f_close, $img_width - 72, 0, 0, 0, 72, 43);

# titlebar2.png - 1x43
    $img_f_titlebar = imagecreatefrompng('images/titlebar2.png');
    for ($x = 104; $x < $img_width - 72; $x++) {
        imagecopy($img_frame, $img_f_titlebar, $x, 0, 0, 0, 1, 43);
    }

# minebox.png - 60x56
    $img_f_minebox = imagecreatefrompng('images/minebox.png');
    imagecopy($img_frame, $img_f_minebox, 0, 43, 0, 0, 60, 56);

# timebox.png - 58x56
    $img_f_timebox = imagecreatefrompng('images/timebox.png');
    imagecopy($img_frame, $img_f_timebox, $img_width - 58, 43, 0, 0, 58, 56);

# smilybar.png - 1x56
    $img_f_smilybar = imagecreatefrompng('images/smilybar.png');
    for ($x = 60; $x < $img_width - 58; $x++) {
        imagecopy($img_frame, $img_f_smilybar, $x, 43, 0, 0, 1, 56);
    }

# smily - 26x26
    $img_f_smily = imagecreatefrompng('images/smily-' . $data['smily'] . '.png');
    imagecopy($img_frame, $img_f_smily, ($img_width - 26) / 2, 59, 0, 0, 26, 26);

# left.png - 15x1
    $img_f_left = imagecreatefrompng('images/left.png');
    for ($x = 99; $x < $img_height - 11; $x++) {
        imagecopy($img_frame, $img_f_left, 0, $x, 0, 0, 15, 1);
    }

# right.png - 15x1
    $img_f_right = imagecreatefrompng('images/right.png');
    for ($x = 99; $x < $img_height - 11; $x++) {
        imagecopy($img_frame, $img_f_right, $img_width - 11, $x, 0, 0, 15, 1);
    }

# cornerL.png - 15x11
    $img_f_cornerL = imagecreatefrompng('images/cornerL.png');
    imagecopy($img_frame, $img_f_cornerL, 0, $img_height - 11, 0, 0, 15, 11);

# cornerR.png - 11x11
    $img_f_cornerR = imagecreatefrompng('images/cornerR.png');
    imagecopy($img_frame, $img_f_cornerR, $img_width - 11, $img_height - 11, 0, 0, 11, 11);

# bottom.png - 1x11
    $img_f_bottom = imagecreatefrompng('images/bottom.png');
    for ($x = 15; $x < $img_width - 11; $x++) {
        imagecopy($img_frame, $img_f_bottom, $x, $img_height - 11, 0, 0, 1, 11);
    }

# mines(3) - 13x23 @ 20,60
    $str = sprintf("%03d", $data['mines']);
    $img_f_mine1 = imagecreatefrompng('images/big' . $str{0} . '.png');
    $img_f_mine2 = imagecreatefrompng('images/big' . $str{1} . '.png');
    $img_f_mine3 = imagecreatefrompng('images/big' . $str{2} . '.png');
    imagecopy($img_frame, $img_f_mine1, 20, 60, 0, 0, 13, 23);
    imagecopy($img_frame, $img_f_mine2, 33, 60, 0, 0, 13, 23);
    imagecopy($img_frame, $img_f_mine3, 46, 60, 0, 0, 13, 23);

# time(3) - 13x23 @ $img_width-57,60
    $str = sprintf("%03d", $data['time']);
    $img_f_time1 = imagecreatefrompng('images/big' . $str{0} . '.png');
    $img_f_time2 = imagecreatefrompng('images/big' . $str{1} . '.png');
    $img_f_time3 = imagecreatefrompng('images/big' . $str{2} . '.png');
    imagecopy($img_frame, $img_f_time1, $img_width - 57, 60, 0, 0, 13, 23);
    imagecopy($img_frame, $img_f_time2, ($img_width - 57) + 13, 60, 0, 0, 13, 23);
    imagecopy($img_frame, $img_f_time3, ($img_width - 57) + 26, 60, 0, 0, 13, 23);

# frame to main
    imagecopy($img, $img_frame, 0, 0, 0, 0, $img_width, $img_height);
}

$brick = array('B' => 'mine1', 'C' => 'mine2', 'W' => 'mine3', 'N' => 'normal', 'E' => 'empty', 'M' => 'mark1', 'Q' => 'mark2');

$orig_x = $grid_x;
$orig_y = $grid_y;

for ($x = 0; $x < count($data['grid']); $x++) {

    if (is_numeric($data['grid'][$x])) {
        $pic = $data['grid'][$x];
    } else {
        $pic = $brick[$data['grid'][$x]];
    }

    $img_sq = imagecreatefrompng('images/' . $pic . '.png');
    imagecopy($img, $img_sq, $grid_x, $grid_y, 0, 0, 16, 16);

    $grid_x += 16;

    if (($grid_x - $orig_x) / 16 == $data['width']) {
        $grid_x = $orig_x;
        $grid_y += 16;
    }
}

header("Content-type: image/png");
imagepng($img);
imagedestroy($img);
imagedestroy($img_sq);

if ($data['frame'] == 'true') {
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