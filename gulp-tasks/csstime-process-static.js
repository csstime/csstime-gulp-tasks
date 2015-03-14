'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-copy-static'],
		task: function () {
			var logger = require('../lib/logger');
			logger.write('static were rebuilt');
		}
	};
};