var gulp = require('gulp'),
	path = require('path'),
	pleeease = require('gulp-pleeease'),
	pleeeaseConfig = require('./.pleeeaserc.json'),
	config = require('../config.json');

module.exports = function () {
	return gulp.src(path.join(
			config.destinationDir,
			config.stylesFileName + '.css'
		))
		.pipe(pleeease(pleeeaseConfig))
		.pipe(gulp.dest(config.destinationDir));
};

module.exports.dependencies = ['csstime-compile-less'];