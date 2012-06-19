var lint = require("./lint");

function processor(analyzer, resource, content) {
    var type = resource.mimeType();
    // `checked`-mumbo jumbo is temporary workarounds for faulty
    // buster-resources behavior - due to it sometimes processing resources up
    // to 4 times
    analyzer.checked = analyzer.checked || {};
    var checked = analyzer.checked[resource.path];
    if (!content || !/javascript/.test(type) || checked) { return; }
    analyzer.checked[resource.path] = true;
    var path = "." + resource.path;
    var result = this.checker.check(content, path);
    if (!result.ok) { analyzer.error("Lint in " + path, result); }
}

module.exports = {
    name: "buster-lint",

    create: function (options) {
        var instance = Object.create(this);
        instance.checked = {};
        instance.checker = lint.create(options || {});
        return instance;
    },

    configure: function (config) {
        this.config = config;
        ["libs", "sources", "testHelpers", "tests"].forEach(function (group) {
            this.config.on("load:" + group, function (resourceSet) {
                resourceSet.addProcessor(processor.bind(this, this.analyzer));
            }.bind(this));
        }.bind(this));
    },

    analyze: function (analyzer) {
        this.analyzer = analyzer;
    }
};
