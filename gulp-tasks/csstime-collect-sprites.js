'use strict';

var gulp = require('gulp'),
	path = require('path'),
	spritesmith = require('gulp.spritesmith'),
	spritesmithConfig = require('../.spritesmith.json'),
	packageConfig = require('../package.json'),
	config = require('../config.json');

var NODE_MODULES_DIR = 'node_modules';

module.exports = function () {
	var spriteData = gulp.src(path.join(
			config.destinationDir,
			config.componentsAssetsDir,
			'*',
			config.spritesDir,
			'**',
			'*.png'
		))
		.pipe(spritesmith({
			imgName: config.spritesFileName + '.png',
			cssName: config.spritesFileName + '.less',
			algorithm: spritesmithConfig.algorithm,
			cssTemplate: path.join(
				NODE_MODULES_DIR,
				packageConfig.name,
				spritesmithConfig.cssTemplate
			),
			padding: spritesmithConfig.padding
		}));

	spriteData.img.pipe(gulp.dest(path.join(
		config.destinationDir,
		config.staticDir
	)));

	return spriteData.css.pipe(gulp.dest(path.join(
		config.destinationDir,
		config.temporaryDir
	)));
};