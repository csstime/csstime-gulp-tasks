'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'_csstime-set-release',
			'csstime-process-all'
		],
		task: function (cb) {
			if (!config.shouldClearDestinationDuringRelease) {
				publish();
				return;
			}

			plugins.del([
				plugins.lib.pathHelper.getAssetsDestinationDirectory(config),
				path.join(
					plugins.lib.pathHelper.getDestinationDirectory(config),
					'*.*'
				)
			], publish);

			function publish () {
				gulp.src(
						path.join(
							plugins.lib.pathHelper
								.getTemporaryDestinationDirectory(config),
							'**',
							'*.*'
						)
					)
					.pipe(gulp.dest(
						plugins.lib.pathHelper.getDestinationDirectory(config)
					))
					.on('end', function () {
						cb();
					});
			}
		}
	};
};