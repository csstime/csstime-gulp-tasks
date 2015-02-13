'use strict';

var logger = require('../lib/logger');

module.exports = function () {
	logger.write('debug mode', 'yellow');
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets'
];