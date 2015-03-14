'use strict';

var path = require('path'),
	logger = require('../lib/logger');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-process-static',
			'csstime-process-assets'
		],
		task: function () {
			gulp.watch(
				path.join(config.publicRootDir, config.componentsDir, '**', '*'),
				['csstime-process-assets']
			);

			gulp.watch(
				path.join(config.staticRootDir, '**', '*'),
				['csstime-process-static']
			);

			logger.write('watch mode', 'blue');
			if (config.useNotify) {
				logger.notify('Watch mode is on');
			}
		}
	};
};