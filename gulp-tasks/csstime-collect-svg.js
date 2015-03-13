'use strict';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		config = require('../config.json'),
		svgmin = require('gulp-svgmin'),
		svgminConfig = require(config.configsPath + '.svgmin.json'),
		svg2png = require('gulp-svg2png'),
		imagemin = require('gulp-imagemin'),
		imageminConfig = require(config.configsPath + '.imagemin.json'),
		gulpif = require('gulp-if');

	var destination = path.join(
		config.publicRootDir,
		config.destinationDir,
		config.componentsDir
	);
	return gulp.src(path.join(
			config.publicRootDir,
			config.componentsDir,
			'*',
			config.svgDir,
			'**',
			'*.svg'
		))
		.pipe(gulpif(
			config.useSvgOptimization,
			svgmin(svgminConfig)
		))
		.pipe(gulp.dest(destination))
		.pipe(gulpif(
			config.useSvgRasterization,
			svg2png()
		))
		.pipe(gulpif(
			config.useSvgRasterization && config.useImageOptimization,
			imagemin(imageminConfig)
		))
		.pipe(gulpif(
			config.useSvgRasterization,
			gulp.dest(destination)
		));
};