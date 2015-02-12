'use strict';

var gulp = require('gulp'),
	path = require('path'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(config.staticDir, '**'))
		.pipe(gulp.dest(config.publicRootDir));
};