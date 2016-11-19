'use strict';

const path = require('path');
const fs = require('fs');
const DataSourceResolver = require('jl-sql-api').DataSourceResolver;

class DataSourceFileResolver extends DataSourceResolver
{
	resolve(location)
	{
		if (location.length !== 1) {
			return null;
		}

		return fs.createReadStream(location[0]);
	}

	extractAlias(location)
	{
		if (location.length !== 1) {
			return null;
		}

		return path.parse(location[0]).name;
	}

}

module.exports = DataSourceFileResolver;
