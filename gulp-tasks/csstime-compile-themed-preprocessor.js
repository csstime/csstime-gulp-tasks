'use strict';

var task = require('../tasks/compile-named-preprocessor'),
	path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-concat-themed-preprocessor'],
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
