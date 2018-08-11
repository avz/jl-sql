'use strict';

const iconv = require('iconv-lite');
const Transform = require('stream').Transform;

class Iconv extends Transform
{
	/**
	 *
	 * @param {string} from
	 * @returns {Iconv}
	 */
	constructor(from)
	{
		super();

		this.iconv = new iconv.decodeStream(from);

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
