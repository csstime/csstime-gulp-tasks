'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var otherPattern = plugins.lib.components
					.getAssetsGlobPatterns(
						config,
						path.join(config.otherDir, '**')
					);

			return gulp.src(otherPattern)
				.pipe(gulp.dest(
					plugins.lib.components.getAssetsDestinationDirectory(config)
				));
		}
	};
};