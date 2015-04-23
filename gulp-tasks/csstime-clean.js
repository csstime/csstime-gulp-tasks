'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config) {
	return {
		task: function (cb) {
			plugins.del([
				plugins.lib.components.getDestinationDirectory(config)
			], cb);
		}
	};
};