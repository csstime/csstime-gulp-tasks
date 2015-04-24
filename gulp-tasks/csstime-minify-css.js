'use strict';

var path = require('path'),
	time = require('../lib/time');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-handle-css'],
		task: function () {
			return gulp.src(
					path.join(
						config.isRelease ?
							plugins.lib.pathHelper
								.getTemporaryDestinationDirectory(config) :
							plugins.lib.pathHelper
								.getDestinationDirectory(config),
						config.stylesFileName + '.css'
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
};