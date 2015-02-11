'use strict';

var gulp = require('gulp'),
	path = require('path'),
	csso = require('gulp-csso'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(
			config.destinationDir,
			config.stylesFileName + '.css'
		))
		.pipe(csso(!config.useCssStructureMinimization))
		.pipe(gulp.dest(config.destinationDir));
};

module.exports.dependencies = ['csstime-handle-css'];