'use strict';

const fs = require('fs');

/**
 * @param {string[]} location
 * @param {object|null} options
 * @returns {Readable}
 */
const STDIN = function(location, options) {
	if (!location || location.length !== 1) {
		throw new Error('Invalid FILE path');
	}

	return fs.createReadStream(location[0]);
};

STDIN.outputType = 'binary';

module.exports = STDIN;
