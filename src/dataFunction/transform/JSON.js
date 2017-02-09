'use strict';

const JsonSplitter = require('jl-sql-api/src/stream/JsonSplitter');
const JsonParser = require('jl-sql-api/src/stream/JsonParser');

const JSON_ = (source, options) => {
	return new [
		new JsonSplitter,
		new JsonParser
	];
};

JSON_.inputType = 'binary';
JSON_.outputType = 'array_of_rows';

module.exports = JSON_;
