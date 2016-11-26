"use strict";
require.config({
    paths: {
        'js': '../js',
        'lib': "../lib",
        'QUnit': '../lib/qunit/qunit-2.0.1',
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       } 
    }
});

// require the unit tests.
require(
    ['QUnit', 'test-board'],
    function(QUnit) {
        // run the tests.
        for (var i = 1; i < arguments.length; ++i) {
            arguments[i].run();
        }
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);