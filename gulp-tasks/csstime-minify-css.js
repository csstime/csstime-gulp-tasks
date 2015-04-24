'use strict';

var path = require('path'),
	time = require('../lib/time');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-handle-css'],
		task: function () {
			return gulp.src(path.join(
				plugins.lib.pathHelper.getDestinationDirectory(config),
					config.stylesFileName + '.css'
				))
				.pipe(plugins.csso(!config.useCssStructureMinimization))
				.pipe(plugins.if(
					config.banner && (typeof config.banner === 'string'),
					plugins.header(config.banner
						.replace('<%now%>', time.captureNow()))
				))
				.pipe(gulp.dest(
					plugins.lib.pathHelper.getDestinationDirectory(config)
				));
		}
	};
};