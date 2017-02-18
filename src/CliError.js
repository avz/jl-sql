'use strict';

class CliError extends Error
{
	/**
	 *
	 * @param {string} message
	 * @param {number} code
	 * @returns {CliError}
	 */
	constructor(message, code = 254)
	{
		super(message);
		this.code = code;
	}
}

module.exports = CliError;
