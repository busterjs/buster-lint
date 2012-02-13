var buster = require("buster");
var ext = require("../lib/buster-lint");
var config = require("buster-configuration");
var analyzer = require("buster-analyzer");

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

        group.resolve().then(function (resourceSet) {
            resourceSet.serialize().then(done(function () {
                assert.calledOnceWith(this.listeners.error,
                                      "Lint in ./buster.js");
            }.bind(this)), function (err) {
                buster.log(err.message, err.stack);
            });
        }.bind(this));
    }
});
