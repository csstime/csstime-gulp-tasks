'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-publish-tmp'
		],
		task: function () {
			gulp.run('csstime-remove-tmp');
			var logger = require('../lib/logger')(plugins, config);
			logger.write('release mode', 'green');
		}
	};
};