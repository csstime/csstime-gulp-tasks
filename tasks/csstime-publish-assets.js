var config = require('../config.json'),
	gulp = require('gulp');

module.exports = function () {
	return gulp.src(config.commonAssetsDir)
		.pipe(gulp.dest(config.destinationDir));
};