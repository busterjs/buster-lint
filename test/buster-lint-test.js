var buster = require("buster");
var ext = require("../lib/buster-lint");
var bc = require("buster-configuration");
var ba = require("buster-analyzer");

function process(group, then, errBack) {
    group.resolve().then(function (resourceSet) {
        resourceSet.serialize().then(then, errBack);
    }, errBack);
}

buster.testCase("Lint extension", {
    setUp: function () {
        this.config = bc.createConfiguration();
        this.analyzer = ba.createAnalyzer();
        this.listeners = { error: this.spy() };
        this.analyzer.on("error", this.listeners.error);
    },

    "flags error on lint error": function (done) {
        var group = this.config.addGroup("Some tests", {
            resources: [{ path: "/buster.js", content: "var a = 123" }],
            sources: ["/buster.js"]
        });

        var extension = ext.create();
        extension.configure(group);
        extension.analyze(this.analyzer);

        process(group, done(function () {
            assert.calledOnce(this.listeners.error);
            assert.calledWith(this.listeners.error, "Lint in ./buster.js");
        }.bind(this)), buster.log);
    },

    "flags failed resources as uncacheable": function (done) {
        var group = this.config.addGroup("Some tests", {
            resources: [{ path: "/buster.js", content: "var a = 123" }],
            sources: ["/buster.js"]
        });

        var extension = ext.create();
        extension.configure(group);
        extension.analyze(this.analyzer);

        process(group, done(function (serialized) {
            assert.isFalse(serialized.resources[0].cacheable);
        }.bind(this)), buster.log);
    },

    "does not lint non-javascript resources": function (done) {
        var group = this.config.addGroup("Some tests", {
            resources: [{ path: "/buster", content: "var a = 123" }],
            libs: ["/buster"]
        });

        var extension = ext.create();
        extension.configure(group);
        extension.analyze(this.analyzer);

        process(group, done(function () {
            refute.called(this.listeners.error);
        }.bind(this)), buster.log);
    }
});
