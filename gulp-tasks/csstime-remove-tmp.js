'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-process-assets'],
		task: function (cb) {
			plugins.del([
				plugins.lib.pathHelper.getTemporaryDirectory(config)
			], cb);
		}
	};
};