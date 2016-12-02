require(
    ["board-view", "board"],
    function(BoardViewer, Board) {
        var init = function() {
            new BoardViewer(document.body, new Board());
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