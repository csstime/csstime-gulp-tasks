'use strict';

var path = require('path'),
	time = require('../lib/time');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var tasks = config.themedStylesFileNames.map(
				function (themeName) {
					return minifyThemedCss(themeName);
				}
			);

			return plugins.mergeStream(tasks);
		}
	};

	/**
	 * Minifies themed css.
	 * @param {string} themeName
	 * @return {Stream}
	 */
	function minifyThemedCss (themeName) {
		return gulp.src(
			path.join(
				config.isRelease ?
					plugins.lib.pathHelper
						.getTemporaryDestinationDirectory(config) :
					plugins.lib.pathHelper
						.getDestinationDirectory(config),
				themeName + '.css'
			)
		)
			.pipe(plugins.csso(!config.useCssStructureMinimization))
			.pipe(plugins.if(
				config.banner && (typeof config.banner === 'string'),
				plugins.header(config.banner
					.replace('<%now%>', time.captureNow()))
			))
			.pipe(gulp.dest(
				config.isRelease ?
					plugins.lib.pathHelper
						.getTemporaryDestinationDirectory(config) :
					plugins.lib.pathHelper
						.getDestinationDirectory(config)
			));
	}
};