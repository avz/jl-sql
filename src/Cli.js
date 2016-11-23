'use strict';

const EventEmitter = require('events');
const Getopt = require('node-getopt');
const CliError = require('./CliError');

const Options = require('./Options');
const Runner = require('./Runner');

class Cli extends EventEmitter
{
	constructor(argv, stdin, stdout, stderr)
	{
		super();

		this.argv = argv;
		this.stdin = stdin;
		this.stdout = stdout;
		this.stderr = stderr;

		this.getopt = new Getopt([
			['h', 'help', 'show this help'],
			['I', 'ignore-json-error', 'ignore broken JSON'],
			['v', 'verbose', 'display additional information'],
			['S', 'sort-external-buffer-size=SIZE', 'use SIZE bytes for `sort` memory buffer'],
			['B', 'sort-in-memory-buffer-length=ROWS', 'save up to ROWS rows for in-memory sort'],
			['T', 'temporary-directory=DIR', 'use DIR for temporaries, not $TMPDIR or /tmp']
		]);

		this.getopt.setHelp(
			'Usage: jl-sql [OPTIONS] SQL\n'
			+ 'OPTIONS:\n'
			+ '[[OPTIONS]]\n'
			+ '\n'
			+ 'See full documentation at https://github.com/avz/jl-sql\n'
		);

		this.getopt.error(this.onArgumentError.bind(this));
	}

	parseOptions()
	{
		const getopt = this.getopt.parse(this.argv.slice(1));

		if (getopt.options.help) {
			this.throwUsage();
		}

		if (!getopt.argv.length) {
			this.throwArgumentError('SQL expected');
		}

		if (getopt.argv.length > 1) {
			this.throwArgumentError('too many arguments');
		}

		const options = new Options(getopt.argv[0]);

		if (getopt.options['ignore-json-error']) {
			options.ignoreJsonErrors = true;
		}

		if (getopt.options.verbose) {
			options.verbose = true;
		}

		if (getopt.options['temporary-directory']) {
			options.tmpDir = getopt.options['temporary-directory'];
		}

		options.sortOptions = {

		};

		if (getopt.options['sort-external-buffer-size']) {
			options.sortOptions.bufferSize = parseInt(getopt.options['sort-external-buffer-size']);
		}

		if (getopt.options['sort-in-memory-buffer-length']) {
			options.sortOptions.inMemoryBufferSize = parseInt(getopt.options['sort-in-memory-buffer-length']);
		} else {
			options.sortOptions.inMemoryBufferSize = 10000;
		}

		return options;
	}

	run()
	{
		const options = this.parseOptions();

		const runner = new Runner(options);

		runner.on('error', (err) => {
			this.emit('error', err);
		});

		runner.on('warning', (warn) => {
			this.emit('warning', warn);
		});

		runner.run(this.stdin, this.stdout, this.stderr);
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
