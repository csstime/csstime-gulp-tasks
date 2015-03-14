'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			return gulp.src(path.join(config.staticRootDir, '**'))
				.pipe(gulp.dest(path.join(
					config.publicRootDir,
					config.destinationDir
				)));
		}
	};
};