'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-concat-less'],
		task: function () {
			var sources = [];

			// add sprites
			if (config.useImageSprites) {
				sources.push(path.join(
					config.publicRootDir,
					config.temporaryDir,
					config.spritesFileName + '.less'
				));
			}

			// add main less file
			sources.push(path.join(
				config.publicRootDir,
				config.temporaryDir,
				config.stylesFileName + '.less'
			));

			return gulp.src(sources)
				.pipe(plugins.concat(config.stylesFileName + '.less'))
				.pipe(plugins.less())
				.pipe(gulp.dest(path.join(
					config.publicRootDir,
					config.destinationDir
				)));
		}
	};
};