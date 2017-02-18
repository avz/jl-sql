'use strict';

const path = require('path');
const fs = require('fs');
const DataSourceResolver = require('jl-sql-api').DataSourceResolver;

class DataSourceFileResolver extends DataSourceResolver
{
	/**
	 * @param {string} location
	 * @returns {Readable|null}
	 */
	resolve(location)
	{
		if (location.length !== 1) {
			return null;
		}

		return fs.createReadStream(location[0]);
	}

	/**
	 *
	 * @param {string[]} location
	 * @returns {string|null}
	 */
	extractAlias(location)
	{
		if (location.length !== 1) {
			return null;
		}

		return path.parse(location[0]).name;
	}

}

module.exports = DataSourceFileResolver;
