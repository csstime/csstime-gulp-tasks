'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			return gulp.src(
					plugins.lib.pathHelper.getStaticFilesGlobPattern(
						config,
						'**'
					)
				)
				.pipe(gulp.dest(
					plugins.lib.pathHelper.getDestinationDirectory(config)
				));
		}
	};
};