'use strict';

var path = require('path'),
	util = require('util'),
	fs = require('fs');

var IMPORT_FORMAT = '/*\n * Styles of component "%s"\n */\n@import "%s";',
	BASE_VARIABLES = {
		less: '@CDN: "%s";',
		sass: '$CDN: "%s";',
		stylus: '$CDN = "%s"'
	},
	SPRITES_VARIABLES = {
		less: '@SPRITES_IMAGE: "%s";',
		sass: '$SPRITES_IMAGE: "%s";',
		stylus: '$SPRITES_IMAGE = "%s"'
	};

module.exports = {

	/**
	 * Concat styles files.
	 * @param {string} stylesName
	 * @param {Object} gulp
	 * @param {Object} plugins
	 * @param {Object} config
	 * @return {Stream}
	 */
	run: function (stylesName, gulp, plugins, config) {
		var componentsDirectories = plugins.lib.pathHelper
				.getAssetsDirectories(config),
			imports = [];

		// variables
		imports.push(util.format(BASE_VARIABLES[config.preprocessor],
			config.cdnPath));

		// sprites
		if (config.useImageSprites) {
			imports.push(util.format(
				SPRITES_VARIABLES[config.preprocessor],
				config.spritesFileName + '.png'
			));
		}

		// less/sass
		componentsDirectories.forEach(function (component) {
			var importingFile = component + '/' +
				config[config.preprocessor + 'Dir'] + '/' +
				stylesName + '.' + config.preprocessorExt;

			if (!fs.existsSync(importingFile)) {
				return;
			}
			imports.push(util.format(IMPORT_FORMAT, component, importingFile));
		});

		// create file
		return plugins.file(
			stylesName + '.' + config.preprocessorExt,
			imports.join('\n\n'),
			{src: true}
		)
			.pipe(gulp.dest(
				plugins.lib.pathHelper.getTemporaryDirectory(config)
			));
	}
};
