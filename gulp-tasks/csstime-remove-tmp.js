'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-process-assets'],
		task: function (cb) {
			plugins.del([
				path.join(
					config.publicRootDir,
					config.temporaryDir
				)
			], cb);
		}
	};
};