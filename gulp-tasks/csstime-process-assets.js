'use strict';

var gutil = require('gulp-util');

module.exports = function () {
	gutil.log(gutil.colors.gray('csstime:', 'assets were rebuilt'));
};

module.exports.dependencies = [
	'csstime-handle-css',
	'csstime-collect-images',
	'csstime-collect-fonts',
	'csstime-collect-svg',
	'csstime-collect-other'
];