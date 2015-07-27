'use strict';

var path = require('path'),
	util = require('util'),
	fs = require('fs');

var IMPORT_FORMAT = '/*\n * Themed styles of component "%s"' +
		'\n */\n@import "%s";',
	BASE_VARIABLES = '@CDN: "%s";',
	SPRITES_VARIABLES = '@SPRITES_IMAGE: "%s";';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: 'csstime-remove-tmp-themed-styles',
		task: function () {
			var tasks = config.themedStylesFileNames.map(
				function (themeName) {
					return concatThemedLess(themeName);
				}
			);

			return plugins.mergeStream(tasks);
		}
	};

	/**
	 * Concats themes less files.
	 * @param {string} themeName
	 * @return {Stream}
	 */
	function concatThemedLess (themeName) {
		var componentsDirectories = plugins.lib.pathHelper
				.getAssetsDirectories(config),
			imports = [];

		// variables
		imports.push(util.format(BASE_VARIABLES, config.cdnPath));

		// sprites
		if (config.useImageSprites) {
			imports.push(util.format(
				SPRITES_VARIABLES,
				config.spritesFileName + '.png'
			));
		}

		// less
		componentsDirectories.forEach(function (component) {
			var importingFile = path.join(
				component,
				config.lessDir,
				config.lessThemesDir,
				themeName + '.less'
			);
			if (!fs.existsSync(importingFile)) {
				return;
			}
			imports.push(util.format(IMPORT_FORMAT, component, importingFile));
		});

		// create file
		return plugins.file(
			themeName + '.less',
			imports.join('\n\n'),
			{src: true}
		)
			.pipe(gulp.dest(
				plugins.lib.pathHelper.getTemporaryDirectory(config)
			));
	}
};