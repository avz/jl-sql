'use strict';

/* eslint-disable no-process-exit */

const util = require('util');
const Cli = require('./Cli');
const CliError = require('./CliError');
const cli = new Cli(process.argv.slice(1), process.stdin, process.stdout, process.stderr);

cli.on('error', (err) => {
	const message = err.message || err.stack;

	process.stderr.write(message + '\n');
	process.exit(1);
});

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
