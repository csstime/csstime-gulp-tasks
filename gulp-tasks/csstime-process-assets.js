'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-handle-css',
			'csstime-collect-images',
			'csstime-collect-fonts',
			'csstime-collect-svg',
			'csstime-combine-svg',
			'csstime-collect-other'
		],
		task: function (cb) {
			if (!config.themedStylesFileNames.length) {
				done(null, cb);
				return;
			}

			plugins.runSequence('csstime-handle-themed-css', function (error) {
				done(error, cb);
			});
		}
	};

	function done (error, cb) {
		if (error) {
			cb(error);
			return;
		}

		var logger = require('../lib/logger')(plugins, config);
		logger.write('assets were rebuilt');
		if (!config.isRelease) {
			logger.notify('Assets were rebuilt');
		}
		cb();
	}
};
