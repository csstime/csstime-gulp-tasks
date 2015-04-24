'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'_csstime-set-release',
			'csstime-process-static',
			'csstime-process-assets',
			'csstime-minify-css',
			'csstime-minify-js',
			'csstime-remove-tmp'
		],
		task: function () {
			var logger = require('../lib/logger')(plugins, config);
			logger.write('release mode', 'green');
		}
	};
};