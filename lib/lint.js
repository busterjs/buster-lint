var linter = require("../node_modules/autolint/lib/linter");
var configuration = require("../node_modules/autolint/lib/configuration");

var errorDescription = function (error) {
    if (!error) {
        return this.name +
            " has more errors, stopped parsing. Good luck with that!\n" +
            "Include more errors in this report by setting the maxerr option";
    }

    return this.name + ":" +
        error.line + ":" +
        error.character + " " +
        error.reason;
};

var toString = function () {
    return this.errors.map(errorDescription.bind(this)).join("\n");
};

module.exports = {
    create: function (options) {
        var instance = Object.create(this);
        var config = configuration.defaultsPlus(options);
        instance.linter = linter.create(config);
        return instance;
    },

    check: function (script, file) {
        var result = this.linter.check(script, file || "[anonymous]");
        result.ok = result.errors.length === 0;
        result.toString = toString;
        return result;
    }
};