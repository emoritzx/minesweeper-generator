define(
    ["board"],
    function(Board) {
        "use strict";
        
        var Viewer = function(parent, board) {
            this._board = board;
            this._parent = parent;
            this.repaint();
        };
        
        Viewer.prototype.repaint = function() {
            if (typeof this._container !== "undefined") {
                this._parent.removeChild(this._container);
            }
            var board = this._board;
            var container = document.createElement("DIV");
            this._container = container;
            drawOptions(this, container, board);
            drawGrid(container, board);
            drawImage(container, board);
            this._parent.appendChild(this._container);
        };
        
        function drawOptions(view, container, board) {
            container.appendChild((function() {
                var div = document.createElement("DIV");
                div.appendChild(document.createTextNode("Smily"));
                Board.smilys.forEach(function(smily) {
                    var radio = document.createElement("INPUT");
                    radio.type = "radio";
                    radio.checked = smily === board.smily;
                    radio.name = "smilys";
                    radio.onclick = function() {
                        board.smily = smily;
                        view.repaint();
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
                div.appendChild(document.createTextNode("Fill:"));
                var normal = document.createElement("BUTTON");
                normal.appendChild(document.createTextNode("Normal"));
                normal.onclick = function() {
                    board.fill('N');
                    view.repaint();
                };
                div.appendChild(normal);
                var empty = document.createElement("BUTTON");
                empty.appendChild(document.createTextNode("Empty"));
                empty.onclick = function() {
                    board.fill('E');
                    view.repaint();
                };
                div.appendChild(empty);
                return div;
            })());
            container.appendChild((function() {
                var div = document.createElement("DIV");
                div.appendChild(document.createTextNode("Use frame?"));
                var checkbox = document.createElement("INPUT");
                checkbox.type = "checkbox";
                checkbox.checked = board.frame;
                checkbox.onclick = function() {
                    board.frame = checkbox.checked;
                    view.repaint();
                };
                div.appendChild(checkbox);
                return div;
            })());
            container.appendChild((function() {
                var div = document.createElement("DIV");
                div.appendChild(document.createTextNode("Mines:"));
                div.appendChild(document.createTextNode(board.mines));
                return div;
            })());
            container.appendChild((function() {
                var div = document.createElement("DIV");
                div.appendChild(document.createTextNode("Time:"));
                div.appendChild(document.createTextNode(board.time));
                return div;
            })());
            container.appendChild((function() {
                var div = document.createElement("DIV");
                div.appendChild(document.createTextNode("Width:"));
                div.appendChild(document.createTextNode(board.width));
                return div;
            })());
            container.appendChild((function() {
                var div = document.createElement("DIV");
                div.appendChild(document.createTextNode("Height:"));
                div.appendChild(document.createTextNode(board.height));
                return div;
            })());
        }
        
        function drawGrid(container, board) {
            var table = document.createElement("TABLE");
            var tbody = document.createElement("TBODY");
            table.appendChild(tbody);
            for (var y = 0; y < board.height; ++y) {
                var tr = document.createElement("TR");
                tbody.appendChild(tr);
                for (var x = 0; x < board.width; ++x) {
                    var td = document.createElement("TD");
                    tr.appendChild(td);
                    var entry = document.createTextNode(board.getCell(x, y));
                    td.appendChild(entry);
                }
            }
            container.appendChild(table);
        }
        
        function drawImage(container, board) {
            var image = document.createElement("IMG");
            image.src = generateUrl(board);
            image.alt = "Board";
            container.appendChild(image);
        }
        
        function generateUrl(board) {
            return "generator.php?board=" + board.encode();
        }
        
        return Viewer;
    }
);