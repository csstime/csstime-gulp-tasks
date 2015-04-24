'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-publish-tmp',
			'csstime-remove-tmp'
		],
		task: function () {
			var logger = require('../lib/logger')(plugins, config);
			logger.write('release mode', 'green');
		}
	};
};