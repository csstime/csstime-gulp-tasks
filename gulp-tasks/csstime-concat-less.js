'use strict';

var config = require('../config.json');

var IMPORT_FORMAT = '/*\n * Styles of component "%s"\n */\n@import "%s";',
	BASE_VARIABLES = '@CDN: "%s";',
	SPRITES_VARIABLES = '@SPRITES_IMAGE: "%s";';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		util = require('util'),
		fs = require('fs'),
		file = require('gulp-file'),
		components = require('../lib/components');

	var componentsNames = components.getNames(),
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

module.exports.dependencies = [
	'csstime-remove-styles',
	'csstime-collect-images',
	'csstime-collect-svg'
];

if (config.useImageSprites) {
	module.exports.dependencies.push('csstime-collect-sprites');
}