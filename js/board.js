define(function() {

    "use strict";
    
    var Board = function(options) {
        var defaults = Board.defaults;
        options = options || defaults;
        this._.width = ("width" in options) ? options.width : defaults.width;
        this._.height = ("height" in options) ? options.height : defaults.height;
        this.smily = ("smily" in options) ? options.smily : defaults.smily;
        this.fill = ("fill" in options) ? options.fill : defaults.fill;
        this._.grid = new Array(this.size);
        if (options instanceof Board && options.size === this.size) {
            for (var i = 0; i < options.private.grid.length; ++i) {
                this._.grid[i] = options.private.grid[i];
            }
        } else {
            this._.grid.fill(this.fill);
        }
    };
    
    Object.defineProperty(Board, "defaults", {
        value: {
            width: 10,
            height: 10,
            smily: 0,
            fill: 'N'
        },
        writable: false
    });
    
    Object.defineProperties(Board.prototype, {
        "_": {
            value: {},
            writable: false
        },
        width: {
            get: function() {
                return this._.width;
            },
            set: function(value) {
                this.resize(value, this.height);
            }
        },
        height: {
            get: function() {
                return this._.height;
            },
            set: function(value) {
                this.resize(this.width, value);
            }
        },
        size: {
            get: function() {
                return this.height * this.width;
            }
        },
        fill: {
            get: function() {
                return this._.fill;
            },
            set: function(value) {
                this._.fill = value;
            }
        },
        smily: {
            get: function() {
                return this._.smily;
            },
            set: function(value) {
                this._.smily = value;
            }
        }
    });
    
    Board.prototype._.getIndex = function(x, y) {
        return x + this.width * y;
    };
    
    Board.prototype.getCell = function(x, y) {
        if (x < 0 || x >= this.width) {
            throw new RangeError("x is outside of range");
        }
        if (y < 0 || y >= this.height) {
            throw new RangeError("y is outside of range");
        }
        return this._.grid[this._.getIndex(x, y)];
    };
    
    Board.prototype.setCell = function(x, y, value) {
        var index = this._.getIndex(x, y);
        this._.grid[index] = value;
    };
    
    Board.prototype.resize = function(width, height) {
        if (width > this.width) {
            var delta = width - this.width;
            var data = Array(delta).fill(this.fill);
            for (var x = this.width; x < this._.grid.length + 1; x += width) {
                Array.prototype.splice.apply(this._.grid, [x, 0].concat(data));
            }
        } else if (width < this.width) {
            var delta = this.width - width;
            for (var x = this.width - delta; x < this._.grid.length + delta; x += width) {
                this._.grid.splice(x, delta);
            }
        }
        this._.width = width;
        if (height > this.height) {
            var delta = height - this.height;
            var data = Array(this.width * delta).fill(this.fill);
            Array.prototype.splice.apply(this._.grid, [this._.grid.length, 0].concat(data));
        } else if (height < this.height) {
            var delta = this.height - height;
            this._.grid.splice(this.size - this.width * delta, this.width * delta);
        }
        this._.height = height;
    };
    
    Board.prototype.toString = function() {
        var output = '';
        for (var index = 0; index < this.size; index += this.width) {
            output += '['
                + this._.grid.slice(index, index + this.width).join(',')
                + ']\n';
        }
        return output;
    };
    
    return Board;
});