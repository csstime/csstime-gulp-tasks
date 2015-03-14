'use strict';

var path = require('path'),
	time = require('../lib/time');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-handle-css'],
		task: function () {
			return gulp.src(path.join(
					config.publicRootDir,
					config.destinationDir,
					config.stylesFileName + '.css'
				))
				.pipe(plugins.csso(!config.useCssStructureMinimization))
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