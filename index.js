'use strict';

var gulp = require('gulp'),
	taskLoader = require('gulp-task-loader');

/**
 * Csstime tasks loader
 * @constructor
 */
function CssTimeTasksLoader () {

}

/**
 * Loads tasks
 */
CssTimeTasksLoader.prototype.load = function () {
	taskLoader('./tasks');
};

module.export = new CssTimeTasksLoader();
