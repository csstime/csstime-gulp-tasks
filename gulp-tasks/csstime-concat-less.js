var gulp = require('gulp'),
	path = require('path'),
	util = require('util'),
	file = require('gulp-file'),
	concat = require('gulp-concat'),
	csstime = require('../index.js'),
	config = require('../config.json');

var importFormat = '@import "%s/%s/%s/%s/%s"';

module.exports = function () {
	var components = csstime.getPublishedComponents(),
		imports = [];

	components.forEach(function (component) {
		imports.push(util.format(
			importFormat,
			config.destinationDir,
			config.componentsAssetsDir,
			component,
			config.lessDir,
			config.lessIndexFile
		));
	});

	return file(config.lessIndexFile, imports.join('\n'), {src: true})
		.pipe(gulp.dest(config.temporaryDir));
};