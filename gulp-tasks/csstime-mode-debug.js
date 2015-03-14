'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-process-static',
			'csstime-process-assets'
		],
		task: function () {
			var logger = require('../lib/logger');
			logger.write('debug mode', 'yellow');
			logger.write('Assets were built in Debug mode', 'yellow');
		}
	};
};