'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			return gulp.src(path.join(
					config.publicRootDir,
					config.componentsDir,
					'*',
					config.imagesDir,
					'**'
				))
				.pipe(plugins.if(
					config.useImageOptimization,
					plugins.imagemin(config.imageminConfig)
				))
				.pipe(gulp.dest(path.join(
					config.publicRootDir,
					config.destinationDir,
					config.componentsDir
				)));
		}
	};
};