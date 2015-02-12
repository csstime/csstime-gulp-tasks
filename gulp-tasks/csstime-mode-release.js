'use strict';

var gulp = require('gulp');

module.exports = function () {
	gulp.run('csstime-remove-tmp');
};

module.exports.dependencies = [
	'csstime-mode-debug',
	'csstime-minify-css'
];