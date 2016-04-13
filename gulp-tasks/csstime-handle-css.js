'use strict';

var task = require('../tasks/handle-named-css');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-compile-preprocessor'],
		task: function (cb) {
			return task.run(config.stylesFileName, gulp, plugins, config, cb);
		}
	};
};
