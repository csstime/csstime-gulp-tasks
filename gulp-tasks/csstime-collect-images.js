'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var imagesPattern = plugins.lib.components
					.getAssetsGlobPatterns(
						config,
						path.join(config.imagesDir, '**')
					);

			return gulp.src(imagesPattern)
				.pipe(plugins.if(
					!config.isWatchMode && config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(gulp.dest(
					plugins.lib.components.getAssetsDestinationDirectory(config)
				));
		}
	};
};