var linter = require("autolint").linter;
var configuration = require("autolint").configuration;

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

var excludeFile = function (file) {
    if (!file) return false;
    return this.excludes.some(function (exclude) {
        return file.match(exclude);
    });
};

module.exports = {
    create: function (options) {
        var instance = Object.create(this);
        var config = configuration.defaultsPlus(options);
        instance.linter = linter.create(config);
        instance.excludes = config.excludes || [];
        return instance;
    },

    check: function (script, file) {
        if (excludeFile.call(this, file)) { return { ok: true }; }
        var result = this.linter.check(script, file || "[anonymous]");
        result.ok = result.errors.length === 0;
        result.toString = toString;
        return result;
    }
};