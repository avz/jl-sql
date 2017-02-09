'use strict';

const fs = require('fs');

const STDIN = function(location, options) {
	if (!location || location.length !== 1) {
		throw new Error('Invalid FILE path');
	}

	return fs.createReadStream(location[0]);
};

STDIN.outputType = 'binary';

module.exports = STDIN;
