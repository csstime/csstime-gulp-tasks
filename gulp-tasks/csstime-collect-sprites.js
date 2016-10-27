'use strict';

var path = require('path'),
	defaultSpritesmithConfig = require('../configs/spritesmith.json');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-remove-tmp-sprites'],
		task: function (cb) {
			var spriteImagesPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.spritesDir, '**', '*.png')
					);

			var cssTempleteFilePath = config.preprocessor + 'TemplatePath',
				cssTemplate =
				(config.spritesmithConfig[cssTempleteFilePath] ===
					defaultSpritesmithConfig[cssTempleteFilePath]) ?
					path.join(config.packagePath,
						defaultSpritesmithConfig[cssTempleteFilePath]) :
					config.spritesmithConfig[cssTempleteFilePath];

			var	spriteData =
				gulp.src(spriteImagesPattern)
				.pipe(plugins.spritesmith({
					imgName: config.spritesFileName + '.png',
					cssName: config.spritesFileName + '.' + config.preprocessorExt,
					algorithm: config.spritesmithConfig.algorithm,
					cssTemplate: cssTemplate,
					padding: config.spritesmithConfig.padding
				}));

			spriteData.img
				.pipe(plugins.vinylBuffer())
				.pipe(plugins.if(
					config.isRelease && config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.on('error', function (error) {
					cb(error);
				})
				.pipe(gulp.dest(
					config.isRelease ?
						plugins.lib.pathHelper
							.getTemporaryAssetsDestinationDirectory(config) :
						plugins.lib.pathHelper
							.getAssetsDestinationDirectory(config)
				));

			return spriteData.css.pipe(gulp.dest(
				plugins.lib.pathHelper.getTemporaryDirectory(config)
			));
		}
	};
};
