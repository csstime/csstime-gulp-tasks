'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function (cb) {
			plugins.del([
				path.join(
					config.publicRootDir,
					config.temporaryDir,
					config.stylesFileName + '.less'
				)
			], cb);
		}
	};
};