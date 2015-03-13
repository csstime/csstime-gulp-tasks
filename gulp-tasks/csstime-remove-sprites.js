'use strict';

module.exports = function (cb) {
	var path = require('path'),
		del = require('del'),
		config = require('../config.json');

	del([
		path.join(
			config.publicRootDir,
			config.destinationDir,
			config.componentsDir,
			config.spritesFileName + '.png'
		),
		path.join(
			config.publicRootDir,
			config.temporaryDir,
			config.spritesFileName + '.less'
		)
	], cb);
};