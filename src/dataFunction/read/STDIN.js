'use strict';

const STDIN = function(location, options) {
	return process.stdin;
};

STDIN.outputType = 'binary';

module.exports = STDIN;
