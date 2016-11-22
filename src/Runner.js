'use strict';

const util = require('util');
const JlSqlApi = require('../../jl-sql-api');
const EventEmitter = require('events');
const DataSourceFileResolver = require('./DataSourceFileResolver');

class Runner extends EventEmitter
{
	constructor(options)
	{
		super();

		this.options = options;
		this.api = new JlSqlApi({
			dataSourceResolvers: [new DataSourceFileResolver],
			sortOptions: {
				inMemoryBufferSize: 100000
			}
		});
	}

	run(stdin, stdout, stderr)
	{
		try {
			const query = this.api.query(this.options.sql);

			/* eslint-disable newline-after-var */
			const select = query
				.fromJsonStream(stdin)
				.toJsonStream(stdout)
			;
			/* eslint-enable newline-after-var */

			if (this.options.verbose) {
				const explain = this.api.explain(select);
				stderr.write(util.inspect(explain, {depth: 20}) + '\n');
			}

			select.on('error', (err) => {
				this._errorHandler(err);
			});

		} catch (err) {
			this._errorHandler(err);
		}
	}

	_errorHandler(err)
	{
		if (this.options.ignoreJsonErrors && (err instanceof JlSqlApi.exceptions.JsonParsingError)) {
			this.emit('warning', new Error(err.message + ': JSON.parse(' + JSON.stringify(err.json) + ')'));

			return;
		}

		this.emit('error', err);
	}
}

module.exports = Runner;
