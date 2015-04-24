'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'_csstime-set-debug',
			'csstime-process-static',
			'csstime-process-assets'
		],
		task: function () {
			var logger = require('../lib/logger')(plugins, config);
			logger.write('debug mode', 'yellow');
			logger.write('Assets were built in Debug mode', 'yellow');
		}
	};
};