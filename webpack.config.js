'use strict';

module.exports = {
	entry: './src/main-node4.js',
	target: 'node',
	output: {
		path: './transpiled',
		filename: 'main-node4-transpilled.js'
	},
	externals: [
		{
			iconv: 'commonjs iconv'
		}
	],
	module: {
		loaders: [
			{test: /\.json$/, loader: 'json-loader'},
			{test: /\.node$/, loader: 'node-loader'},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /sql\/Parser.js$/,
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};