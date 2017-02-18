'use strict';

const iconv = require('iconv');
const Transform = require('stream').Transform;

class Iconv extends Transform
{
	/**
	 *
	 * @param {string} from
	 * @param {string} to
	 * @returns {Iconv}
	 */
	constructor(from, to)
	{
		super();

		this.iconv = new iconv.Iconv(from, to);

		this.iconv.on('data', chunk => {
			this.push(chunk);
		});
	}

	/**
	 *
	 * @param {Buffer} chunk
	 * @param {string} enc
	 * @param {Function} cb
	 * @returns {undefined}
	 */
	_transform(chunk, enc, cb)
	{
		this.iconv.write(chunk);

		cb();
	}

	/**
	 *
	 * @param {Function} cb
	 * @returns {undefined}
	 */
	_flush(cb)
	{
		this.iconv.end();

		cb();
	}
}

module.exports = Iconv;
