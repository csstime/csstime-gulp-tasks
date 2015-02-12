'use strict';

var gulp = require('gulp'),
	path = require('path'),
	fs = require('fs'),
	currentConfig = require('./default.config.json'),
	packageConfig = require('./package.json'),
	tasksLoader = require('gulp-task-loader');

var NODE_MODULES_DIR = 'node_modules',
	GULP_TASKS_DIR = 'gulp-tasks',
	CONFIG_FILE_NAME = 'config.json';

module.exports = {

	/**
	 * Loads gulp tasks
	 */
	loadGulpTasks: function (options) {
		if (options) {
			Object.keys(options).forEach(function (key) {
				if (!(key in currentConfig)) {
					return;
				}
				currentConfig[key] = options[key];
			});
		}

		fs.writeFileSync(
			path.join(
				process.cwd(),
				NODE_MODULES_DIR,
				packageConfig.name,
				CONFIG_FILE_NAME
			),
			JSON.stringify(currentConfig, null, '\t')
		);

		tasksLoader(
			path.join(
				NODE_MODULES_DIR,
				packageConfig.name,
				GULP_TASKS_DIR
			));
	}
};
