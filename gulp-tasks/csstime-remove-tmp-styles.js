'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			return plugins.del([
				path.join(
					plugins.lib.pathHelper.getTemporaryDirectory(config),
					config.stylesFileName + '.' + config.preprocessorExt
				)
			]);
		}
	};
};
