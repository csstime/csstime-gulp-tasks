'use strict';

var gulp = require('gulp'),
	path = require('path'),
	csscomb = require('gulp-csscomb'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(
		[
			path.join(
				config.componentsRootDir, '**',
				config.lessDir, '*.less'
			),
			path.join(
				config.componentsRootDir, '**',
				config.cssDir, '*.css'
			)
		])
		.pipe(csscomb(config.csscombConfiguration))
		.pipe(gulp.dest(config.componentsRootDir));
};