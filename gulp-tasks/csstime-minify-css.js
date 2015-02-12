'use strict';

var gulp = require('gulp'),
	path = require('path'),
	csso = require('gulp-csso'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(
			config.publicRootDir,
			config.componentsDir,
			config.stylesFileName + '.css'
		))
		.pipe(csso(!config.useCssStructureMinimization))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.componentsDir
		)));
};

module.exports.dependencies = ['csstime-handle-css'];