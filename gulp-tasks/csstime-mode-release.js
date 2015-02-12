'use strict';

var gutil = require('gulp-util');

module.exports = function () {
	gutil.log(gutil.colors.green('csstime:', 'release mode'));
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets',
	'csstime-minify-css',
	'csstime-remove-tmp'
];