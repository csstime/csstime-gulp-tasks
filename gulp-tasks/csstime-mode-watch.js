'use strict';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		logger = require('../lib/logger'),
		config = require('../config.json');

	gulp.watch(
		path.join(config.publicRootDir, config.componentsDir, '**', '*'),
		['csstime-process-assets']
	).on('change', function () {
		logger.notify('Rebuilding changed assets...');
	});

	gulp.watch(
		path.join(config.staticRootDir, '**', '*'),
		['csstime-process-static']
	).on('change', function () {
		logger.notify('Rebuilding changed static files...');
	});

	logger.write('watch mode', 'blue');
	logger.notify('Watch mode is on');
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets'
];