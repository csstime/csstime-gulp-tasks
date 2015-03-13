'use strict';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		time = require('../lib/time'),
		header = require('gulp-header'),
		csso = require('gulp-csso'),
		gulpif = require('gulp-if'),
		config = require('../config.json');

	return gulp.src(path.join(
			config.publicRootDir,
			config.destinationDir,
			config.stylesFileName + '.css'
		))
		.pipe(csso(!config.useCssStructureMinimization))
		.pipe(gulpif(
			config.banner && (typeof config.banner === 'string'),
			header(config.banner.replace('<%now%>', time.captureNow()))
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir
		)));
};

module.exports.dependencies = ['csstime-handle-css'];