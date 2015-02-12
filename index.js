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
			options.keys().forEach(function (key) {
				if (key in currentConfig) {
					return;
				}
				currentConfig[key] = options[key];
			});
		}

		fs.writeSync(
			path.join('.', CONFIG_FILE_NAME),
			JSON.stringify(currentConfig)
		);

		tasksLoader(
			path.join(
				NODE_MODULES_DIR,
				packageConfig.name,
				GULP_TASKS_DIR
			));
	}
};
