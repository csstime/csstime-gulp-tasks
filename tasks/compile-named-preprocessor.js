'use strict';

var path = require('path');

module.exports = {

	/**
	 * Compile styles files.
	 * @param {string} stylesName
	 * @param {Object} gulp
	 * @param {Object} plugins
	 * @param {Object} config
	 * @param {Function} cb
	 * @return {Stream}
	 */
	run: function (stylesName, gulp, plugins, config, cb) {
		var sources = [];
		var stylesFileName = stylesName + '.' + config.preprocessorExt;

		// add sprites
		if (config.useImageSprites) {
			sources.push(path.join(
				plugins.lib.pathHelper.getTemporaryDirectory(config),
				config.spritesFileName + '.' + config.preprocessorExt
			));
		}

		// add main less/sass file
		sources.push(path.join(
			plugins.lib.pathHelper.getTemporaryDirectory(config),
			stylesFileName
		));

		return gulp.src(sources)
			.pipe(plugins.concat(stylesFileName))
			.pipe(plugins.if(
				config.useSourceMaps && !config.isRelease,
				plugins.sourcemaps.init()
			))
			.pipe(plugins[config.preprocessor]())
			.pipe(plugins.if(
				config.useSourceMaps && !config.isRelease,
				plugins.sourcemaps.write()
			))
			.on('error', function (error) {
				cb(error);
			})
			.pipe(gulp.dest(
				config.isRelease ?
					plugins.lib.pathHelper
						.getTemporaryDestinationDirectory(config) :
					plugins.lib.pathHelper
						.getDestinationDirectory(config)
			));
	}
};
