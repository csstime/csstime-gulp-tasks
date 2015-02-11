var gulp = require('gulp'),
	path = require('path'),
	less = require('gulp-less'),
	gulpif = require('gulp-if'),
	config = require('../config.json'),
	pleeease = require('gulp-pleeease'),
	pleeeaseConfig = require('../.pleeeaserc.json');

module.exports = function () {
	return gulp.src(path.join(
			config.destinationDir,
			config.temporaryDir,
			config.stylesFileName + '.less'
		))
		.pipe(less())
		.pipe(gulpif(config.useCssPleeease, pleeease(pleeeaseConfig)))
		.pipe(gulp.dest(config.destinationDir));
};

module.exports.dependencies = ['csstime-concat-less'];