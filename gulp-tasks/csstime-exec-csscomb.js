'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			return gulp.src(config.csscombConfig.sources)
				.pipe(plugins.csscomb(config.csscombConfig.configPath))
				.pipe(gulp.dest(config.csscombConfig.sources));
		}
	};
};