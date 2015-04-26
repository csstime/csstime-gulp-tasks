'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-process-static',
			'csstime-process-assets',
			'csstime-minify-css',
			'csstime-minify-js'
		],
		task: function (cb) {
			cb();
		}
	};
};