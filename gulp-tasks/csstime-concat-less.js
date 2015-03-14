'use strict';

var path = require('path'),
	util = require('util'),
	fs = require('fs'),
	components = require('../lib/components');

var IMPORT_FORMAT = '/*\n * Styles of component "%s"\n */\n@import "%s";',
	BASE_VARIABLES = '@CDN: "%s";',
	SPRITES_VARIABLES = '@SPRITES_IMAGE: "%s";';

module.exports = function (gulp, plugins, config) {
	var dependencies = [
		'csstime-remove-styles',
		'csstime-collect-images',
		'csstime-collect-svg'
	];

	if (config.useImageSprites) {
		dependencies.push('csstime-collect-sprites');
	}

	return {
		dependencies: dependencies,
		task: function () {
			var componentsNames = components.getNames(config),
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
			componentsNames.forEach(function (component) {
				var importingFile = path.join(
					config.publicRootDir,
					config.componentsDir,
					component,
					config.lessDir,
					config.stylesFileName + '.less'
				);
				if (!fs.existsSync(path.join(process.cwd(), importingFile))) {
					return;
				}
				imports.push(util.format(IMPORT_FORMAT, component, importingFile));
			});

			// create file
			return plugins.file(
					config.stylesFileName + '.less',
					imports.join('\n\n'),
					{src: true}
				)
				.pipe(gulp.dest(path.join(
					config.publicRootDir,
					config.temporaryDir
				)));
		}
	};
};