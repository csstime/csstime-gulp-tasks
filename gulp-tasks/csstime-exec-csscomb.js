'use strict';

var path = require('path'),
	packageConfig = require('../package.json');

var NODE_MODULES_DIR = 'node_modules',
	CONFIGS_DIR = 'configs';

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			return gulp.src(
				[
					path.join(
						config.componentsRootDir, '**',
						config.lessDir, '*.less'
					),
					path.join(
						config.componentsRootDir, '**',
						config.cssDir, '*.css'
					)
				])
				.pipe(plugins.csscomb(path.join(
					process.cwd(),
					NODE_MODULES_DIR,
					packageConfig.name,
					CONFIGS_DIR,
					'.csscomb.json'
				)))
				.pipe(gulp.dest(config.componentsRootDir));
		}
	};
};