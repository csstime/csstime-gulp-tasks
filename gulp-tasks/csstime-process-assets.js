'use strict';

var logger = require('../lib/logger');

module.exports = function () {
	logger.write('assets were rebuilt');
};

module.exports.dependencies = [
	'csstime-handle-css',
	'csstime-collect-images',
	'csstime-collect-fonts',
	'csstime-collect-svg',
	'csstime-collect-other'
];