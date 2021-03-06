'use strict';

const JsonSplitter = require('jl-sql-api/src/stream/JsonSplitter');
const JsonParser = require('jl-sql-api/src/stream/JsonParser');

/**
 * @param {DataSource} source
 * @param {object|null} options
 * @returns {Transform[]}
 */
const JSON_ = (source, options) => {
	return [
		new JsonSplitter,
		new JsonParser
	];
};

JSON_.inputType = 'binary';
JSON_.outputType = 'array_of_rows';

module.exports = JSON_;
