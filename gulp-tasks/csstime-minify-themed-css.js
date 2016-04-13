'use strict';

var task = require('../tasks/minify-named-css'),
	path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function (cb) {
			var tasks = config.themedStylesFileNames.map(
				function (themeName) {
					return task.run(
						path.join(config[config.preprocessor + 'ThemesDir'], themeName),
						gulp, plugins, config, cb
					);
				}
			);

			return plugins.mergeStream(tasks);
		}
	};
};
