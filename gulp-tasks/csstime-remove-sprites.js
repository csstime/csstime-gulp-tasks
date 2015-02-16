'use strict';

var gulp = require('gulp'),
	path = require('path'),
	rimraf = require('gulp-rimraf'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(
		[
			path.join(
				config.publicRootDir,
				config.destinationDir,
				config.componentsDir,
				config.spritesFileName + '.png'
			),
			path.join(
				config.publicRootDir,
				config.temporaryDir,
				config.spritesFileName + '.less'
			)
		])
		.pipe(rimraf({read: false}));
};