'use strict';

var gulp = require('gulp'),
	path = require('path'),
	less = require('gulp-less'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(
			config.publicRootDir,
			config.temporaryDir,
			config.stylesFileName + '.less'
		))
		.pipe(less())
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.componentsDir
		)));
};

module.exports.dependencies = ['csstime-concat-less'];