'use strict';

var path = require('path'),
	time = require('../lib/time'),
	packageConfig = require('../package.json');

var NODE_MODULES = 'node_modules',
	NORMALIZE_CSS = 'normalize.css';

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-compile-less'],
		task: function () {
			var sources = [];
			// add normalize.css
			if (config.useNormalizeCss) {
				sources.push(path.join(
					NODE_MODULES,
					packageConfig.name,
					NODE_MODULES,
					NORMALIZE_CSS,
					NORMALIZE_CSS
				));
			}
			// add styles.css compiled from less
			sources.push(path.join(
				config.publicRootDir,
				config.destinationDir,
				config.stylesFileName + '.css'
			));
			// collect styles.css from all components
			sources.push(path.join(
				config.publicRootDir,
				config.componentsDir,
				'*',
				config.cssDir,
				config.stylesFileName + '.css'
			));
			return gulp.src(sources)
				.pipe(plugins.concat(config.stylesFileName + '.css'))
				.pipe(plugins.if(
					config.useCssPleeease,
					plugins.pleeease(config.pleeeaseConfig)
				))
				.pipe(plugins.if(
					config.banner && (typeof config.banner === 'string'),
					plugins.header(config.banner
						.replace('<%now%>', time.captureNow()))
				))
				.pipe(gulp.dest(path.join(
					config.publicRootDir,
					config.destinationDir
				)));
		}
	};
};