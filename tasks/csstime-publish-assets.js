var config = require('../config.json'),
	path = require('path'),
	gulp = require('gulp');

module.exports = function () {
	return gulp.src(path.join(config.commonAssetsDir, '**'))
		.pipe(gulp.dest(config.destinationDir));
};