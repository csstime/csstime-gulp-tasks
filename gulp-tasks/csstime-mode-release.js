'use strict';

var logger = require('../lib/logger');

module.exports = function () {
	logger.write('release mode', 'green');
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets',
	'csstime-minify-css',
	'csstime-minify-js',
	'csstime-remove-tmp'
];