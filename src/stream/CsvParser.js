'use strict';

const Iconv = require('./Iconv');
const CsvStreamParser = require('@avz/csv').StreamParser;

/**
 * @param {object} options
 * @return {Transform[]}
 */
const CsvParser = function(options) {
	const opts = options || {};
	const encoding = opts.encoding;
	const parserOptions = {};

	Object.assign(parserOptions, opts);

	parserOptions.batch = true;

	delete parserOptions.encoding;

	const chain = [new CsvStreamParser(parserOptions)];

	if (encoding) {
		chain.unshift(new Iconv(encoding));
	}

	return chain;
};

module.exports = CsvParser;
