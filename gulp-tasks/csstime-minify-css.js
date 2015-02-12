'use strict';

var gulp = require('gulp'),
	path = require('path'),
	time = require('../lib/time'),
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
			config.stylesBanner && (typeof config.stylesBanner === 'string'),
			header(config.stylesBanner.replace('<%now%>', time.captureNow()))
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir
		)));
};

module.exports.dependencies = ['csstime-handle-css'];