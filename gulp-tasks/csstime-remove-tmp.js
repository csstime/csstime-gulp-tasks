'use strict';

var gulp = require('gulp'),
	path = require('path'),
	rimraf = require('gulp-rimraf'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(
			config.publicRootDir,
			config.temporaryDir
		))
		.pipe(rimraf({read: false}));
};