'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var fontsPattern = plugins.lib.pathHelper
					.getAssetsGlobPatterns(
						config,
						path.join(config.fontsDir, '**')
					);

			return gulp.src(fontsPattern, {base: process.cwd()})
				.pipe(plugins.rename(function (filePath) {
					plugins.lib.pathHelper
						.renamePathToComponentName(config, filePath);
				}))
				.pipe(gulp.dest(
					plugins.lib.pathHelper.getAssetsDestinationDirectory(config)
				));
		}
	};
};