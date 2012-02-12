var buster = require("buster");
var ext = require("../lib/buster-lint");
var resourceSet = require("buster-resources").resourceSet;
var analyzer = require("buster-analyzer");

buster.testCase("Lint extension", {
    setUp: function () {
        this.resourceSet = resourceSet.create();
        this.analyzer = analyzer.create();
        this.listeners = { error: this.spy() };
        this.analyzer.on("error", this.listeners.error);
    },

    "adds processor to resource set": function () {
        var lint = ext.create();
        this.spy(this.resourceSet, "addProcessor");
        lint.beforeRun(this.resourceSet, this.analyzer);

        assert.calledOnce(this.resourceSet.addProcessor);
    },

    "flags error on lint error": function (done) {
        var lint = ext.create();
        lint.beforeRun(this.resourceSet, this.analyzer);

        this.resourceSet.addResource({
            path: "/buster.js",
            content: "var a = 123"
        }).then(function (resource) {
            resource.content().then(done(function (content) {
                assert.calledOnceWith(this.listeners.error,
                                      "Lint in /buster.js");
            }.bind(this)));
        }.bind(this));
    }
});
