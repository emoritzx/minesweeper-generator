define(function() {

    "use strict";
    
    var Board = function(options) {
        var defaults = Board.defaults;
        options = options || defaults;
        this._.width = ("width" in options) ? options.width : defaults.width;
        this._.height = ("height" in options) ? options.height : defaults.height;
        this.smily = ("smily" in options) ? options.smily : defaults.smily;
        this.data = ("data" in options) ? options.data : defaults.data;
        this.frame = ("frame" in options) ? options.frame : defaults.frame;
        this.mines = ("mines" in options) ? options.mines : defaults.mines;
        this.time = ("time" in options) ? options.time : defaults.time;
        this._.grid = new Array(this.size);
        if (options instanceof Board && options.size === this.size) {
            for (var i = 0; i < options.private.grid.length; ++i) {
                this._.grid[i] = options.private.grid[i];
            }
        } else {
            this.fill(this.data);
        }
    };
    
    Object.defineProperties(Board, {
        defaults: {
            value: {
                width: 10,
                height: 10,
                smily: "normal",
                data: 'N',
                frame: true,
                mines: 10,
                time: 0
            },
            writable: false
        },
        smilys: {
            value: ["normal", "click", "lose", "win"],
            writable: false
        }
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
                this.resize(parseInt(value), this.height);
            }
        },
        height: {
            get: function() {
                return this._.height;
            },
            set: function(value) {
                this.resize(this.width, parseInt(value));
            }
        },
        size: {
            get: function() {
                return this.height * this.width;
            }
        },
        data: {
            get: function() {
                return this._.data;
            },
            set: function(value) {
                this._.data = value;
            }
        },
        smily: {
            get: function() {
                return this._.smily;
            },
            set: function(value) {
                this._.smily = value;
            }
        },
        frame: {
            get: function() {
                return this._.frame;
            },
            set: function(value) {
                this._.frame = (value) ? true : false;
            }
        },
        mines: {
            get: function() {
                return this._.mines;
            },
            set: function(value) {
                this._.mines = parseInt(value);
            }
        },
        time: {
            get: function() {
                return this._.time;
            },
            set: function(value) {
                this._.time = parseInt(value);
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
            var data = Array(delta).fill(this.data);
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
            var data = Array(this.width * delta).fill(this.data);
            Array.prototype.splice.apply(this._.grid, [this._.grid.length, 0].concat(data));
        } else if (height < this.height) {
            var delta = this.height - height;
            this._.grid.splice(this.size - this.width * delta, this.width * delta);
        }
        this._.height = height;
    };
    
    Board.prototype.fill = function(value) {
        this._.grid.fill(value);
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
    
    Board.prototype.encode = function() {
        return btoa(JSON.stringify({
            width: this.width,
            height: this.height,
            frame: this.frame,
            smily: this.smily,
            time: this.time,
            mines: this.mines,
            grid: this._.grid
        }));
    };
    
    return Board;
});