'use strict';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		less = require('gulp-less'),
		concat = require('gulp-concat'),
		config = require('../config.json');

	var sources = [];

	// add sprites
	if (config.useImageSprites) {
		sources.push(path.join(
			config.publicRootDir,
			config.temporaryDir,
			config.spritesFileName + '.less'
		));
	}

	// add main less file
	sources.push(path.join(
		config.publicRootDir,
		config.temporaryDir,
		config.stylesFileName + '.less'
	));

	return gulp.src(sources)
		.pipe(concat(config.stylesFileName + '.less'))
		.pipe(less())
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir
		)));
};

module.exports.dependencies = ['csstime-concat-less'];