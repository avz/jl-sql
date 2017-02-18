'use strict';

class Options
{
	constructor(sql)
	{
		this.ignoreJsonErrors = false;
		this.verbose = false;
		this.tmpDir = null;
		this.sortOptions = {};
		this.binds = {};

		this.sql = sql;
	}
}

module.exports = Options;
