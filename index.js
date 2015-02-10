'use strict';

var gulp = require('gulp'),
	tasksLoader = require('gulp-task-loader');

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
	tasksLoader();
};

module.exports = new CssTime();
