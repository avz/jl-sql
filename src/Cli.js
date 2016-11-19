'use strict';

const EventEmitter = require('events');
const Getopt = require('node-getopt');
const JlSqlApi = require('jl-sql-api');
const CliError = require('./CliError');
const DataSourceFileResolver = require('./DataSourceFileResolver');

class Cli extends EventEmitter
{
	constructor(argv, stdin, stdout)
	{
		super();

		this.argv = argv;
		this.stdin = stdin;
		this.stdout = stdout;

		this.getopt = new Getopt([
			['h', 'help', 'show this help']
		]);

		this.getopt.setHelp(
			'Usage: jl-sql [OPTIONS] SQL\n'
			+ 'OPTIONS:\n'
			+ '[[OPTIONS]]\n'
			+ '\n'
			+ 'See full documentation at https://github.com/avz/jl-sql\n'
		);

		this.getopt.bindHelp();
		this.getopt.error(this.onArgumentError.bind(this));
	}

	run()
	{
		const options = this.getopt.parse(this.argv.slice(1));

		if (options.options.h) {
			this.throwUsage();
		}

		if (!options.argv.length) {
			this.throwArgumentError('SQL expected');
		}

		if (options.argv.length > 1) {
			this.throwArgumentError('too many arguments');
		}

		const api = new JlSqlApi({
			dataSourceResolvers: [new DataSourceFileResolver]
		});

		let query;

		try {
			query = api.query(options.argv[0]);
		} catch (err) {
			throw new CliError('SQL syntax error: ' + err.message + '\n');
		}

		try {
			/* eslint-disable newline-after-var */
			const select = query
				.fromJsonStream(this.stdin)
				.toJsonStream(this.stdout)
			;
			/* eslint-enable newline-after-var */

			select.on('error', (err) => {
				this.emit('error', err);
			});

		} catch (err) {
			throw new CliError(err.constructor.name + ': ' + err.stack + '\n');
		}
	}

	throwUsage(code = 255)
	{
		this.throwArgumentError(null);
	}

	getUsage()
	{
		return this.getopt.getHelp();
	}

	throwArgumentError(message = null)
	{
		let m = '';

		if (message !== null) {
			m += 'ERROR: ' + message + '\n\n';
		}

		m += this.getUsage();

		throw new CliError(m, 255);
	}

	throwRuntimeError(message)
	{
		throw new CliError(message, 1);
	}

	onArgumentError(err)
	{
		this.throwArgumentError(err.message);
	}
}

module.exports = Cli;
