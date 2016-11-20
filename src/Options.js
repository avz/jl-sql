'use strict';

class Options
{
	constructor(sql)
	{
		this.ignoreJsonErrors = false;
		this.verbose = false;
		this.sql = sql;
	}
}

module.exports = Options;
