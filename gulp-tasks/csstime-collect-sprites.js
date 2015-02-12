'use strict';

var gulp = require('gulp'),
	path = require('path'),
	spritesmith = require('gulp.spritesmith'),
	spritesmithConfig = require('../.spritesmith.json'),
	config = require('../config.json');

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
			cssTemplate: spritesmithConfig.cssTemplate,
			padding: spritesmithConfig.padding
		}));

	spriteData.img.pipe(gulp.dest(config.destinationDir));

	return spriteData.css.pipe(gulp.dest(path.join(
		config.destinationDir,
		config.temporaryDir,
		config.spritesFileName + '.less'
	)));
};