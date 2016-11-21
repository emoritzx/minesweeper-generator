define(function() {

    "use strict";
    
    var defaults = {
        width: 10,
        height: 10,
        smily: 0,
        fill: 'N'
    };
    
    var Board = function(board) {
        board = board || defaults;
        this.width = board.width || defaults.width;
        this.height = board.height || defaults.height;
        this.smily = board.smily || defaults.smily;
        if (board instanceof Board && board.size === this.size) {
            this._grid = board._grid;
        } else {
            this._grid = new Array(this.size);
            this._grid.fill(defaults.fill);
        }
    };
    
    Board.prototype.getCell = function(x, y) {
        if (x < 0 || x >= this.width) {
            throw new RangeError("x is outside of range");
        }
        if (y < 0 || y >= this.height) {
            throw new RangeError("y is outside of range");
        }
        return this._grid[y * this.width + x];
    };
    
    return Board;
});