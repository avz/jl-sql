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

		this.binds = options.binds || {};

		const combinedOptions = JSON.parse(JSON.stringify(options));

		delete combinedOptions.binds;

		combinedOptions.dataSourceResolvers = [new DataSourceFileResolver];
		if (!combinedOptions.sortOptions) {
			combinedOptions.sortOptions = {};
		}

		this.options = combinedOptions;

		this.api = new JlSqlApi({
			sortOptions: combinedOptions.sortOptions,
			tmpDir: combinedOptions.tmpDir,
			dataSourceResolvers: combinedOptions.dataSourceResolvers
		});
	}

	run(stdin, stdout, stderr)
	{
		try {
			const query = this.api.query(this.options.sql);

			for (const bindName in this.binds) {
				const bindValue = this.binds[bindName];

				if (bindValue instanceof Array) {
					query.bind('::' + bindName, bindValue);
				} else {
					query.bind(':' + bindName, bindValue);
				}
			}

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
