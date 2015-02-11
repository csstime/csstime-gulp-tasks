'use strict';

var gulp = require('gulp'),
	path = require('path'),
	gulpif = require('gulp-if'),
	config = require('../config.json'),
	pleeease = require('gulp-pleeease'),
	pleeeaseConfig = require('../.pleeeaserc.json');

module.exports = function () {
	return gulp.src(path.join(
			config.destinationDir,
			config.stylesFileName + '.css'
		))
		.pipe(gulpif(config.useCssPleeease, pleeease(pleeeaseConfig)))
		.pipe(gulp.dest(config.destinationDir));
};

module.exports.dependencies = ['csstime-compile-less'];