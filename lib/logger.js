'use strict';

var gutil = require('gulp-util'),
	notifier = require('node-notifier');

var DEFAULT_COLOR = 'gray',
	PLUGIN_NAME = 'csstime';

module.exports = {

	/**
	 * Writes logs
	 * @param {string} text
	 * @param {string} color
	 */
	write: function (text, color) {
		color = color || DEFAULT_COLOR;
		if (!(color in gutil.colors)) {
			color = DEFAULT_COLOR;
		}
		gutil.log(gutil.colors[color](PLUGIN_NAME + ':', text));
	},

	/**
	 * Notifies.
	 * @param {string} message
	 */
	notify: function (message) {
		notifier.notify({
			title: PLUGIN_NAME,
			message: message
		});
	}
};