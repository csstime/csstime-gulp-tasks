'use strict';

var gulp = require('gulp'),
	path = require('path'),
	config = require('../config.json'),
	gulpif = require('gulp-if'),
	concat = require('gulp-concat'),
	csstime = require('../index'),
	header = require('gulp-header'),
	pleeease = require('gulp-pleeease'),
	pleeeaseConfig = require(config.configsPath + '.pleeeaserc.json');

module.exports = function () {
	return gulp.src(
		[
			path.join(
				config.publicRootDir,
				config.destinationDir,
				config.stylesFileName + '.css'
			),
			path.join(
				config.publicRootDir,
				config.componentsDir,
				'*',
				config.cssDir,
				config.stylesFileName + '.css'
			)
		])
		.pipe(concat(config.stylesFileName + '.css'))
		.pipe(gulpif(config.useCssPleeease, pleeease(pleeeaseConfig)))
		.pipe(gulpif(
			config.stylesBanner,
			header(config.stylesBanner + '\n' + csstime.captureNow())
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir
		)));
};

module.exports.dependencies = ['csstime-compile-less'];