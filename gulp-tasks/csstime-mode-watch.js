'use strict';

var gulp = require('gulp'),
	path = require('path'),
	logger = require('../lib/logger'),
	config = require('../config.json');

module.exports = function () {
	gulp.watch(
		path.join(config.publicRootDir, config.componentsDir, '**', '*'),
		['csstime-process-assets']
	);

	gulp.watch(
		path.join(config.staticRootDir, '**', '*'),
		['csstime-process-static']
	);

	logger.write('watch mode', 'blue');
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets'
];