'use strict';

const iconv = require('iconv');
const Transform = require('stream').Transform;

class Iconv extends Transform
{
	constructor(from, to)
	{
		super();

		this.iconv = new iconv.Iconv(from, to);

		this.iconv.on('data', chunk => {
			this.push(chunk);
		});
	}

	_transform(chunk, enc, cb)
	{
		this.iconv.write(chunk);

		cb();
	}

	_flush(cb)
	{
		this.iconv.end();

		cb();
	}
}

module.exports = Iconv;
