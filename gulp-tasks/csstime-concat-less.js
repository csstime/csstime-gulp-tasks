var gulp = require('gulp'),
	path = require('path'),
	util = require('util'),
	fs = require('fs'),
	file = require('gulp-file'),
	concat = require('gulp-concat'),
	csstime = require('../index.js'),
	config = require('../config.json');

var IMPORT_FORMAT = '/*\n * Styles of "%s" component\n */\n@import "%s";',
	FILE_FORMAT = "%s/%s/%s/%s/%s";

module.exports = function () {
	var components = csstime.getPublishedComponents(),
		imports = [];

	components.forEach(function (component) {
		var importingFile = util.format(
			FILE_FORMAT,
			config.destinationDir,
			config.componentsAssetsDir,
			component,
			config.lessDir,
			config.lessIndexFile
		);
		if (!fs.existsSync(path.join(process.cwd(), importingFile))) {
			return;
		}
		imports.push(util.format(IMPORT_FORMAT, component, importingFile));
	});

	return file(config.lessIndexFile, imports.join('\n\n'), {src: true})
		.pipe(gulp.dest(path.join(config.destinationDir, config.temporaryDir)));
};