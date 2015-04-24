'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'_csstime-set-release',
			'csstime-process-all'
		],
		task: function () {
			return gulp.src(
					path.join(
						plugins.lib.pathHelper
							.getTemporaryDestinationDirectory(config),
						'**',
						'*.*'
					)
				)
				.pipe(gulp.dest(
					plugins.lib.pathHelper.getDestinationDirectory(config)
				));
		}
	};
};