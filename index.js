'use strict';

var path = require('path'),
	fs = require('fs'),
	util = require('util'),
	packageConfig = require('./package.json');

var CSSTIME_GULP_TASKS_DIR = path.join(
	'node_modules',
	packageConfig.name,
	'gulp-tasks'
);

module.exports = {

	/**
	 * Loads gulp tasks
	 */
	loadGulpTasks: function (gulp, options) {
		options = options || {};
		var csstime = new CsstimeGulpTask();
		csstime.load(gulp, options);
	}
};

/**
 * Csstime task loader
 * @constructor
 */
function CsstimeGulpTask () {}

/**
 * Loads gulp tasks.
 * @param {Gulp} gulp
 * @param {Object} options
 */
CsstimeGulpTask.prototype.load = function (gulp, options) {
	var config = this.getConfig(options),
		plugins = this.loadPlugins();

	this.loadTasks(gulp, plugins, config);
};

/**
 * Loads gulp plugins.
 * @returns {Object}
 */
CsstimeGulpTask.prototype.loadPlugins = function () {
	var dependencies = packageConfig.dependencies,
		plugins = {};

	Object.keys(dependencies).forEach(function (pluginName) {
		if (!/gulp[\.-].*/.test(pluginName)) {
			return;
		}
		plugins[pluginName.substring(5)] = require(pluginName);
	});

	plugins.notifier = require('node-notifier');
	plugins.del = require('del');
	plugins.postcssProcessors = {
		filters: require('pleeease-filters'),
		opacity: require('postcss-opacity'),
		autoprefixer: require('autoprefixer-core')
	};

	plugins.lib = {};
	plugins.lib.pathHelper = require('./lib/pathHelper');

	return plugins;
};

/**
 * Loads tasks.
 * @param {Gulp} gulp
 * @param {Object} plugins
 * @param {Object} config
 */
CsstimeGulpTask.prototype.loadTasks = function (gulp, plugins, config) {
	function cropExtension(fileName) {
		return fileName.replace(/\.js$/i, '');
	}

	function loadTask(taskName) {
		var taskData = require(path.join(
				process.cwd(),
				CSSTIME_GULP_TASKS_DIR,
				taskName
			))(gulp, plugins, config);

		gulp.task(taskName, taskData.dependencies || [], taskData.task);
	}

	fs.readdirSync(CSSTIME_GULP_TASKS_DIR)
		.map(cropExtension)
		.forEach(loadTask);
};

/**
 * Gets current config.
 * @param {Object} options
 * @returns {Object}
 */
CsstimeGulpTask.prototype.getConfig = function (options) {
	var currentConfig = require('./default.config.json');
	currentConfig.imageminConfig = require('./configs/imagemin.json');
	currentConfig.spritesmithConfig = require('./configs/spritesmith.json');
	currentConfig.postcssConfig = require('./configs/postcss.json');
	currentConfig.csscombConfig = require('./configs/csscomb.json');
	currentConfig = this.mergeConfigs(currentConfig, options);
	return currentConfig;
};

/**
 * Recursively merge configs.
 * @param {Object} currentConfig
 * @param {Object} options
 * @returns {Object}
 */
CsstimeGulpTask.prototype.mergeConfigs = function (currentConfig, options) {
	if (typeof(currentConfig) !== 'object') {
		return options;
	}

	var self = this;

	Object.keys(options)
		.forEach(function (key) {
			if (util.isArray(options[key]) &&
				util.isArray(currentConfig[key])) {
				currentConfig[key] = currentConfig[key].concat(options[key]);
			} else if (typeof(options[key]) === 'object' &&
				typeof(currentConfig[key]) === 'object') {
				currentConfig[key] = self
					.mergeConfigs(currentConfig[key], options[key]);
			} else {
				currentConfig[key] = options[key];
			}
		});

	return currentConfig;
};
