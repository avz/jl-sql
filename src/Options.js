'use strict';

class Options
{
	constructor(sql)
	{
		this.ignoreJsonErrors = false;
		this.sql = sql;
	}
}

module.exports = Options;
