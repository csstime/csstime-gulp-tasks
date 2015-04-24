'use strict';

var path = require('path'),
	glob = require('glob');

module.exports = {

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

		var mainIndex = -1,
			reg = new RegExp('/' + config.indexComponentName +
				'/' + config.componentAssetsDir + '$');

		directories.every(function (dir, index) {
			if (reg.test(dir)) {
				mainIndex = index;
				return false;
			}
			return true;
		});

		if (mainIndex >= 0) {
			var indexComponentDir = directories.splice(mainIndex, 1);
			directories.unshift(indexComponentDir[0]);
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
				componentsDir,
				'**',
				subDirectoryOrFile ?
					path.join(config.componentAssetsDir, subDirectoryOrFile) :
					config.componentAssetsDir
			);
		});
	},

	/**
	 * Gets static files glob pattern.
	 * @param {Object} config
	 * @param {string} subDirectoryOrFile
	 * @returns {string}
	 */
	getStaticFilesGlobPattern: function (config, subDirectoryOrFile) {
		return path.join(
			subDirectoryOrFile ?
				path.join(config.staticRootDir, subDirectoryOrFile) :
				config.staticRootDir
		);
	},

	/**
	 * Gets assets of components destination directory.
	 * @param {Object} config
	 * @returns {string}
	 */
	getAssetsDestinationDirectory: function (config) {
		return path.join(
			config.destinationDir,
			config.destinationComponentsDir
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