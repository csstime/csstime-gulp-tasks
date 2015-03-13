'use strict';

module.exports = function () {
	var logger = require('../lib/logger');
	logger.write('static were rebuilt');
};

module.exports.dependencies = [
	'csstime-copy-static'
];