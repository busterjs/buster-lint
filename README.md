# buster-lint

![Build status](https://secure.travis-ci.org/busterjs/buster-lint.png?branch=master)

An extension for [buster.js](http://busterjs.org) to make linting your
JavaScript part of the test run.

## Installation

Get it from npm:

    npm install buster-lint

Then add it to your `buster.js` config file:

    config["My tests"] = {
      extensions: [ require("buster-lint") ]
    };

## Configuration

You'll probably want to change some options. All examples here show the default
values, so while they are rather meaningless as actual configuration, they are
illustrative.

### Choice of linter

buster-lint comes bundled with [jslint](http://jslint.org) and
[jshint](www.jshint.com).

    config["My tests"] = {
      extensions: [ require("buster-lint") ],
      "buster-lint": {
        linter: "jslint"
      }
    };

### Excluding files

To avoid linting dependencies or other nasty legacy bits, you can match
the filename either by string or regexp.

    config["My tests"] = {
      extensions: [ require("buster-lint") ],
      "buster-lint": {
        excludes: [ "jquery", "raphael" ] // default is [ ]
      }
    };

### Changing the rules

The defaults are very strict, so tweak them to your liking.

For jslint:

    config["My tests"] = {
      extensions: [ require("buster-lint") ],
      "buster-lint": {
        linterOptions: {
          indent      : 4,     // the indentation factor
          maxlen      : 80,    // the maximum length of a source line
          maxerr      : 50,    // the maximum number of errors to report per file
          anon        : false, // true, if the space may be omitted in anonymous function declarations
          bitwise     : false, // true, if bitwise operators should be allowed
          browser     : false, // true, if the standard browser globals should be predefined
          cap         : false, // true, if upper case HTML should be allowed
          "continue"  : false, // true, if the continuation statement should be tolerated
          css         : false, // true, if CSS workarounds should be tolerated
          debug       : false, // true, if debugger statements should be allowed
          devel       : false, // true, if logging should be allowed (console, alert, etc.)
          eqeq        : false, // true, if == should be allowed
          es5         : false, // true, if ES5 syntax should be allowed
          evil        : false, // true, if eval should be allowed
          forin       : false, // true, if for in statements need not filter
          fragment    : false, // true, if HTML fragments should be allowed
          newcap      : false, // true, if constructor names capitalization is ignored
          node        : false, // true, if Node.js globals should be predefined
          nomen       : false, // true, if names may have dangling _
          on          : false, // true, if HTML event handlers should be allowed
          passfail    : false, // true, if the scan should stop on first error
          plusplus    : false, // true, if increment/decrement should be allowed
          properties  : false, // true, if all property names must be declared with /*properties*/
          regexp      : false, // true, if the . should be allowed in regexp literals
          rhino       : false, // true, if the Rhino environment globals should be predefined
          undef       : false, // true, if variables can be declared out of order
          unparam     : false, // true, if unused parameters should be tolerated
          sloppy      : false, // true, if the 'use strict'; pragma is optional
          sub         : false, // true, if all forms of subscript notation are tolerated
          vars        : false, // true, if multiple var statements per function should be allowed
          white       : false, // true, if sloppy whitespace is tolerated
          widget      : false, // true  if the Yahoo Widgets globals should be predefined
          windows     : false  // true, if MS Windows-specific globals should be predefined
        }
      }
    };

For jshint:

    config["My tests"] = {
      extensions: [ require("buster-lint") ],
      "buster-lint": {
        linterOptions: {
          asi         : true,  // true, if automatic semicolon insertion should be tolerated
          bitwise     : true,  // true, if bitwise operators should not be allowed
          boss        : true,  // true, if advanced usage of assignments should be allowed
          browser     : true,  // true, if the standard browser globals should be predefined
          couch       : true,  // true, if CouchDB globals should be predefined
          curly       : true,  // true, if curly braces around all blocks should be required
          debug       : true,  // true, if debugger statements should be allowed
          devel       : true,  // true, if logging globals should be predefined (console, alert, etc.)
          dojo        : true,  // true, if Dojo Toolkit globals should be predefined
          eqeqeq      : true,  // true, if === should be required
          eqnull      : true,  // true, if == null comparisons should be tolerated
          es5         : true,  // true, if ES5 syntax should be allowed
          esnext      : true,  // true, if es.next specific syntax should be allowed
          evil        : true,  // true, if eval should be allowed
          expr        : true,  // true, if ExpressionStatement should be allowed as Programs
          forin       : true,  // true, if for in statements must filter
          funcscope   : true,  // true, if only function scope should be used for scope tests
          globalstrict: true,  // true, if global "use strict"; should be allowed (also enables 'strict')
          immed       : true,  // true, if immediate invocations must be wrapped in parens
          iterator    : true,  // true, if the `__iterator__` property should be allowed
          jquery      : true,  // true, if jQuery globals should be predefined
          lastsemic   : true,  // true, if semicolons may be ommitted for the trailing statements inside of a one-line blocks.
          latedef     : true,  // true, if the use before definition should not be tolerated
          laxbreak    : true,  // true, if line breaks should not be checked
          laxcomma    : true,  // true, if line breaks should not be checked around commas
          loopfunc    : true,  // true, if functions should be allowed to be defined within loops
          mootools    : true,  // true, if MooTools globals should be predefined
          multistr    : true,  // true, allow multiline strings
          newcap      : true,  // true, if constructor names must be capitalized
          noarg       : true,  // true, if arguments.caller and arguments.callee should be disallowed
          node        : true,  // true, if the Node.js environment globals should be predefined
          noempty     : true,  // true, if empty blocks should be disallowed
          nonew       : true,  // true, if using `new` for side-effects should be disallowed
          nonstandard : true,  // true, if non-standard (but widely adopted) globals should be predefined
          nomen       : true,  // true, if names should be checked
          onevar      : true,  // true, if only one var statement per function should be allowed
          onecase     : true,  // true, if one case switch statements should be allowed
          passfail    : true,  // true, if the scan should stop on first error
          plusplus    : true,  // true, if increment/decrement should not be allowed
          proto       : true,  // true, if the `__proto__` property should be allowed
          prototypejs : true,  // true, if Prototype and Scriptaculous globals should be predefined
          regexdash   : true,  // true, if unescaped first/last dash (-) inside brackets should be tolerated
          regexp      : true,  // true, if the . should not be allowed in regexp literals
          rhino       : true,  // true, if the Rhino environment globals should be predefined
          undef       : true,  // true, if variables should be declared before used
          scripturl   : true,  // true, if script-targeted URLs should be tolerated
          shadow      : true,  // true, if variable shadowing should be tolerated
          smarttabs   : true,  // true, if smarttabs should be tolerated (http://www.emacswiki.org/emacs/SmartTabs)
          strict      : true,  // true, if the "use strict"; pragma is required
          sub         : true,  // true, if all forms of subscript notation are tolerated
          supernew    : true,  // true, if `new function () { ... };` and `new Object;` should be tolerated
          trailing    : true,  // true, if trailing whitespace rules apply
          validthis   : true,  // true, if 'this' inside a non-constructor function is valid.
          white       : true,  // true, if strict whitespace rules apply
          wsh         : true   // true, if the Windows Scripting Host environment globals should be predefined
        }
      }
    };

## Configure with autolint

Since buster-lint uses [autolint](https://github.com/magnars/autolint) under the
hood, the configuration couldn't be simpler:

    config["My tests"] = {
      extensions: [ require("buster-lint") ],
      "buster-lint": require("./autolint.js")
    };

## License

Copyright 2012, Magnar Sveen.

Released under the
[BSD license](http://www.opensource.org/licenses/bsd-license.php).
