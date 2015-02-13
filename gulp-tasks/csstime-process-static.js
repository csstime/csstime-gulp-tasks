'use strict';

var logger = require('../lib/logger');

module.exports = function () {
	logger.write('static were rebuilt');
};

module.exports.dependencies = [
	'csstime-copy-static'
];