'use strict';

var path = require('path'),
	task = require('../tasks/compile-named-preprocessor');

module.exports = function (gulp, plugins, config) {
	return {
		dependencies: ['csstime-concat-preprocessor'],
		task: function () {
			return task.run(config.stylesFileName, gulp, plugins, config);
		}
	};
};
