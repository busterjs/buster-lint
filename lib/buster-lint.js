var lint = require("./lint");

function processor(analyzer, resource, content) {
    var type = resource.mimeType();
    // `checked`-mumbo jumbo is temporary workarounds for faulty
    // ramp-resources behavior - due to it sometimes processing resources up
    // to 4 times
    this.checked = this.checked || {};
    var checked = this.checked[resource.path];
    if (!content || !/javascript/.test(type) || checked) { return; }
    this.checked[resource.path] = true;
    var path = "." + resource.path;
    var result = this.checker.check(content, path);
    if (!result.ok) {
        resource.cacheable = false;
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

    configure: function (config) {
        ["libs", "sources", "testHelpers", "tests"].forEach(function (group) {
            config.on("load:" + group, function (resourceSet) {
                resourceSet.addProcessor(processor.bind(this, this.analyzer));
            }.bind(this));
        }.bind(this));
    },

    analyze: function (analyzer) {
        this.analyzer = analyzer;
    }
};
