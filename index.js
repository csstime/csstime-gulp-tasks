'use strict';

var path = require('path'),
	util = require('util'),
	gulpTasksLoader = require('./lib/gulpTasksLoader'),
	packageConfig = require('./package.json');

var CSSTIME_GULP_TASKS_DIR = 'gulp-tasks';

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
	plugins.runSequence = require('run-sequence');
	plugins.mergeStream = require('merge-stream');
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
	gulpTasksLoader.loadAllTasks(gulp,
		path.join(config.packagePath, CSSTIME_GULP_TASKS_DIR), plugins, config);
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
	currentConfig.svstoreConfig = require('./configs/svgstore.json');
	currentConfig = this.mergeConfigs(currentConfig, options);
	currentConfig.packagePath = __dirname;
	currentConfig.preprocessorExt =
		currentConfig.preprocessorsConfig[currentConfig.preprocessor].ext;
	currentConfig.preprocessorOptions =
		currentConfig.preprocessorsConfig[currentConfig.preprocessor].options;
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
			if (currentConfig[key] === null) {
				return;
			}
			if (typeof(options[key]) === 'object' &&
				typeof(currentConfig[key]) === 'object') {
				currentConfig[key] = self
					.mergeConfigs(currentConfig[key], options[key]);
			} else {
				currentConfig[key] = options[key];
			}
		});

	return currentConfig;
};
