'use strict';

module.exports = function () {
	var logger = require('../lib/logger');
	logger.write('debug mode', 'yellow');
	logger.write('Assets were built in Debug mode', 'yellow');
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets'
];