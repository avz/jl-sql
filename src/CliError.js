'use strict';

class CliError extends Error
{
	constructor(message, code = 254)
	{
		super(message);
		this.code = code;
	}
}

module.exports = CliError;
