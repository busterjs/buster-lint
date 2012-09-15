var linter = require("autolint").linter;
var configuration = require("autolint").configuration;

var prepareError = function (file, error) {
    if (!error) {
        return {
            file: file || "<anonymous>",
            description: "More errors, stopped parsing. Good luck with " +
                "that!\nInclude more errors in this report by setting the " +
                "maxerr option"
        };
    }

    return {
        file: file || "<anonymous>",
        line: error.line,
        col: error.character,
        description: error.reason,
        content: error.evidence
    };
};

var excludeFile = function (file) {
    if (!file) { return false; }
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
        return {
            ok: result.errors.length === 0,
            errors: result.errors.map(prepareError.bind(this, file))
        };
    }
};