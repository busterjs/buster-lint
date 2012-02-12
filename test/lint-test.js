var buster = require("buster");
var lint = require("../lib/lint");

buster.testCase('Lint', {
    setUp: function () {
        this.linter = lint.create({});
    },

    "should be ok without lint": function () {
        var result = this.linter.check("var a = 123;");
        assert(result.ok);
    },

    "should not be ok with lint": function () {
        var result = this.linter.check("var a = 123");
        refute(result.ok);
    },

    "should give anonymous filename if not given": function () {
        var result = this.linter.check("var a = 123");
        assert.equals(result.toString(),
                      "[anonymous]:1:12 Expected ';' and instead saw '(end)'.");
    },

    "should give multiple errors": function () {
        var result = this.linter.check("var a= 1;\nvar b= 2;", "myfile.js");
        assert.equals(result.toString(),
                      "myfile.js:1:6 Missing space between 'a' and '='.\n" +
                      "myfile.js:2:6 Missing space between 'b' and '='.");
    },

    "should handle more errors than maxErrors gracefully": function () {
        var result = this.linter.check("var a= 1;\nvar b= 2;", "myfile.js");
        result.errors.push(null);
        assert.equals(result.toString(),
                      "myfile.js:1:6 Missing space between 'a' and '='.\n" +
                      "myfile.js:2:6 Missing space between 'b' and '='.\n" +
                      "myfile.js has more errors, stopped parsing. " +
                      "Good luck with that!\n" +
                      "Include more errors in this report by setting " +
                      "the maxerr option");
    },

    "should use given configuration": function () {
        var linter = lint.create({
            linterOptions: { eqeq: true }
        });
        var result = linter.check("var a = 1, b = 2, c = a == b;");
        assert(result.ok);
    }
});
