'use strict';

const Iconv = require('./Iconv');
const CsvStreamParser = require('@avz/csv').StreamParser;

const CsvParser = function(options) {
	const opts = options || {};
	const encoding = opts.encoding;
	const parserOptions = {};

	Object.assign(parserOptions, opts);

	parserOptions.batch = true;

	delete parserOptions.encoding;

	const chain = [new CsvStreamParser(parserOptions)];

	if (encoding) {
		chain.unshift(new Iconv(encoding, 'utf-8'));
	}

	return chain;
};

module.exports = CsvParser;
