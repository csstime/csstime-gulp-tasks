'use strict';

var gulp = require('gulp'),
	path = require('path'),
	config = require('../config.json');

module.exports = function () {
	gulp.watch(
		path.join(config.publicRootDir, config.componentsDir),
		'csstime-process-assets'
	);

	gulp.watch(
		config.staticRootDir,
		'csstime-process-static'
	);
};