'use strict';

var path = require('path'),
	fs = require('fs'),
	glob = require('glob');

module.exports = {

	/**
	 * Gets components names
	 * @param {Object} config
	 */
	getNames: function (config) {
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
				return fs.statSync(path.join(publishedComponentsDir, file))
					.isDirectory();
			});

		var mainIndex = directories.indexOf(config.indexComponentName);
		if (mainIndex === -1) {
			return directories;
		}
		directories.splice(mainIndex, 1);
		directories.unshift(config.indexComponentName);

		return directories;
	},

	/**
	 * Gets assets directories.
	 * @param {Object} config
	 * @returns {Array<string>}
	 */
	getAssetsDirectories: function (config) {
		var globPatterns = module.exports.getAssetsGlobPatterns(config, null),
			directories = [];

		globPatterns.forEach(function (globPattern) {
			directories = directories.concat(glob.sync(globPattern));
		});

		var mainIndex = directories.indexOf('/' +
			path.join(config.indexComponentName, config.componentAssetsDir));

		if (mainIndex >= 0) {
			var indexComponentDir = directories.splice(mainIndex, 1);
			directories.unshift(indexComponentDir);
		}

		return directories;
	},

	/**
	 * Gets patterns for glob.
	 * @param {Object} config
	 * @param {string|null} subDirectoryOrFile
	 * @returns {Array<string>}
	 */
	getAssetsGlobPatterns: function (config, subDirectoryOrFile) {
		var componentsDirs = config.componentsRootDirs || [];
		return componentsDirs.map(function (componentsDir) {
			return path.join(
				process.cwd(),
				componentsDir,
				'**',
				subDirectoryOrFile ?
					path.join(config.componentAssetsDir, subDirectoryOrFile) :
					config.componentAssetsDir
			);
		});
	},

	/**
	 * Gets assets of components destination directory.
	 * @param {Object} config
	 * @returns {string}
	 */
	getAssetsDestinationDirectory: function (config) {
		return path.join(
			config.destinationDir,
			config.componentsDir
		);
	},

	/**
	 * Gets destination directory.
	 * @param {Object} config
	 * @returns {string}
	 */
	getDestinationDirectory: function (config) {
		return path.join(
			config.destinationDir
		);
	},

	/**
	 * Gets temporary directory.
	 * @param {Object} config
	 * @returns {string}
	 */
	getTemporaryDirectory: function (config) {
		return path.join(
			config.destinationDir,
			config.temporaryDir
		);
	}
};