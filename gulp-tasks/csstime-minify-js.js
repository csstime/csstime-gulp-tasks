'use strict';

var gulp = require('gulp'),
	path = require('path'),
	time = require('../lib/time'),
	header = require('gulp-header'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(
			config.publicRootDir,
			config.destinationDir,
			'*.js'
		))
		.pipe(uglify())
		.pipe(gulpif(
			config.banner && (typeof config.banner === 'string'),
			header(config.banner.replace('<%now%>', time.captureNow()))
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir
		)));
};

module.exports.dependencies = ['csstime-copy-static'];