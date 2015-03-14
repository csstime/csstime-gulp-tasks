'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-handle-css',
			'csstime-collect-images',
			'csstime-collect-fonts',
			'csstime-collect-svg',
			'csstime-collect-other'
		],
		task: function () {
			var logger = require('../lib/logger')(plugins, config);
			logger.write('assets were rebuilt');
			if (config.isWatchMode) {
				logger.notify('Assets were rebuilt');
			}
		}
	};
};