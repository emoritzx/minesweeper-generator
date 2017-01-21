/**
 * Application main
 * 
 * Copyright (c) 2016-2017, Evan Moritz.
 * Licensed under the MIT license. See accompanying LICENSE file for terms.
 */

require(
    ["board-view", "board"],
    function(BoardViewer, Board) {
        var init = function() {
            new BoardViewer(
                document.getElementById("form"),
                document.getElementById("grid"),
                document.getElementById("output"),
                new Board());
        };
        if (document.readyState === "complete") {
            init();
        } else {
            document.addEventListener('DOMContentLoaded', function() { 
                init();
            }, false);
        }
    }
);