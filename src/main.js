'use strict';

/* eslint-disable no-process-exit */

const util = require('util');
const Cli = require('./Cli');
const CliError = require('./CliError');
var cli;

/**
 *
 * @param {Error} err
 * @returns {undefined}
 */
const errHandler = (err) => {
	const message = err.message || err.stack;

	if (cli && cli.options.verbose) {
		process.stderr.write((err.stack || (err.name + ': ' + message)) + '\n');
	} else {
		process.stderr.write(message + '\n');
	}

	process.exit(1);
};

try {
	cli = new Cli(process.argv.slice(1), process.stdin, process.stdout, process.stderr);
} catch (err) {
	errHandler(err);
}

cli.on('error', errHandler);

cli.on('warning', (err) => {
	process.stderr.write(err.message + '\n');
});

try {
	cli.run();

} catch (err) {
	if (err instanceof CliError) {
		process.stderr.write(err.message);
		process.exit(err.code);
	} else {
		process.stderr.write(util.inspect(err));
		process.exit(254);
	}
}
