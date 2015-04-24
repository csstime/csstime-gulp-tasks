'use strict';

var path = require('path'),
	time = require('../lib/time');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-copy-static'],
		task: function () {
			return gulp.src(path.join(
					plugins.lib.pathHelper.getDestinationDirectory(config),
					'*.js'
				))
				.pipe(plugins.uglify())
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