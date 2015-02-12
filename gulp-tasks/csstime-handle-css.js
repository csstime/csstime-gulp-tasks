'use strict';

var gulp = require('gulp'),
	path = require('path'),
	config = require('../config.json'),
	gulpif = require('gulp-if'),
	pleeease = require('gulp-pleeease'),
	pleeeaseConfig = require(config.configsPath + '.pleeeaserc.json');

module.exports = function () {
	return gulp.src(path.join(
			config.publicRootDir,
			config.destinationDir,
			config.stylesFileName + '.css'
		))
		.pipe(gulpif(config.useCssPleeease, pleeease(pleeeaseConfig)))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir
		)));
};

module.exports.dependencies = ['csstime-compile-less'];