var gulp = require('gulp'),
	path = require('path'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(config.commonAssetsDir, '**'))
		.pipe(gulp.dest(config.destinationDir));
};