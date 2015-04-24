'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-remove-tmp-sprites'],
		task: function () {
			var spriteImagesPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.spritesDir, '**', '*.png')
					);

			var	spriteData =
				gulp.src(spriteImagesPattern)
				.pipe(plugins.spritesmith({
					imgName: config.spritesFileName + '.png',
					cssName: config.spritesFileName + '.less',
					algorithm: config.spritesmithConfig.algorithm,
					cssTemplate: config.spritesmithConfig.cssTemplatePath,
					padding: config.spritesmithConfig.padding
				}));

			spriteData.img
				.pipe(plugins.if(
					config.isRelease && config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(gulp.dest(
					plugins.lib.pathHelper.getAssetsDestinationDirectory(config)
				));

			return spriteData.css.pipe(gulp.dest(
				plugins.lib.pathHelper.getTemporaryDirectory(config)
			));
		}
	};
};