'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: [
			'csstime-publish-tmp'
		],
		task: function (cb) {
			plugins.del([
				plugins.lib.pathHelper.getTemporaryDirectory(config)
			], cb);
		}
	};
};