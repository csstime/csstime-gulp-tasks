'use strict';

var gulp = require('gulp'),
	path = require('path'),
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

module.exports = new CssTime();
