'use strict';

var path = require('path'),
	packageConfig = require('../package.json');

var NODE_MODULES_DIR = 'node_modules',
	CONFIGS_DIR = 'configs';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-remove-tmp-sprites'],
		task: function () {
			var spriteImagesPattern = plugins.lib.components
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
					cssTemplate: path.join(
						NODE_MODULES_DIR,
						packageConfig.name,
						CONFIGS_DIR,
						config.spritesmithConfig.cssTemplate
					),
					padding: config.spritesmithConfig.padding
				}));

			spriteData.img
				.pipe(plugins.if(
					!config.isWatchMode && config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(gulp.dest(
					plugins.lib.components.getAssetsDestinationDirectory(config)
				));

			return spriteData.css.pipe(gulp.dest(
				plugins.lib.components.getTemporaryDirectory(config)
			));
		}
	};
};