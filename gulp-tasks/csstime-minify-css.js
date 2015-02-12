'use strict';

var gulp = require('gulp'),
	path = require('path'),
	csstime = require('../index'),
	header = require('gulp-header'),
	csso = require('gulp-csso'),
	gulpif = require('gulp-if'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(
			config.publicRootDir,
			config.destinationDir,
			config.stylesFileName + '.css'
		))
		.pipe(csso(!config.useCssStructureMinimization))
		.pipe(gulpif(
			config.stylesBanner,
			header(config.stylesBanner + '\n' + csstime.captureNow())
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir
		)));
};

module.exports.dependencies = ['csstime-handle-css'];