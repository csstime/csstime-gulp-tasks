'use strict';

var gulp = require('gulp'),
	path = require('path'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(
			config.publicRootDir,
			config.componentsDir,
			'*',
			config.fontsDir,
			'**'
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir,
			config.componentsDir
		)));
};