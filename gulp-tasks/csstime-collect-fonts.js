'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var fontsPattern = plugins.lib.components
					.getAssetsGlobPatterns(
						config,
						path.join(config.fontsDir, '**')
					);

			return gulp.src(fontsPattern)
				.pipe(gulp.dest(
					plugins.lib.components.getAssetsDestinationDirectory(config)
				));
		}
	};
};