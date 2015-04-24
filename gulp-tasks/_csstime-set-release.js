'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		task: function (cb) {
			config.isRelease = true;
			cb();
		}
	};
};