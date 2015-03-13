'use strict';

var NODE_MODULES_DIR = 'node_modules',
	CONFIGS_DIR = 'configs';

module.exports = function () {
	var gulp = require('gulp'),
		path = require('path'),
		csscomb = require('gulp-csscomb'),
		packageConfig = require('../package.json'),
		config = require('../config.json');

	return gulp.src(
		[
			path.join(
				config.componentsRootDir, '**',
				config.lessDir, '*.less'
			),
			path.join(
				config.componentsRootDir, '**',
				config.cssDir, '*.css'
			)
		])
		.pipe(csscomb(path.join(
			process.cwd(),
			NODE_MODULES_DIR,
			packageConfig.name,
			CONFIGS_DIR,
			'.csscomb.json'
		)))
		.pipe(gulp.dest(config.componentsRootDir));
};