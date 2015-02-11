'use strict';

var gulp = require('gulp'),
	path = require('path'),
	util = require('util'),
	fs = require('fs'),
	file = require('gulp-file'),
	csstime = require('../index.js'),
	config = require('../config.json');

var IMPORT_SPRITES_FORMAT = '/*\n * Sprites\n */\n@import "%s";',
	IMPORT_FORMAT = '/*\n * Styles of component "%s"\n */\n@import "%s";',
	BASE_VARIABLES = '@CDN: "%s";',
	SPRITES_VARIABLES = '@SPRITES_IMAGE: "%s";';

module.exports = function () {
	var components = csstime.getPublishedComponents(),
		imports = [];

	// variables
	imports.push(util.format(BASE_VARIABLES, config.cdnPath));

	// sprites
	if (config.useImageSprites) {
		imports.push(util.format(
			SPRITES_VARIABLES,
			config.spritesFileName + '.png'
		));

		var importingSpriteFile = path.join(
			config.destinationDir,
			config.temporaryDir,
			config.spritesFileName + '.less'
		);
		imports.push(util.format(IMPORT_SPRITES_FORMAT, importingSpriteFile));
	}

	// less
	components.forEach(function (component) {
		var importingFile = path.join(
			config.destinationDir,
			config.componentsAssetsDir,
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
	return file(config.stylesFileName + '.less', imports.join('\n\n'), {src: true})
		.pipe(gulp.dest(path.join(config.destinationDir, config.temporaryDir)));
};