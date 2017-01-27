'use strict';

if (!Buffer.from) {
	Buffer.from = function(...args) {
		return new Buffer(...args);
	};
}

if (!Buffer.alloc) {
	Buffer.alloc = function(size) {
		return new Buffer(size);
	};
}

require('./main.js');
