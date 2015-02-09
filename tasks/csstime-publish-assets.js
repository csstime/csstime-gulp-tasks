var config = require('../config.json');

module.exports = function () {
	return gulp.src(config.commonAssetsDir)
		.pipe(gulp.dest(config.destinationDir));
};