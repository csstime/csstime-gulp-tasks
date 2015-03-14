'use strict';

var path = require('path');

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

			var logger = require('../lib/logger')(plugins, config);
			logger.write('watch mode', 'blue');
			logger.notify('Watch mode is on');
		}
	};
};