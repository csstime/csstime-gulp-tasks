'use strict';

var gulp = require('gulp'),
	path = require('path'),
	config = require('../config.json'),
	gulpif = require('gulp-if'),
	concat = require('gulp-concat'),
	time = require('../lib/time'),
	header = require('gulp-header'),
	pleeease = require('gulp-pleeease'),
	pleeeaseConfig = require(config.configsPath + '.pleeeaserc.json'),
	packageConfig = require('../package.json');

var NODE_MODULES = 'node_modules',
	NORMALIZE_CSS = 'normalize.css';

module.exports = function () {
	var sources = [];
	// add normalize.css
	if (config.useNormalizeCss) {
		sources.push(path.join(
			NODE_MODULES,
			packageConfig.name,
			NODE_MODULES,
			NORMALIZE_CSS,
			NORMALIZE_CSS
		));
	}
	// add styles.css compiled from less
	sources.push(path.join(
		config.publicRootDir,
		config.destinationDir,
		config.stylesFileName + '.css'
	));
	// collect styles.css from all components
	sources.push(path.join(
		config.publicRootDir,
		config.componentsDir,
		'*',
		config.cssDir,
		config.stylesFileName + '.css'
	));
	return gulp.src(sources)
		.pipe(concat(config.stylesFileName + '.css'))
		.pipe(gulpif(config.useCssPleeease, pleeease(pleeeaseConfig)))
		.pipe(gulpif(
			config.banner && (typeof config.banner === 'string'),
			header(config.banner.replace('<%now%>', time.captureNow()))
		))
		.pipe(gulp.dest(path.join(
			config.publicRootDir,
			config.destinationDir
		)));
};

module.exports.dependencies = ['csstime-compile-less'];