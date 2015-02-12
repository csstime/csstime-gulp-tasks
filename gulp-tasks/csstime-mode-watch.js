'use strict';

var gulp = require('gulp'),
	path = require('path'),
	gutil = require('gulp-util'),
	config = require('../config.json');

module.exports = function () {
	gulp.watch(
		path.join(config.publicRootDir, config.componentsDir),
		'csstime-process-assets'
	);

	gulp.watch(
		config.staticRootDir,
		'csstime-process-static'
	);

	gutil.log(gutil.colors.magenta('csstime:', 'watch mode'));
};