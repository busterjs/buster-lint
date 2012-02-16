var lint = require("./lint");

function processor(analyzer, resource, content) {
    var type = resource.mimeType();

    // `checked`-mumbo jumbo is temporary workarounds for faulty
    // buster-resources behavior - due to it sometimes processing resources up
    // to 4 times
    if (!content) { return; }
    analyzer.checked = analyzer.checked || {};
    if (!/javascript/.test(type) || analyzer.checked[resource.path]) { return; }
    analyzer.checked[resource.path] = true;

    var path = "." + resource.path;
    var result = this.checker.check(content, path);
    if (!result.ok) {
        analyzer.error("Lint in " + path, result);
    }
}

module.exports = {
    name: "buster-lint",

    create: function (options) {
        var instance = Object.create(this);
        instance.checked = {};
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
