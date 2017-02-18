'use strict';

const Readable = require('stream').Readable;

class DUAL extends Readable
{
	/**
	 *
	 * @param {string} location
	 * @param {object|null} options
	 * @returns {DUAL}
	 */
	constructor(location, options)
	{
		super({objectMode: true});

		this.rows = options.rows || [{}];
	}

	/**
	 *
	 * @returns {undefined}
	 */
	_read()
	{
		this.push(this.rows);
		this.push(null);
	}
}

DUAL.outputType = 'array_of_rows';

module.exports = DUAL;
