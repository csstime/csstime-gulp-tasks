'use strict';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		config = require('../config.json'),
		gulpif = require('gulp-if'),
		imagemin = require('gulp-imagemin'),
		imageminConfig = require(config.configsPath + '.imagemin.json');

	return gulp.src(path.join(
			config.publicRootDir,
			config.componentsDir,
			'*',
			config.imagesDir,
			'**'
		))
		.pipe(gulpif(
			config.useImageOptimization,
			imagemin(imageminConfig)
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir,
			config.componentsDir
		)));
};