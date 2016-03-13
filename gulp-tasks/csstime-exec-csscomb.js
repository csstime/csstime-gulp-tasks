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
				excludes = config.csscombConfig.excludes || [],
				sources = [
					path.join(config.csscombConfig.sources, '**',
						'*.' + config.preprocessorExt),
					path.join(config.csscombConfig.sources, '**', '*.css')
				];

			if (Array.isArray(excludes) && excludes.length > 0) {
				excludes = excludes.map(function (path) {
					return '!' + path;
				});
				sources = sources.concat(excludes);
			}

			return gulp.src(sources)
				.pipe(plugins.csscomb(configPath))
				.pipe(gulp.dest(config.csscombConfig.sources));
		}
	};
};
