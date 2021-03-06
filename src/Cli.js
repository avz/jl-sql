'use strict';

const EventEmitter = require('events');
const Getopt = require('node-getopt/lib/getopt.js');
const CliError = require('./CliError');

const Options = require('./Options');
const Runner = require('./Runner');

class Cli extends EventEmitter
{
	/**
	 *
	 * @param {string[]} argv
	 * @param {Readable} stdin
	 * @param {Writable} stdout
	 * @param {Writable} stderr
	 * @returns {Cli}
	 */
	constructor(argv, stdin, stdout, stderr)
	{
		super();

		this.options = new Options(argv[0]);
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
			['T', 'temporary-directory=DIR', 'use DIR for temporaries, not $TMPDIR or /tmp'],
			['b', 'bind=BIND=VALUE+', 'bind valiable'],
			['', 'version', 'show version information']
		]);

		this.getopt.setHelp(
			'Usage: jl-sql [OPTIONS] SQL\n'
			+ 'OPTIONS:\n'
			+ '[[OPTIONS]]\n'
			+ '\n'
			+ 'Version: ' + this.versionString() + '\n\n'
			+ 'See full documentation at https://github.com/avz/jl-sql\n'
		);

		this.getopt.error(this.onArgumentError.bind(this));

		this.options = this.parseOptions();
	}

	/**
	 * @private
	 * @returns {Options}
	 */
	parseOptions()
	{
		const getopt = this.getopt.parse(this.argv.slice(1));

		if (getopt.options.help) {
			this.throwUsage();
		}

		if (getopt.options.version) {
			this.throwVersion();
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
			options.sortOptions.bufferSize = parseInt(getopt.options['sort-external-buffer-size'], 0);
		}

		if (getopt.options['sort-in-memory-buffer-length']) {
			options.sortOptions.inMemoryBufferSize = parseInt(getopt.options['sort-in-memory-buffer-length'], 0);
		} else {
			options.sortOptions.inMemoryBufferSize = 10000;
		}

		if (getopt.options.bind) {
			options.binds = this.parseBinds(getopt.options.bind);
		}

		return options;
	}

	/**
	 *
	 * @param {string[]} binds
	 * @returns {object}
	 */
	parseBinds(binds)
	{
		const map = {};

		for (const def of binds) {
			const m = def.match(/^(::?)(.*?)=(.*)$/);

			if (!m) {
				this.throwArgumentError('wrong bind definition: ' + def);
			}

			const name = m[2];
			const value = m[3];
			const isArray = m[1] === '::';

			if (isArray) {
				if (name in map) {
					if (!(map[name] instanceof Array)) {
						this.throwArgumentError('bind name ::' + name + ' must not be mixed with :' + name);
					}

					map[name].push(value);
				} else {
					map[name] = [value];
				}
			} else {
				if (name in map) {
					if (map[name] instanceof Array) {
						this.throwArgumentError('bind name ::' + name + ' must not be mixed with :' + name);
					}

					this.throwArgumentError('bind name :' + name + ' redefinition');
				}

				map[name] = value;
			}
		}

		return map;
	}

	/**
	 *
	 * @returns {undefined}
	 */
	run()
	{
		const runner = new Runner(this.options);

		runner.on('error', (err) => {
			this.emit('error', err);
		});

		runner.on('warning', (warn) => {
			this.emit('warning', warn);
		});

		runner.run(this.stdin, this.stdout, this.stderr);
	}

	/**
	 *
	 * @param {number} code
	 * @returns {undefined}
	 */
	throwUsage(code = 255)
	{
		this.throwArgumentError(null);
	}

	/**
	 *
	 * @returns {string}
	 */
	versionString()
	{
		const myVersion = require('../package').version;
		const apiVersion = require('jl-sql-api').version || 'X.X.X';

		return 'jl-sql v' + myVersion + ' (jl-sql-api v' + apiVersion + ')';
	}

	/**
	 *
	 * @returns {undefined}
	 */
	throwVersion()
	{
		throw new CliError(this.versionString(), 0);
	}

	/**
	 *
	 * @returns {string}
	 */
	getUsage()
	{
		return this.getopt.getHelp().replace(/\s+$/, '');
	}

	/**
	 *
	 * @param {string} message
	 * @returns {undefined}
	 */
	throwArgumentError(message = null)
	{
		let m = '';

		if (message !== null) {
			m += 'ERROR: ' + message + '\n\n';
		}

		m += this.getUsage();

		throw new CliError(m, 255);
	}

	/**
	 *
	 * @param {string} message
	 * @returns {undefined}
	 */
	throwRuntimeError(message)
	{
		throw new CliError(message, 1);
	}

	/**
	 *
	 * @param {string} err
	 * @returns {undefined}
	 */
	onArgumentError(err)
	{
		this.throwArgumentError(err.message);
	}
}

module.exports = Cli;
