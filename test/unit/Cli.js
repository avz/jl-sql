'use strict';

const assert = require('assert');
const Cli = require('../../src/Cli');
const Options = require('../../src/Options');

describe('Cli', () => {
	it('parseBinds()', () => {
		const c = new Cli(['jl-sql', 'SELECT 1']);

		assert.deepStrictEqual(c.parseBinds([':aaa=bbb']), {aaa: 'bbb'});
		assert.deepStrictEqual(c.parseBinds(['::aaa=bbb']), {aaa: ['bbb']});
		assert.deepStrictEqual(c.parseBinds(['::aaa=bbb', '::aaa=ccc']), {aaa: ['bbb', 'ccc']});

		assert.throws(
			() => {
				c.parseBinds(['aaa=bbb']);
			},
			/wrong bind definition: aaa=bbb/
		);

		assert.throws(
			() => {
				c.parseBinds(['::aaa=bbb', ':aaa=ccc']);
			},
			/bind name ::aaa must not be mixed with :aaa/
		);

		assert.throws(
			() => {
				c.parseBinds([':aaa=bbb', '::aaa=ccc']);
			},
			/bind name ::aaa must not be mixed with :aaa/
		);

		assert.throws(
			() => {
				c.parseBinds([':aaa=bbb', ':aaa=ccc']);
			},
			/bind name :aaa redefinition/
		);
	});

	describe('parseOptions()', () => {
		/**
		 *
		 * @param {string[]} args
		 * @param {string} sql
		 * @returns {Options}
		 */
		const parse = (args, sql = 'SELECT 1') => {
			const c = new Cli(['jl-sql'].concat(args).concat([sql]));

			return c.parseOptions();
		};

		it('defaults', () => {
			const o = parse([], 'SELECT 123');

			assert.ok(o instanceof Options);
			assert.strictEqual(o.sql, 'SELECT 123');
			assert.strictEqual(o.ignoreJsonErrors, false);
			assert.strictEqual(o.verbose, false);
			assert.strictEqual(o.tmpDir, null);
			assert.strictEqual(o.sortOptions.bufferSize, undefined);
			assert.strictEqual(o.sortOptions.inMemoryBufferSize, 10000);
			assert.deepStrictEqual(o.binds, {});
		});

		it('help', () => {
			assert.throws(
				() => {
					parse(['--help']);
				},
				/Usage: jl-sql \[OPTIONS\] SQL/
			);
		});

		it('version', () => {
			assert.throws(
				() => {
					parse(['--version']);
				},
				/^Error: jl-sql v/
			);
		});

		it('ignore errors', () => {
			assert.strictEqual(parse(['-I']).ignoreJsonErrors, true);
		});

		it('verbose', () => {
			assert.strictEqual(parse(['-v']).verbose, true);
		});

		it('tmp dir', () => {
			assert.strictEqual(parse(['-T', '/t/m/p']).tmpDir, '/t/m/p');
		});

		it('sort buffer size', () => {
			assert.strictEqual(parse(['-S', '12345']).sortOptions.bufferSize, 12345);
		});

		it('internal sort buffer size', () => {
			assert.strictEqual(parse(['-B', '2345']).sortOptions.inMemoryBufferSize, 2345);
		});

		it('binds', () => {
			assert.deepStrictEqual(parse(['-b', ':cc=qq']).binds, {cc: 'qq'});
		});

		it('not enough args', () => {
			assert.throws(
				() => {
					return new Cli(['jl-sql']);
				},
				/SQL expected/
			);
		});

		it('too many args', () => {
			assert.throws(
				() => {
					return new Cli(['jl-sql', 'a', 'b']);
				},
				/too many arguments/
			);
		});
	});
});
