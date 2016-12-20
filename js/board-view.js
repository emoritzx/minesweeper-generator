/**
 * Board viewer UI generator
 * 
 * Copyright (c) 2016, Evan Moritz.
 * Licensed under the MIT license. See accompanying LICENSE file for terms.
 */
define(
    ["board"],
    function(Board) {
        "use strict";
        
        var WIDTH_MAX = 30;
        var HEIGHT_MAX = 24;
        
        var Viewer = function(form, grid, output, board) {
            var painters = [];
            drawOptions(painters, form, board);
            drawGrid(painters, grid, board);
            drawImage(painters, output, board);
            repaint(painters);
        };
        
        function repaint(painters) {
            painters.forEach(function(painter) {
                painter();
            });
        };
        
        function drawOptions(painters, container, board) {
            container.appendChild((function() {
                var div = document.createElement("DIV");
                var label = document.createElement("LABEL");
                label.appendChild(document.createTextNode("Smily:"));
                div.appendChild(label);
                Board.smilys.forEach(function(smily) {
                    var radio = document.createElement("INPUT");
                    radio.type = "radio";
                    radio.checked = smily === board.smily;
                    radio.name = "smilys";
                    radio.onclick = function() {
                        board.smily = smily;
                        repaint(painters);
                    };
                    div.appendChild(radio);
                    var image = document.createElement("IMG");
                    image.src = "images/smily-" + smily + ".png";
                    image.alt = smily;
                    image.title = smily;
                    image.onclick = function() {
                        radio.click();
                    };
                    image.setAttribute("smily", "");
                    div.appendChild(image);
                });
                return div;
            })());
            container.appendChild((function() {
                var div = document.createElement("DIV");
                var label = document.createElement("LABEL");
                label.appendChild(document.createTextNode("Fill:"));
                div.appendChild(label);
                var normal = document.createElement("BUTTON");
                normal.appendChild(document.createTextNode("Normal"));
                normal.onclick = function() {
                    board.fill(Board.NORMAL);
                    board.data = Board.NORMAL;
                    repaint(painters);
                };
                div.appendChild(normal);
                var empty = document.createElement("BUTTON");
                empty.appendChild(document.createTextNode("Empty"));
                empty.onclick = function() {
                    board.fill(Board.EMPTY);
                    board.data = Board.EMPTY;
                    repaint(painters);
                };
                div.appendChild(empty);
                return div;
            })());
            container.appendChild((function() {
                var div = document.createElement("DIV");
                var label = document.createElement("LABEL");
                label.appendChild(document.createTextNode("Use frame?"));
                div.appendChild(label);
                var checkbox = document.createElement("INPUT");
                checkbox.type = "checkbox";
                checkbox.checked = board.frame;
                checkbox.onclick = function() {
                    board.frame = checkbox.checked;
                    repaint(painters);
                };
                div.appendChild(checkbox);
                return div;
            })());
            drawNumberEditor(container, painters, "mines", board, 0, 999);
            drawNumberEditor(container, painters, "time", board, 0, 999);
            drawNumberEditor(container, painters, "width", board, 9, WIDTH_MAX);
            drawNumberEditor(container, painters, "height", board, 9, HEIGHT_MAX);
        }
        
        function drawNumberEditor(container, painters, name, board, min, max) {
            var div = document.createElement("DIV");
            div.className = "number-editor";
            var label = document.createElement("LABEL");
            label.appendChild(document.createTextNode(name[0].toUpperCase() + name.slice(1) + ':'));
            div.appendChild(label);
            var textbox = document.createElement("INPUT");
            textbox.type = "number";
            textbox.value = board[name];
            textbox.max = "" + max;
            textbox.min = "" + min;
            textbox.onfocus = function() {
                this.select();
            };
            textbox.onchange = function() {
                if (this.value < min) {
                    this.value = min;
                } else if (this.value > max) {
                    this.value = max;
                }
                board[name] = this.value;
                repaint(painters);
            };
            div.appendChild(textbox);
            container.appendChild(div);
        }
        
        function drawGrid(painters, container, board) {
            var table = document.createElement("TABLE");
            var tbody = drawGridBase(painters, board);
            table.appendChild(tbody);
            container.appendChild(table);
            painters.push(function() {
                table.removeChild(tbody);
                tbody = drawGridBase(painters, board);
                table.appendChild(tbody);
            });
        }
        
        function drawGridBase(painters, board) {
            var tbody = document.createElement("TBODY");
            for (var y = 0; y < board.height; ++y) {
                var tr = document.createElement("TR");
                tbody.appendChild(tr);
                for (var x = 0; x < board.width; ++x) {
                    var td = document.createElement("TD");
                    tr.appendChild(td);
                    var entry = drawGridEditor(painters, x, y, board);
                    td.appendChild(entry);
                }
            }
            return tbody;
        }
        
        function drawGridEditor(painters, x, y, board) {
            var input = document.createElement("INPUT");
            input.type = "textbox";
            input.maxlength = "1";
            input.minlength = "1";
            input.value = board.getCell(x, y);
            input.style.width = "1em";
            input.onfocus = function() {
                this.select();
            };
            input.onchange = function() {
                if (Board.valid[this.value] !== true) {
                    this.value = Board.EMPTY;
                }
                board.setCell(x, y, this.value);
                repaint(painters);
            };
            return input;
        }
        
        function drawImage(painters, container, board) {
            var image = document.createElement("IMG");
            image.src = generateUrl(board);
            image.alt = "Board";
            container.appendChild(image);
            painters.push(function() {
                image.src = generateUrl(board);
            });
        }
        
        function generateUrl(board) {
            return "generator.php?board=" + board.encode();
        }
        
        return Viewer;
    }
);