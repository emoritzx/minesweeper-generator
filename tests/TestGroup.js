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