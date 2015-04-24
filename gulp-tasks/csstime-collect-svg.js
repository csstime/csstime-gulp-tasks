'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var svgPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.svgDir, '**', '*.svg')
					),
				destination = plugins.lib.pathHelper
					.getAssetsDestinationDirectory(config);

			return gulp.src(svgPattern)
				.pipe(plugins.if(
					!config.isWatchMode && config.useSvgOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(gulp.dest(destination))
				.pipe(plugins.if(
					config.useSvgRasterization,
					plugins.svg2png()
				))
				.pipe(plugins.if(
					!config.isWatchMode &&
						config.useSvgRasterization && config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(plugins.if(
					config.useSvgRasterization,
					gulp.dest(destination)
				));
		}
	};
};