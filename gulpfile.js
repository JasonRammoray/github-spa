const gulp = require('gulp');

require('./tasks/unit')(gulp);

gulp.task('default', ['unit']);