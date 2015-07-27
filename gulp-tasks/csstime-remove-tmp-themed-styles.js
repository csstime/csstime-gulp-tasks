'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function (cb) {
			var themedStylesPaths = config.themedStylesFileNames
				.map(function (themeName) {
					return path.join(
						plugins.lib.pathHelper.getTemporaryDirectory(config),
						themeName + '.less'
					);
				});
			plugins.del(themedStylesPaths, cb);
		}
	};
};