'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	config.isWatchMode = true;
	return {
		dependencies: [
			'csstime-process-static',
			'csstime-process-assets'
		],
		task: function () {
			gulp.watch(
				path.join(config.publicRootDir, config.componentsDir, '**', '*'),
				{
					interval: config.watchInterval
				},
				['csstime-process-assets']
			);

			gulp.watch(
				path.join(config.staticRootDir, '**', '*'),
				{
					interval: config.watchInterval
				},
				['csstime-process-static']
			);

			var logger = require('../lib/logger')(plugins, config);
			logger.write('watch mode', 'blue');
			logger.notify('Watch mode is on');
		}
	};
};