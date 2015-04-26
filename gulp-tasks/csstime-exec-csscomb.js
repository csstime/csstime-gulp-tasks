'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			return gulp.src([
					path.join(config.csscombConfig.sources, '**', '*.less'),
					path.join(config.csscombConfig.sources, '**', '*.css')
				])
				.pipe(plugins.csscomb(
					path.join(process.cwd(), config.csscombConfig.configPath)
				))
				.pipe(gulp.dest(config.csscombConfig.sources));
		}
	};
};