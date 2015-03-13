'use strict';

var NODE_MODULES_DIR = 'node_modules',
	CONFIGS_DIR = 'configs';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		config = require('../config.json'),
		gulpif = require('gulp-if'),
		imagemin = require('gulp-imagemin'),
		imageminConfig = require(config.configsPath + '.imagemin.json'),
		spritesmith = require('gulp.spritesmith'),
		spritesmithConfig = require(config.configsPath + '.spritesmith.json'),
		packageConfig = require('../package.json');

	var spriteData = gulp.src(path.join(
			config.publicRootDir,
			config.componentsDir,
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
				CONFIGS_DIR,
				spritesmithConfig.cssTemplate
			),
			padding: spritesmithConfig.padding
		}));

	spriteData.img
		.pipe(gulpif(
			config.useImageOptimization,
			imagemin(imageminConfig)
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir,
			config.componentsDir
		)));

	return spriteData.css.pipe(gulp.dest(path.join(
		config.publicRootDir,
		config.temporaryDir
	)));
};

module.exports.dependencies = [
	'csstime-remove-sprites'
];