'use strict';

const CsvParser = require('../../stream/CsvParser');
/**
 * @param {DataSource} source
 * @param {object|null} options
 * @returns {CsvParser}
 */
const CSV = (source, options) => {
	return new CsvParser(options);
};

CSV.inputType = 'binary';
CSV.outputType = 'array_of_rows';

module.exports = CSV;
