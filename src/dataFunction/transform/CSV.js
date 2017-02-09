'use strict';

const CsvParser = require('../../stream/CsvParser');

const CSV = (source, options) => {
	return new CsvParser(options);
};

CSV.inputType = 'binary';
CSV.outputType = 'array_of_rows';

module.exports = CSV;
