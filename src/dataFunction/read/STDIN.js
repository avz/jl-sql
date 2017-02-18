'use strict';

/**
 * @param {string[]} location
 * @param {object|null} options
 * @returns {Readable}
 */
const STDIN = function(location, options) {
	return process.stdin;
};

STDIN.outputType = 'binary';

module.exports = STDIN;
