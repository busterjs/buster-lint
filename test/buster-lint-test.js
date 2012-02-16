var buster = require("buster");
var ext = require("../lib/buster-lint");
var config = require("buster-configuration");
var analyzer = require("buster-analyzer");

function process(group, then, errBack) {
    group.resolve().then(function (resourceSet) {
        resourceSet.serialize().then(then, errBack);
    }, errBack);
}

buster.testCase("Lint extension", {
    setUp: function () {
        this.config = config.create();
        this.analyzer = analyzer.create();
        this.listeners = { error: this.spy() };
        this.analyzer.on("error", this.listeners.error);
    },

    "flags error on lint error": function (done) {
        var group = this.config.addGroup("Some tests", {
            resources: [{ path: "/buster.js", content: "var a = 123" }],
            sources: ["/buster.js"]
        });

        ext.create().beforeRun(group, this.analyzer);

        process(group, done(function () {
            assert.calledOnceWith(this.listeners.error,
                                  "Lint in ./buster.js");
        }.bind(this)), buster.log);
    },

    "does not lint non-javascript resources": function (done) {
        var group = this.config.addGroup("Some tests", {
            resources: [{ path: "/buster", content: "var a = 123" }],
            libs: ["/buster"]
        });

        group.bundleFramework();
        ext.create().beforeRun(group, this.analyzer);

        process(group, done(function () {
            refute.called(this.listeners.error);
        }.bind(this)), buster.log);

    }
});
