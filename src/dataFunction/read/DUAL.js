'use strict';

const Readable = require('stream').Readable;

class DUAL extends Readable
{
	constructor(location, options)
	{
		super({objectMode: true});

		this.rows = options.rows || [{}];
	}

	_read()
	{
		this.push(this.rows);
		this.push(null);
	}
}

DUAL.outputType = 'array_of_rows';

module.exports = DUAL;
