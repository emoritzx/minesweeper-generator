define(
    [],
    function() {
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
            drawOptions(container, board);
            drawGrid(container, board);
            this._parent.appendChild(this._container);
        };
        
        function drawOptions(container, board) {
            container.appendChild((function() {
                var div = document.createElement("DIV");
                div.appendChild(document.createTextNode("Use frame?"));
                var checkbox = document.createElement("INPUT");
                checkbox.type = "checkbox";
                checkbox.checked = board.frame;
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
        
        return Viewer;
    }
);