var valid = new Array('1', '2', '3', '4', '5', '6', '7', '8', 'B', 'C', 'W', 'N', 'E', 'M', 'Q');

function fill(val) {
    for (x = 0; x < gridlength; x++) {
        document.forms['grid'].elements[x].value = val;
    }
}

function check1(el) {
    var a = false;
    for (x = 0; x < valid.length; x++) {
        el.value = el.value.toUpperCase();
        if (el.value == valid[x] || el.value == '') {
            a = true;
        }
    }
    if (!a) {
        alert('Error: invalid character - ' + el.value + '\nPlease enter a valid character.');
        el.value = '';
    }
}

function check2(el) {
    if (parseInt(el.value) < 9 && document.forms['info'].frame[0].checked) {
        alert('Grid must be at least 9x9 when frame is on.');
        if (el.name == 'width') {
            el.value = vWidth;
        } else {
            el.value = vHeight;
        }
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
    for (b = 0; b < gridlength; b++) {
        el = document.forms['grid'].elements[b];
        if (el.value == '') {
            alert('Error: empty cell - #' + (b + 1) + '\nPlease fill out all cells.');
            return;
        }
        for (x = 0; x < valid.length; x++) {
            el.value = el.value.toUpperCase();
            if (el.value == valid[x]) {
                a = true;
            }
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