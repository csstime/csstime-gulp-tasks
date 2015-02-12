'use strict';

var gutil = require('gulp-util');

module.exports = function () {
	gutil.log(gutil.colors.yellow('csstime:', 'debug mode'));
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets'
];