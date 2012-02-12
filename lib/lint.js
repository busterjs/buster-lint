var linter = require("autolint").linter;
var configuration = require("autolint").configuration;

var errorDescription = function (error) {
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