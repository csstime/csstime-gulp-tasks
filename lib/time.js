'use strict';

module.exports = {

	/**
	 * Gets current date and time
	 * @returns {string}
	 */
	captureNow: function () {
		var now = new Date(),
			date = now.getFullYear() + '-' +
				(now.getMonth() + 1) + '-' +
				now.getDate(),
			time = now.getHours() + ':' + now.getMinutes();

		return date + ' ' + time;
	}
};