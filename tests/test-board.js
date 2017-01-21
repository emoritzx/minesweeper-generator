/**
 * Board unit tests
 * 
 * Copyright (c) 2016-2017, Evan Moritz.
 * Licensed under the MIT license. See accompanying LICENSE file for terms.
 */

define(
    ['TestGroup', 'js/board'],
    function (TestGroup, Board) {
        
        "use strict";
        
        function runTest(message, options, expected, operation) {
            QUnit.test(message, function(assert) {
                var board = new Board(options);
                operation(board);
                var expectedHeight = expected.length;
                var expectedWidth = expected[0].length;
                assert.strictEqual(board.width, expectedWidth, "board width");
                assert.strictEqual(board.height, expectedHeight, "board height");
                assert.strictEqual(board.size, expectedWidth * expectedHeight, "board size");
                for (var x = 0; x < expectedWidth; ++x) {
                    for (var y = 0; y < expectedHeight; ++y) {
                        var expectedResult = expected[y][x];
                        assert.strictEqual(board.getCell(x, y), expectedResult, "board.getCell(" + x + "," + y + ") = " + expectedResult);
                    }
                }
            });
        }
        
        function dataTests() {
            runTest(
                "Constructor",
                {
                    height: 5,
                    width: 4,
                    data: 0
                },
                [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                function(board) { }
            );
            runTest(
                "Resize width +1",
                {
                    height: 4,
                    width: 4,
                    data: 0
                },
                [
                    [0,0,0,0,1],
                    [0,0,0,0,1],
                    [0,0,0,0,1],
                    [0,0,0,0,1]
                ],
                function(board) { board.data = 1; board.width += 1; }
            );
            runTest(
                "Resize width +3",
                {
                    height: 4,
                    width: 4,
                    data: 0
                },
                [
                    [0,0,0,0,1,1,1],
                    [0,0,0,0,1,1,1],
                    [0,0,0,0,1,1,1],
                    [0,0,0,0,1,1,1]
                ],
                function(board) { board.data = 1; board.width += 3; }
            );
            runTest(
                "Resize width -1",
                {
                    height: 4,
                    width: 4,
                    data: 0
                },
                [
                    [0,0,0],
                    [0,0,0],
                    [0,0,0],
                    [0,0,0]
                ],
                function(board) { board.data = 1; board.width -= 1; }
            );
            runTest(
                "Resize width -3",
                {
                    height: 4,
                    width: 5,
                    data: 0
                },
                [
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0]
                ],
                function(board) { board.data = 1; board.width -= 3; }
            );
            runTest(
                "Resize height +1",
                {
                    height: 4,
                    width: 4,
                    data: 0
                },
                [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [1,1,1,1]
                ],
                function(board) { board.data = 1; board.height += 1; }
            );
            runTest(
                "Resize height +3",
                {
                    height: 4,
                    width: 4,
                    data: 0
                },
                [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [1,1,1,1],
                    [1,1,1,1],
                    [1,1,1,1]
                ],
                function(board) { board.data = 1; board.height += 3; }
            );
            runTest(
                "Resize height -1",
                {
                    height: 4,
                    width: 4,
                    data: 0
                },
                [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                function(board) { board.data = 1; board.height -= 1; }
            );
            runTest(
                "Resize height -3",
                {
                    height: 5,
                    width: 4,
                    data: 0
                },
                [
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                function(board) { board.data = 1; board.height -= 3; }
            );
            runTest(
                "Fill",
                {
                    height: 4,
                    width: 4,
                    data: 0
                },
                [
                    [1,1,1,1],
                    [1,1,1,1],
                    [1,1,1,1],
                    [1,1,1,1]
                ],
                function(board) { board.fill(1); }
            );
        }
        
        function testValidity(value, valid) {
            QUnit.test("Value Test - " + value, function(assert) {
                assert[valid](Board.valid[value], valid);
            });
        }
        
        function validityTests() {
            [
                ['A', 'notOk'],
                ['B', 'ok'],
                ['C', 'ok'],
                [Board.EMPTY, 'ok'],
                [Board.NORMAL, 'ok'],
                ['W', 'ok'],
                ['N', 'ok'],
                ['E', 'ok'],
                ['M', 'ok'],
                ['Q', 'ok'],
                ['0', 'notOk'],
                ['1', 'ok'],
                ['2', 'ok'],
                ['3', 'ok'],
                ['4', 'ok'],
                ['5', 'ok'],
                ['6', 'ok'],
                ['7', 'ok'],
                ['8', 'ok'],
                ['9', 'notOk'],
                ['?', 'notOk'],
                ['!', 'notOk']
            ].forEach(function(pair) { 
                testValidity(pair[0], pair[1]);
            });
        }

        return new TestGroup(dataTests, validityTests);
    }
);