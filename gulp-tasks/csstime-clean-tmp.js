'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function () {
			return plugins.del([
				plugins.lib.pathHelper.getTemporaryDirectory(config)
			]);
		}
	};
};
