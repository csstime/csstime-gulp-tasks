'use strict';

var gutil = require('gulp-util');

module.exports = function () {
	gutil.log('Csstime', 'Release mode', gutil.colors.green());
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets',
	'csstime-minify-css',
	'csstime-remove-tmp'
];