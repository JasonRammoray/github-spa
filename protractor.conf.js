exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: ['tests/e2e/**/*.spec.js'],

    capabilities: {
        browserName: 'chrome'
    },

    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');

        jasmine.getEnv().addReporter(new SpecReporter());
   }
};