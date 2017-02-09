'use strict';

const JlTrasformsChain = require('jl-sql-api/src/stream/JlTransformsChain');
const JsonSplitter = require('jl-sql-api/src/stream/JsonSplitter');
const JsonParser = require('jl-sql-api/src/stream/JsonParser');

const JSON_ = (source, options) => {
	return new JlTrasformsChain([
		new JsonSplitter,
		new JsonParser
	]);
};

JSON_.inputType = 'binary';
JSON_.outputType = 'objects';

module.exports = JSON_;
