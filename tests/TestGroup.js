/**
 * Test group
 * 
 * Copyright (c) 2016, Evan Moritz.
 * Licensed under the MIT license. See accompanying LICENSE file for terms.
 */

define(function() {
    return function() {
        var tests = arguments;
        this.run = function() {
            for (var i = 0; i < tests.length; ++i) {
                tests[i]();
            }
        };
    };
});