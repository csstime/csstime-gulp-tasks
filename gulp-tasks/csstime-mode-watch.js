'use strict';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		logger = require('../lib/logger'),
		config = require('../config.json');

	gulp.watch(
		path.join(config.publicRootDir, config.componentsDir, '**', '*'),
		['csstime-process-assets'],
		function () {
			logger.notify('Assets were rebuilt');
		}
	);

	gulp.watch(
		path.join(config.staticRootDir, '**', '*'),
		['csstime-process-static'],
		function () {
			logger.notify('Static files were rebuilt');
		}
	);

	logger.write('watch mode', 'blue');
	logger.notify('Watch mode is on');
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets'
];