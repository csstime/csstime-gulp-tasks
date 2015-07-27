'use strict';

var path = require('path'),
	time = require('../lib/time');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-compile-themed-less'],
		task: function () {
			var tasks = config.themedStylesFileNames.map(
				function (themeName) {
					return handleThemedCss(themeName);
				}
			);

			return plugins.mergeStream(tasks);
		}
	};

	/**
	 * Handles themed css.
	 * @param {string} themeName
	 * @return {Stream}
	 */
	function handleThemedCss (themeName) {
		var sources = [];

		// add themed.css compiled from less
		sources.push(path.join(
			config.isRelease ?
				plugins.lib.pathHelper
					.getTemporaryDestinationDirectory(config) :
				plugins.lib.pathHelper
					.getDestinationDirectory(config),
			themeName + '.css'
		));

		// collect themed.css from all components
		plugins.lib.pathHelper
			.getAssetsGlobPatterns(
			config,
			path.join(config.cssDir, config.lessThemesDir, themeName + '.css')
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
			.pipe(plugins.concat(themeName + '.css'))
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