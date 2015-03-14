'use strict';

var path = require('path'),
	packageConfig = require('../package.json');

var NODE_MODULES_DIR = 'node_modules',
	CONFIGS_DIR = 'configs';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-remove-sprites'],
		task: function () {
			var spriteData = gulp.src(path.join(
					config.publicRootDir,
					config.componentsDir,
					'*',
					config.spritesDir,
					'**',
					'*.png'
				))
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
					config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(gulp.dest(path.join(
					config.publicRootDir,
					config.destinationDir,
					config.componentsDir
				)));

			return spriteData.css.pipe(gulp.dest(path.join(
				config.publicRootDir,
				config.temporaryDir
			)));
		}
	};
};