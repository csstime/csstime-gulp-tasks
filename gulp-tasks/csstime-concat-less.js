'use strict';

var gulp = require('gulp'),
	path = require('path'),
	util = require('util'),
	fs = require('fs'),
	file = require('gulp-file'),
	csstime = require('../index.js'),
	config = require('../config.json');

var IMPORT_FORMAT = '/*\n * Styles of component "%s"\n */\n@import "%s";',
	FILE_FORMAT = '%s/%s/%s/%s/%s';

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
			config.stylesFileName + '.less'
		);
		if (!fs.existsSync(path.join(process.cwd(), importingFile))) {
			return;
		}
		imports.push(util.format(IMPORT_FORMAT, component, importingFile));
	});

	return file(config.stylesFileName + '.less', imports.join('\n\n'), {src: true})
		.pipe(gulp.dest(path.join(config.destinationDir, config.temporaryDir)));
};