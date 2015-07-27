'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-concat-themed-less'],
		task: function () {
			var tasks = config.themedStylesFileNames.map(
				function (themeName) {
					return compileThemedLess(themeName);
				}
			);

			return plugins.mergeStream(tasks);
		}
	};

	/**
	 * Compiled theme-less files.
	 * @param {string} themeName
	 * @return {Stream}
	 */
	function compileThemedLess (themeName) {
		var sources = [];

		// add sprites
		if (config.useImageSprites) {
			sources.push(path.join(
				plugins.lib.pathHelper.getTemporaryDirectory(config),
				config.spritesFileName + '.less'
			));
		}

		// add main less file
		sources.push(path.join(
			plugins.lib.pathHelper.getTemporaryDirectory(config),
			themeName + '.less'
		));

		return gulp.src(sources)
			.pipe(plugins.concat(themeName + '.less'))
			.pipe(plugins.less())
			.pipe(gulp.dest(
				config.isRelease ?
					plugins.lib.pathHelper
						.getTemporaryDestinationDirectory(config) :
					plugins.lib.pathHelper
						.getDestinationDirectory(config)
			));
	}
};