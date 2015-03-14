'use strict';

var path = require('path'),
	fs = require('fs');

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
	}
};