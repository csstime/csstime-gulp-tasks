'use strict';

var gulp = require('gulp'),
	path = require('path'),
	less = require('gulp-less'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(
			config.destinationDir,
			config.temporaryDir,
			config.stylesFileName + '.less'
		))
		.pipe(less())
		.pipe(gulp.dest(config.destinationDir));
};

module.exports.dependencies = ['csstime-concat-less'];