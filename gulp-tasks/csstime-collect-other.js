'use strict';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		config = require('../config.json');

	return gulp.src(path.join(
			config.publicRootDir,
			config.componentsDir,
			'*',
			config.otherDir,
			'**'
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir,
			config.componentsDir
		)));
};