'use strict';

const CsvParser = require('../../stream/CsvParser');

const CSV = (source, options) => {
	return new CsvParser(options);
};

CSV.inputType = 'binary';
CSV.outputType = 'objects';

module.exports = CSV;
