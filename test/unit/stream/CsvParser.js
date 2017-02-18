'use strict';

const assert = require('assert');
const CsvParser = require('../../../src/stream/CsvParser');
const iconv = require('iconv');

describe('CsvParser', () => {
	const transform = (options, input, onEnd) => {
		const chain = new CsvParser(options);

		const s = chain[0];

		for (let i = 0; i < chain.length - 1; i++) {
			chain[i].pipe(chain[i + 1]);
		}

		const e = chain[chain.length - 1];

		const chunks = [];

		e.on('data', (chunk) => {
			chunks.push(chunk);
		});

		e.on('end', () => {
			onEnd(chunks);
		});

		s.end(Buffer.from(input));
	};

	describe('options', () => {
		it('defaults', (done) => {
			transform({}, 'a,b,c\n1,2 ,3\n\n\r\nd, e,привет\n', (rows) => {
				assert.deepStrictEqual(
					rows,
					[[
						{a: '1', b: '2 ', c: '3'},
						{a: '', b: undefined, c: undefined},
						{a: '', b: undefined, c: undefined},
						{a: 'd', b: ' e', c: 'привет'}
					]]
				);

				done();
			});
		});

		it('encoding', (done) => {
			const conv = (string) => {
				const ic = new iconv.Iconv('utf-8', 'cp1251');

				return ic.convert(string);
			};

			transform({encoding: 'cp1251'}, conv('привет,мир\nфу,бар'), (rows) => {
				assert.deepStrictEqual(
					rows,
					[[
						{'привет': 'фу', 'мир': 'бар'}
					]]
				);

				done();
			});
		});
	});
});
