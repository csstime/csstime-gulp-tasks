'use strict';

var gutil = require('gulp-util');

module.exports = function () {
	gutil.log(gutil.colors.gray('csstime:', 'statics were rebuilt'));
};

module.exports.dependencies = [
	'csstime-copy-static'
];