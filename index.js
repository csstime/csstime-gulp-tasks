'use strict';

var gulp = require('gulp'),
	path = require('path'),
	fs = require('fs'),
	config = require('./config.json'),
	packageConfig = require('./package.json'),
	tasksLoader = require('gulp-task-loader');

var NODE_MODULES_DIR = 'node_modules',
	GULP_TASKS_DIR = 'gulp-tasks';

/**
 * Csstime
 * @constructor
 */
function CssTime () {

}

/**
 * Loads gulp tasks
 */
CssTime.prototype.loadGulpTasks = function () {
	tasksLoader(
		path.join(
			NODE_MODULES_DIR,
			packageConfig.name,
			GULP_TASKS_DIR
		));
};

/**
 * Gets components names
 */
CssTime.prototype.getPublishedComponents = function () {
	var publishedComponentsDir = path.join(
				process.cwd(),
				config.publicRootDir,
				config.componentsDir
			);

	if (!fs.existsSync(publishedComponentsDir)) {
		return [];
	}

	var	directories = fs.readdirSync(publishedComponentsDir)
			.filter(function (file) {
				return fs.statSync(path.join(publishedComponentsDir, file)).isDirectory();
			});

	var mainIndex = directories.indexOf(config.indexComponentName);
	if (mainIndex === -1) {
		return directories;
	}
	directories.splice(mainIndex, 1);
	directories.unshift(config.indexComponentName);

	return directories;
};

module.exports = new CssTime();
