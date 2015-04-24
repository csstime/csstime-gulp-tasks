'use strict';

var path = require('path'),
	time = require('../lib/time');

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
					config.packagePath,
					NODE_MODULES,
					NORMALIZE_CSS,
					NORMALIZE_CSS
				));
			}
			// add styles.css compiled from less
			sources.push(path.join(
				config.isRelease ?
					plugins.lib.pathHelper
						.getTemporaryDestinationDirectory(config) :
					plugins.lib.pathHelper
						.getDestinationDirectory(config),
				config.stylesFileName + '.css'
			));
			// collect styles.css from all components
			plugins.lib.pathHelper
				.getAssetsGlobPatterns(
					config,
					path.join(config.cssDir, config.stylesFileName + '.css')
				)
				.forEach(function (pattern) {
					sources.push(pattern);
				});

			var processors = [];
			if (config.postcssConfig.filters) {
				processors.push(plugins.postcssProcessors
					.filters(config.postcssConfig.filters));
			}
			if (config.postcssConfig.opacity) {
				processors.push(plugins.postcssProcessors.opacity);
			}
			if (config.postcssConfig.autoprefixer) {
				processors.push(plugins.postcssProcessors
					.autoprefixer(config.postcssConfig.autoprefixer));
			}

			return gulp.src(sources)
				.pipe(plugins.concat(config.stylesFileName + '.css'))
				.pipe(plugins.if(
					config.usePostCSS,
					plugins.postcss(processors)
				))
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