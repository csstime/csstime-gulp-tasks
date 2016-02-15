'use strict';

var path = require('path'),
	defaultCsscombConfig = require('../configs/csscomb.json');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var configPath =
				(config.csscombConfig.configPath ===
					defaultCsscombConfig.configPath) ?
					path.join(config.packagePath,
						defaultCsscombConfig.configPath) :
					config.csscombConfig.configPath,
				excludes = config.csscombConfig.excludes.map(function(path) {
					return '!' + path;
				}),
				sources = [
					path.join(config.csscombConfig.sources, '**', '*.less'),
					path.join(config.csscombConfig.sources, '**', '*.css')
				];

			return gulp.src(sources.concat(excludes))
				.pipe(plugins.csscomb(configPath))
				.pipe(gulp.dest(config.csscombConfig.sources));
		}
	};
};