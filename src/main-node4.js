'use strict';

if (!Buffer.from) {
	Buffer.from = function(a, b, c) {
		if (arguments.length === 1) {
			return new Buffer(a);
		} else if (arguments.length === 2) {
			return new Buffer(a, b);
		} else {
			return new Buffer(a, b, c);
		}
	};
}

if (!Buffer.alloc) {
	Buffer.alloc = function(size) {
		return new Buffer(size);
	};
}

require('../transpiled/main-node4-transpilled.js');
