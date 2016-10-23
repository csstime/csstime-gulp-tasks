'use strict';

var path = require('path'),
	util = require('util'),
	fs = require('fs');

var IMPORT_FORMAT = '/*\n * Styles of component "%s"\n */\n@import "%s";',
	VARIABLE_FORMAT = {
		less: '@%s: "%s";',
		sass: '$%s: "%s";'
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

		// cdn variable
		imports.push(util.format(
			VARIABLE_FORMAT[config.preprocessor],
			'CDN',
			config.cdnPath
		));

		// sprites variable
		if (config.useImageSprites) {
			imports.push(util.format(
				VARIABLE_FORMAT[config.preprocessor],
				'SPRITES_IMAGE',
				config.spritesFileName + '.png'
			));
		}
		
		// custom variables
		Object.keys(config.variables).forEach(function (variableKey) {
			imports.push(util.format(
				VARIABLE_FORMAT[config.preprocessor],
				variableKey,
				config.variables[variableKey]
			));
		});

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
