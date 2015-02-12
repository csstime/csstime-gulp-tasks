'use strict';

var gutil = require('gulp-util');

module.exports = function () {
	gutil.log('Csstime', 'Debug mode', gutil.colors.yellow());
};

module.exports.dependencies = [
	'csstime-process-static',
	'csstime-process-assets'
];