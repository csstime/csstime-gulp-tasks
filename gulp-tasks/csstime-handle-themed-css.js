'use strict';

var task = require('../tasks/handle-named-css'),
	path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-compile-themed-preprocessor'],
		task: function () {
			var tasks = config.themedStylesFileNames.map(
				function (themeName) {
					return task.run(
						path.join(config[config.preprocessor + 'ThemesDir'], themeName),
						gulp, plugins, config
					);
				}
			);

			return plugins.mergeStream(tasks);
		}
	};
};
