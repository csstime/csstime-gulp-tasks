'use strict';

var gulp = require('gulp'),
	path = require('path'),
	csscombLint = require('gulp-csscomb-lint'),
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
		.pipe(csscombLint(config.csscombConfiguration))
		.pipe(gulp.dest(config.componentsRootDir));
};