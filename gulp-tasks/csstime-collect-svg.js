'use strict';

var gulp = require('gulp'),
	path = require('path'),
	config = require('../config.json'),
	svgmin = require('gulp-svgmin'),
	svgminConfig = require(config + '.svgmin.json'),
	raster = require('gulp-raster'),
	imagemin = require('gulp-imagemin'),
	imageminConfig = require(config + '.imagemin.json'),
	rename = require('gulp-rename'),
	gulpif = require('gulp-if');

module.exports = function () {
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
			'**'
		))
		.pipe(gulpif(
			config.useSvgOptimization,
			svgmin(svgminConfig)
		))
		.pipe(gulp.dest(destination))
		.pipe(gulpif(
			config.useSvgRasterization,
			raster()
		))
		.pipe(gulpif(
			config.useSvgRasterization,
			rename({extname: '.png'})
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