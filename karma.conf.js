// Karma configuration
// Generated on Sat Nov 26 2016 23:19:43 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // Angular

      './node_modules/angular/angular.min.js',

      // Angular mocks
      
      './node_modules/angular-mocks/angular-mocks.js',

      // Angular ui router

      './node_modules/angular-ui-router/release/angular-ui-router.min.js',

      // GitHub module

      './app/modules/github/github.js',

      './app/modules/github/providers/credentials.js',

      './app/modules/github/providers/github.js',

      // GitHub user module

      './app/modules/github.user/github.user.js',

      './app/modules/github.user/controllers/github-user-controller.js',

      './app/modules/github.user/directives/github-user.js',

      // GitHub repos

      './app/modules/github.repos/github.repos.js',

      './app/modules/github.repos/controllers/github-user-repo-controller.js',

      './app/modules/github.repos/controllers/github-user-repos-controller.js',

      './app/modules/github.repos/directives/github-user-repo.js',

      './app/modules/github.repos/directives/github-user-repos.js',

      // Tests

      './tests/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/modules/**/*.js': ['coverage'],

      'app/modules/**/**.js': ['coverage']
    },

    coverageReporter: {
      type: 'html',

      dir: 'tests/reports'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};