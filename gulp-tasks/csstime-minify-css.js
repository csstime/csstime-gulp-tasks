'use strict';

var gulp = require('gulp'),
	path = require('path'),
	csso = require('gulp-csso'),
	config = require('../config.json');

module.exports = function () {
	var maxCompression = !config.useCssStructureMinimization;
	return gulp.src(path.join(
			config.destinationDir,
			config.stylesFileName + '.css'
		))
		.pipe(csso(maxCompression))
		.pipe(gulp.dest(config.destinationDir));
};

module.exports.dependencies = ['csstime-compile-less'];