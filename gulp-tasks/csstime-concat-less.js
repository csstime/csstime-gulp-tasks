'use strict';

var gulp = require('gulp'),
	path = require('path'),
	util = require('util'),
	fs = require('fs'),
	file = require('gulp-file'),
	components = require('../lib/components'),
	config = require('../config.json');

var IMPORT_SPRITES_FORMAT = '/*\n * Sprites\n */\n@import "%s";',
	IMPORT_FORMAT = '/*\n * Styles of component "%s"\n */\n@import "%s";',
	BASE_VARIABLES = '@CDN: "%s";',
	SPRITES_VARIABLES = '@SPRITES_IMAGE: "%s";';

module.exports = function () {
	var components = components.getNames(),
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
			config.publicRootDir,
			config.temporaryDir,
			config.spritesFileName + '.less'
		);
		imports.push(util.format(IMPORT_SPRITES_FORMAT, importingSpriteFile));
	}

	// less
	components.forEach(function (component) {
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
	return file(
			config.stylesFileName + '.less',
			imports.join('\n\n'),
			{src: true}
		)
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.temporaryDir
		)));
};

if (config.useImageSprites) {
	module.exports.dependencies = ['csstime-collect-sprites'];
}