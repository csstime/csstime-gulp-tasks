'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-process-static',
			'csstime-process-assets'
		],
		task: function () {

			// fonts
			gulp.watch(
				plugins.lib.pathHelper.getAssetsGlobPatterns(
					config,
					path.join(config.fontsDir, '**')
				),
				{
					interval: config.watchInterval
				},
				['csstime-collect-fonts']
			);

			// other files
			gulp.watch(
				plugins.lib.pathHelper.getAssetsGlobPatterns(
					config,
					path.join(config.otherDir, '**')
				),
				{
					interval: config.watchInterval
				},
				['csstime-collect-other']
			);

			// svg, images, sprites, css and less
			gulp.watch(
				[
					plugins.lib.pathHelper.getAssetsGlobPatterns(
						config,
						path.join(config.imagesDir, '**')
					),
					plugins.lib.pathHelper.getAssetsGlobPatterns(
						config,
						path.join(config.svgDir, '**', '*.svg')
					),
					plugins.lib.pathHelper.getAssetsGlobPatterns(
						config,
						path.join(config.spritesDir, '**', '*.png')
					),
					plugins.lib.pathHelper.getAssetsGlobPatterns(
						config,
						path.join(config.lessDir, '**', '*.less')
					),
					plugins.lib.pathHelper.getAssetsGlobPatterns(
						config,
						path.join(config.cssDir, '**', '*.css')
					)
				],
				{
					interval: config.watchInterval
				},
				['csstime-handle-css']
			);

			// static files
			gulp.watch(
				plugins.lib.pathHelper.getStaticFilesGlobPattern(
					config,
					path.join('**', '*')
				),
				{
					interval: config.watchInterval
				},
				['csstime-process-static']
			);

			var logger = require('../lib/logger')(plugins, config);
			logger.write('watch mode', 'blue');
			logger.notify('Watch mode is on');
		}
	};
};