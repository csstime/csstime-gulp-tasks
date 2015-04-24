'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var otherPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.otherDir, '**')
					);

			return gulp.src(otherPattern)
				.pipe(gulp.dest(
					plugins.lib.pathHelper.getAssetsDestinationDirectory(config)
				));
		}
	};
};