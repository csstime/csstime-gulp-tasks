'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var imagesPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.imagesDir, '**')
					);

			return gulp.src(imagesPattern)
				.pipe(plugins.if(
					config.isRelease && config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(gulp.dest(
					plugins.lib.pathHelper.getAssetsDestinationDirectory(config)
				));
		}
	};
};