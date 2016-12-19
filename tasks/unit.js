module.exports = function(gulp) {
	const KarmaServer = require('karma').Server;

	const path = require('path');

	gulp.task('unit', function(done) {
		new KarmaServer({
			configFile: path.join(__dirname, '..', 'karma.conf.js'),

			singleRun: true,

			autoWatch: false
		}, function() {
			done();
		})

		.start();
	});
};