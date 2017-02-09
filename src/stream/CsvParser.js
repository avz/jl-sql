'use strict';

const ChunkJoiner = require('jl-sql-api/src/stream/ChunkJoiner');
const Iconv = require('./Iconv');

const csvParse = require('csv-parse');

const CsvParser = function(options) {
	const optionsMapping = {
		detectTypes: 'auto_parse',
		detectDates: 'auto_parse_date',
		columns: 'columns',
		delimiter: 'delimiter',
		escape: 'escape',
		ltrim: 'ltrim',
		rtrim: 'rtrim',
		skipEmptyLines: 'skip_empty_lines',
		from: 'from',
		encoding: null
	};

	const opts = options || {};
	const csvParseOptions = {};

	for (const name in opts) {
		if (!(name in optionsMapping)) {
			throw new Error('Unknown CSV() option: ' + name);
		}

		if (optionsMapping[name]) {
			csvParseOptions[optionsMapping[name]] = opts[name];
		}
	}

	if (!('columns' in csvParseOptions)) {
		csvParseOptions.columns = true;
	}

	const chain = [csvParse(csvParseOptions), new ChunkJoiner];

	if (opts.encoding) {
		chain.unshift(new Iconv(opts.encoding, 'utf-8'));
	}

	return chain;
};

module.exports = CsvParser;
