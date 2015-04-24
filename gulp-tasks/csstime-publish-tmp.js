'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'_csstime-set-release',
			'csstime-process-static',
			'csstime-process-assets',
			'csstime-minify-css',
			'csstime-minify-js'
		],
		task: function () {
			return gulp.src(
					plugins.lib.pathHelper
						.getTemporaryDestinationDirectory(config)
				)
				.pipe(gulp.dest(
					plugins.lib.pathHelper.getDestinationDirectory(config)
				));
		}
	};
};