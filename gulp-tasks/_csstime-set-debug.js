'use strict';

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			config.isDebug = true;
		}
	};
};