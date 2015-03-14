'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			var destination = path.join(
				config.publicRootDir,
				config.destinationDir,
				config.componentsDir
			);
			return gulp.src(path.join(
					config.publicRootDir,
					config.componentsDir,
					'*',
					config.svgDir,
					'**',
					'*.svg'
				))
				.pipe(plugins.if(
					config.useSvgOptimization,
					plugins.svgmin(config.svgminConfig)
				))
				.pipe(gulp.dest(destination))
				.pipe(plugins.if(
					config.useSvgRasterization,
					plugins.svg2png()
				))
				.pipe(plugins.if(
					config.useSvgRasterization && config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(plugins.if(
					config.useSvgRasterization,
					gulp.dest(destination)
				));
		}
	};
};