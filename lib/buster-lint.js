var lint = require("./lint");

module.exports = {
    create: function (options) {
        var instance = Object.create(this);
        instance.checker = lint.create(options || {});
        return instance;
    },

    beforeRun: function (resourceSet, analyzer) {
        resourceSet.addProcessor(function (resource, content) {
            var result = this.checker.check(content, resource.path);
            if (!result.ok) {
                var path = resource.path;
                analyzer.error("Lint in " + path, result);
            }
        }.bind(this));
    }
};
