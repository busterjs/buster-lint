var lint = require("./lint");

function processor(analyzer, resource, content) {
    // Temporary work-around for buster peculiarities
    if (!content) { return; }

    var result = this.checker.check(content, resource.path);
    if (!result.ok) {
        var path = resource.path;
        analyzer.error("Lint in " + path, result);
    }
}

module.exports = {
    create: function (options) {
        var instance = Object.create(this);
        instance.checker = lint.create(options || {});
        return instance;
    },

    beforeRun: function (config, analyzer) {
        ["libs", "sources", "testLibs", "tests"].forEach(function (group) {
            config.on("load:" + group, function (resourceSet) {
                resourceSet.addProcessor(processor.bind(this, analyzer));
            }.bind(this));
        }.bind(this));
    }
};
