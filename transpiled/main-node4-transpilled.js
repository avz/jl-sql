(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = require("regenerator-runtime");

},{"regenerator-runtime":162}],2:[function(require,module,exports){
'use strict';

module.exports = require('./src/PublicApi');

},{"./src/PublicApi":38}],3:[function(require,module,exports){
module.exports={
  "_args": [
    [
      {
        "raw": "jl-sql-api@^2.6.0",
        "scope": null,
        "escapedName": "jl-sql-api",
        "name": "jl-sql-api",
        "rawSpec": "^2.6.0",
        "spec": ">=2.6.0 <3.0.0",
        "type": "range"
      },
      "/Users/avz/my/jl-sql"
    ]
  ],
  "_from": "jl-sql-api@>=2.6.0 <3.0.0",
  "_id": "jl-sql-api@2.6.0",
  "_inCache": true,
  "_location": "/jl-sql-api",
  "_nodeVersion": "7.2.1",
  "_npmOperationalInternal": {
    "host": "packages-12-west.internal.npmjs.com",
    "tmp": "tmp/jl-sql-api-2.6.0.tgz_1485510421386_0.5406853349413723"
  },
  "_npmUser": {
    "name": "avz",
    "email": "avz@nologin.ru"
  },
  "_npmVersion": "3.10.9",
  "_phantomChildren": {},
  "_requested": {
    "raw": "jl-sql-api@^2.6.0",
    "scope": null,
    "escapedName": "jl-sql-api",
    "name": "jl-sql-api",
    "rawSpec": "^2.6.0",
    "spec": ">=2.6.0 <3.0.0",
    "type": "range"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/jl-sql-api/-/jl-sql-api-2.6.0.tgz",
  "_shasum": "d58fc10e1d3d5321ece39ef00011ae355b686d0f",
  "_shrinkwrap": null,
  "_spec": "jl-sql-api@^2.6.0",
  "_where": "/Users/avz/my/jl-sql",
  "author": {
    "name": "avz@nologin.ru"
  },
  "bugs": {
    "url": "https://github.com/avz/node-jl-sql-api/issues"
  },
  "contributors": [],
  "dependencies": {},
  "description": "SQL stream manipulating for JS",
  "devDependencies": {
    "eslint": "^3.10.2",
    "eslint-plugin-mocha": "^4.7.0",
    "istanbul": "^0.4.5",
    "jison": "^0.4.17",
    "mocha": "^3.1.2"
  },
  "directories": {},
  "dist": {
    "shasum": "d58fc10e1d3d5321ece39ef00011ae355b686d0f",
    "tarball": "https://registry.npmjs.org/jl-sql-api/-/jl-sql-api-2.6.0.tgz"
  },
  "engines": {
    "node": ">=6"
  },
  "gitHead": "f9d28fa6880673bf877540814737f9ebb41b0350",
  "homepage": "https://github.com/avz/node-jl-sql-api#readme",
  "keywords": [
    "sql",
    "stream"
  ],
  "license": "MIT",
  "main": "main.js",
  "maintainers": [
    {
      "name": "avz",
      "email": "avz@nologin.ru"
    }
  ],
  "name": "jl-sql-api",
  "optionalDependencies": {},
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/avz/node-jl-sql-api.git"
  },
  "scripts": {
    "coverage": "istanbul cover --report html _mocha -- --recursive",
    "test": "eslint . && mocha --recursive"
  },
  "tonicExampleFilename": "./examples/join.js",
  "version": "2.6.0"
}

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasicColumn = require('./BasicColumn');
var AggregationColumn = require('./AggregationColumn');
var AggregationExpression = require('./AggregationExpression');
var PropertiesPicker = require('./PropertiesPicker');
var AggregationCallRuntime = require('./AggregationCallRuntime');
var DataRow = require('./DataRow');
var AsyncUtils = require('./AsyncUtils');

var Aggregation = function () {
	/**
  *
  * @param {PreparingContext} preparingContext
  * @param {RuntimeContext} runtimeContext
  * @param {Node} expressions
  * @returns {Aggregation}
  */
	function Aggregation(preparingContext, runtimeContext, expressions) {
		_classCallCheck(this, Aggregation);

		this.runtimeContext = runtimeContext;
		this.expressions = expressions;
		this.lastRow = null;

		this.aggregationCallRuntimes = [];

		var aggregations = this.runtimeContext[this.runtimeContext.aggregationsPropertyName];

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this.expressions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var expression = _step.value;

				if (!(expression instanceof AggregationExpression)) {
					continue;
				}

				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = expression.aggregationCalls[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var ac = _step3.value;

						var state = new AggregationCallRuntime(preparingContext, runtimeContext, ac);

						this.aggregationCallRuntimes.push(state);

						aggregations[ac.node.id] = state.result.bind(state);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		var basicResultSetsMap = new Map();
		var aggregationResultSetsMap = new Map();

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = this.expressions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _expression = _step2.value;

				if (_expression instanceof AggregationColumn) {
					aggregationResultSetsMap.set(_expression.alias, _expression.result);
				} else if (_expression instanceof BasicColumn) {
					basicResultSetsMap.set(_expression.alias, _expression.valueSource());
				}
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		this.basicPropertiesPicker = new PropertiesPicker(basicResultSetsMap);
		this.aggregationPropertiesPicker = new PropertiesPicker(aggregationResultSetsMap);
	}

	_createClass(Aggregation, [{
		key: 'init',
		value: function init() {
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = this.aggregationCallRuntimes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var call = _step4.value;

					call.instance.init();
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		}

		/**
   * @param {DataRow} row
   * @param {Function} cb
   * @returns {undefined}
   */

	}, {
		key: 'update',
		value: function update(row, cb) {
			AsyncUtils.eachSeriesHalfSync(this.aggregationCallRuntimes, function (call, done) {
				call.update(row, done);
			}, cb);

			this.lastRow = row;
		}

		/**
   * @param {Function} cb
   * @returns {undefined}
   */

	}, {
		key: 'result',
		value: function result(cb) {
			var _this = this;

			var row = new DataRow(null);

			row.sources = this.basicPropertiesPicker.sliceProperties(this.lastRow);

			AsyncUtils.eachSeriesHalfSync(this.aggregationCallRuntimes, function (call, done) {
				call.result(function (result) {
					row[DataRow.AGGREGATION_CACHE_PROPERTY][call.call.node.id] = result;
					done();
				});
			}, function () {
				_this.aggregationPropertiesPicker.mergeProperties(row, row.sources);

				cb(row);
			});
		}
	}, {
		key: 'deinit',
		value: function deinit() {
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = this.aggregationCallRuntimes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var call = _step5.value;

					call.instance.deinit();
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			this.lastRow = null;
		}
	}]);

	return Aggregation;
}();

module.exports = Aggregation;

},{"./AggregationCallRuntime":6,"./AggregationColumn":7,"./AggregationExpression":8,"./AsyncUtils":12,"./BasicColumn":13,"./DataRow":20,"./PropertiesPicker":37}],5:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AggregationCall =
/**
 *
 * @param {SqlToJs} sqlToJs
 * @param {Node} node
 * @param {AggregationFunction} func
 * @returns {AggregationCall}
 */
function AggregationCall(sqlToJs, node, func) {
	_classCallCheck(this, AggregationCall);

	this.node = node;
	this.func = func;
	this.args = node.args.values.map(sqlToJs.nodeToFunction.bind(sqlToJs));
};

module.exports = AggregationCall;

},{}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AggregationCallRuntime = function () {
	/**
  *
  * @param {PreparingContext} preparingContext
  * @param {RuntimeContext} runtimeContext
  * @param {AggregationCall} aggregationCall
  * @returns {AggregationCallRuntime}
  */
	function AggregationCallRuntime(preparingContext, runtimeContext, aggregationCall) {
		_classCallCheck(this, AggregationCallRuntime);

		this.call = aggregationCall;
		this.instance = new aggregationCall.func(preparingContext, runtimeContext);
	}

	_createClass(AggregationCallRuntime, [{
		key: 'update',
		value: function update(row, done) {
			if (this.instance.updateAsync) {
				this.instance.updateAsync(this.call.args.map(function (cb) {
					return cb(row);
				}), done);
			} else {
				this.instance.updateSync(this.call.args.map(function (cb) {
					return cb(row);
				}));
				done();
			}
		}
	}, {
		key: 'result',
		value: function result(done) {
			if (this.instance.resultAsync) {
				this.instance.resultAsync(done);
			} else {
				done(this.instance.resultSync());
			}
		}
	}]);

	return AggregationCallRuntime;
}();

module.exports = AggregationCallRuntime;

},{}],7:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationExpression = require('./AggregationExpression');

var AggregationColumn = function (_AggregationExpressio) {
	_inherits(AggregationColumn, _AggregationExpressio);

	/**
  * @param {PreparingContext} preparingContext
  * @param {string[]} alias
  * @param {Node} expression
  * @returns {AggregationColumn}
  */
	function AggregationColumn(preparingContext, alias, expression) {
		_classCallCheck(this, AggregationColumn);

		var _this = _possibleConstructorReturn(this, (AggregationColumn.__proto__ || Object.getPrototypeOf(AggregationColumn)).call(this, preparingContext, expression));

		_this.alias = alias;
		return _this;
	}

	return AggregationColumn;
}(AggregationExpression);

module.exports = AggregationColumn;

},{"./AggregationExpression":8}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SqlNodes = require('./sql/Nodes');
var BasicExpression = require('./BasicExpression');
var AggregationFunction = require('./AggregationFunction');
var AggregationCall = require('./AggregationCall');
var SqlLogicError = require('./error/SqlLogicError');
var ExpressionAnalyser = require('./ExpressionAnalyser');

var AggregationExpression = function (_BasicExpression) {
	_inherits(AggregationExpression, _BasicExpression);

	/**
  *
  * @param {PreparingContext} preparingContext
  * @param {Node} expression
  * @returns {AggregationExpression}
  */
	function AggregationExpression(preparingContext, expression) {
		_classCallCheck(this, AggregationExpression);

		var _this = _possibleConstructorReturn(this, (AggregationExpression.__proto__ || Object.getPrototypeOf(AggregationExpression)).call(this, preparingContext, expression));

		_this.expressionAnalyser = new ExpressionAnalyser(preparingContext);
		_this.aggregationCalls = _this.createAggregationCalls();

		_this.result = preparingContext.sqlToJs.nodeToFunction(expression);
		return _this;
	}

	/**
  *
  * @returns {AggregationCall[]}
  */


	_createClass(AggregationExpression, [{
		key: 'createAggregationCalls',
		value: function createAggregationCalls() {
			var calls = [];
			var sqlToJs = this.preparingContext.sqlToJs;

			var nodes = this.expression.childNodesRecursive().concat([this.expression]);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var node = _step.value;

					if (!(node instanceof SqlNodes.Call)) {
						continue;
					}

					var func = this.preparingContext.functionsMap.need(node.function.getFragments());

					if (!(func.prototype instanceof AggregationFunction)) {
						continue;
					}

					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = node.args.values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var arg = _step2.value;

							if (this.expressionAnalyser.isAggregationExpression(arg)) {
								throw new SqlLogicError('Nested aggregation function is not alowed');
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					calls.push(new AggregationCall(sqlToJs, node, func));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return calls;
		}
	}, {
		key: 'valueSource',
		value: function valueSource() {
			throw new SqlLogicError('Not allowed for aggregation columns');
		}
	}]);

	return AggregationExpression;
}(BasicExpression);

module.exports = AggregationExpression;

},{"./AggregationCall":5,"./AggregationFunction":9,"./BasicExpression":14,"./ExpressionAnalyser":29,"./error/SqlLogicError":62,"./sql/Nodes":72}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImplementationRequired = require('./error/ImplementationRequired');

var AggregationFunction = function () {
	/**
  * Run once during SQL query parsing
  * @param {PreparingContext} preparingContext
  * @param {RuntimeContext} runtimeContext
  * @returns {AggregationFunctionSync}
  */
	function AggregationFunction(preparingContext, runtimeContext) {
		_classCallCheck(this, AggregationFunction);

		this.preparingContext = preparingContext;
		this.runtimeContext = runtimeContext;
	}

	/**
  * Run once per each group
  * @returns {undefined}
  */


	_createClass(AggregationFunction, [{
		key: 'init',
		value: function init() {
			throw new ImplementationRequired();
		}

		/**
   * Run once per each group
   * @returns {any}
   */

	}, {
		key: 'deinit',
		value: function deinit() {
			throw new ImplementationRequired();
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			throw new ImplementationRequired();
		}
	}]);

	return AggregationFunction;
}();

module.exports = AggregationFunction;

},{"./error/ImplementationRequired":54}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationFunction = require('./AggregationFunction');
var ImplementationRequired = require('./error/ImplementationRequired');

var AggregationFunctionAsync = function (_AggregationFunction) {
	_inherits(AggregationFunctionAsync, _AggregationFunction);

	function AggregationFunctionAsync() {
		_classCallCheck(this, AggregationFunctionAsync);

		return _possibleConstructorReturn(this, (AggregationFunctionAsync.__proto__ || Object.getPrototypeOf(AggregationFunctionAsync)).apply(this, arguments));
	}

	_createClass(AggregationFunctionAsync, [{
		key: 'updateAsync',

		/**
   * Run once per each row
   * @param {Array} args
   * @returns {undefined}
   */
		value: function updateAsync(args) {
			throw new ImplementationRequired();
		}

		/**
   * Get current result. Can be call multiple times per group
   * @param {Function} cb
   * @returns {any}
   */

	}, {
		key: 'result',
		value: function result(cb) {
			throw new ImplementationRequired();
		}
	}]);

	return AggregationFunctionAsync;
}(AggregationFunction);

module.exports = AggregationFunctionAsync;

},{"./AggregationFunction":9,"./error/ImplementationRequired":54}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationFunction = require('./AggregationFunction');
var ImplementationRequired = require('./error/ImplementationRequired');

var AggregationFunctionSync = function (_AggregationFunction) {
	_inherits(AggregationFunctionSync, _AggregationFunction);

	function AggregationFunctionSync() {
		_classCallCheck(this, AggregationFunctionSync);

		return _possibleConstructorReturn(this, (AggregationFunctionSync.__proto__ || Object.getPrototypeOf(AggregationFunctionSync)).apply(this, arguments));
	}

	_createClass(AggregationFunctionSync, [{
		key: 'updateSync',

		/**
   * Run once per each row
   * @param {Array} args
   * @returns {undefined}
   */
		value: function updateSync(args) {
			throw new ImplementationRequired();
		}

		/**
   * Get current result. Can be call multiple times per group
   * @returns {any}
   */

	}, {
		key: 'resultSync',
		value: function resultSync() {
			throw new ImplementationRequired();
		}
	}]);

	return AggregationFunctionSync;
}(AggregationFunction);

module.exports = AggregationFunctionSync;

},{"./AggregationFunction":9,"./error/ImplementationRequired":54}],12:[function(require,module,exports){
'use strict';

/**
 * Выполняет eachCb(item, nextCb) для каждого элемента массива array.
 * Если nextCb() был вызван синхронно, то следующий элемент будет обработан
 * синхронно сразу после окончания выполнения коллбека.
 *
 * @param {Array} array
 * @param {Function} eachCb
 * @param {Function} endCb
 * @param {Object} options
 * @returns {undefined}
 */

exports.eachSeriesHalfSync = function (array, eachCb) {
	var endCb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	var cbWasCalled = false;
	var asyncExpected = false;
	var offset = 0;

	/* eslint-disable no-use-before-define */
	// eslint ругается на использование next перед инициализацией
	var nextCb = function nextCb() {
		cbWasCalled = true;

		if (asyncExpected) {
			next();
		}
	};
	/* eslint-enable no-use-before-define */

	var next = function next() {
		while (offset < array.length) {
			var elt = array[offset];

			offset++;

			cbWasCalled = false;
			asyncExpected = false;

			eachCb(elt, nextCb);

			if (!cbWasCalled) {
				asyncExpected = true;

				// callback is async, waiting for nextCb() call

				return;
			}
		}

		if (endCb) {
			endCb();
		}
	};

	next();
};

},{}],13:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicExpression = require('./BasicExpression');

var BasicColumn = function (_BasicExpression) {
	_inherits(BasicColumn, _BasicExpression);

	/**
  *
  * @param {PreparingContext} preparingContext
  * @param {string[]} alias
  * @param {Node} expression
  * @returns {BasicColumn}
  */
	function BasicColumn(preparingContext, alias, expression) {
		_classCallCheck(this, BasicColumn);

		var _this = _possibleConstructorReturn(this, (BasicColumn.__proto__ || Object.getPrototypeOf(BasicColumn)).call(this, preparingContext, expression));

		_this.alias = alias;
		return _this;
	}

	return BasicColumn;
}(BasicExpression);

module.exports = BasicColumn;

},{"./BasicExpression":14}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SqlNodes = require('./sql/Nodes');
var DataRow = require('./DataRow');

var BasicExpression = function () {
	/**
  *
  * @param {PreparingContext} preparingContext
  * @param {Node} expression
  * @returns {BasicExpression}
  */
	function BasicExpression(preparingContext, expression) {
		_classCallCheck(this, BasicExpression);

		/**
   * @type PreparingContext
   */
		this.preparingContext = preparingContext;

		/**
   * @type Node
   */
		this.expression = expression;
	}

	/**
  *
  * @returns {Function|string[]}
  */


	_createClass(BasicExpression, [{
		key: 'valueSource',
		value: function valueSource() {
			if (this.expression instanceof SqlNodes.ColumnIdent) {
				/*
     * оптимизированный вариант для случая, когда значение просто
     * берётся из свойства без всякой обработки
     */
				var path = this.expression.getFragments().slice();

				path.unshift(DataRow.SOURCES_PROPERTY);

				return path;
			}

			return this.preparingContext.sqlToJs.nodeToFunction(this.expression);
		}
	}]);

	return BasicExpression;
}();

module.exports = BasicExpression;

},{"./DataRow":20,"./sql/Nodes":72}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImplementationRequired = require('./error/ImplementationRequired');
var SqlFunctionArgumentError = require('./error/SqlFunctionArgumentError');

var BasicFunction = function () {
	function BasicFunction() {
		_classCallCheck(this, BasicFunction);
	}

	_createClass(BasicFunction, [{
		key: 'call',
		value: function call(args) {
			throw new ImplementationRequired();
		}
	}, {
		key: 'argumentException',
		value: function argumentException(text) {
			return new SqlFunctionArgumentError(text);
		}
	}, {
		key: 'needArgumentsCount',
		value: function needArgumentsCount(args, count) {
			if (args.length < count) {
				throw this.argumentException('not enough arguments');
			}
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			throw new ImplementationRequired();
		}
	}]);

	return BasicFunction;
}();

module.exports = BasicFunction;

},{"./error/ImplementationRequired":54,"./error/SqlFunctionArgumentError":61}],16:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgramError = require('./error/ProgramError');
var Nodes = require('./sql/Nodes');

var Binder = function () {
	function Binder() {
		_classCallCheck(this, Binder);

		this.binds = new Map();
	}

	_createClass(Binder, [{
		key: 'bind',


		/**
   *
   * @param {string} ident
   * @param {mixed} value
   * @returns {undefined}
   */
		value: function bind(ident, value) {
			var ast = null;

			try {
				if (Binder._isListIdent(ident)) {
					ast = Binder._listValuesToAst(value);
				} else {
					ast = Binder._scalarValueToAst(value);
				}
			} catch (e) {
				throw new ProgramError('Bind ' + ident + ': ' + e.message);
			}

			if (ident in this.binds) {
				throw new ProgramError('Duplicate bind base name: ' + ident);
			}

			this.binds[ident] = ast;
		}
	}, {
		key: '_need',
		value: function _need(ident) {
			if (!(ident in this.binds)) {
				throw new ProgramError('Bind ' + ident + ' is not binded');
			}

			return this.binds[ident];
		}
	}, {
		key: 'expandInplace',
		value: function expandInplace(ast) {
			var _this = this;

			ast.eachChildNodeRecursive(function (node) {
				if (node instanceof Nodes.BindingValueScalar) {

					node.expand(_this._need(node.ident));
				} else if (node instanceof Nodes.BindingValueList) {

					node.expand(_this._need(node.ident));
				} else if (node instanceof Nodes.BindingIdent) {

					node.expand(_this._need(node.ident).value);
				} else if (node instanceof Nodes.BindingIdentList) {
					var fragments = _this._need(node.ident).values.map(function (v) {
						return v.value;
					});

					node.expand(fragments);
				}
			});
		}
	}], [{
		key: '_isListIdent',
		value: function _isListIdent(ident) {
			return ident.length > 2 && ident[0] === ':' && ident[1] === ':';
		}
	}, {
		key: '_scalarValueToAst',
		value: function _scalarValueToAst(value) {
			var nodes = {
				boolean: Nodes.Boolean,
				string: Nodes.String,
				number: Nodes.Number
			};

			var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

			if (value === null) {

				return new Nodes.Null();
			} else if (type === 'string') {
				var sn = new Nodes.String('""');

				sn.value = value;

				return sn;
			} else if (type in nodes) {

				return new nodes[type](value);
			} else {

				throw new ProgramError('must be scalar or null');
			}
		}
	}, {
		key: '_listValuesToAst',
		value: function _listValuesToAst(values) {
			if (!(values instanceof Array)) {
				throw new ProgramError('must be an array');
			}

			var nodes = [];

			for (var i in values) {
				try {
					nodes.push(Binder._scalarValueToAst(values[i]));
				} catch (e) {
					throw new ProgramError('value at offset #' + i + ': ' + e.message);
				}
			}

			return new Nodes.ExpressionsList(nodes);
		}
	}]);

	return Binder;
}();

module.exports = Binder;

},{"./error/ProgramError":59,"./sql/Nodes":72}],17:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataType = require('./DataType');
var NumberUtils = require('./NumberUtils');
var STRING = require('./sqlFunctions/basic/STRING');

/**
 * Класс, который нужен для обеспечения единообразной сортировки
 * между `sort` и сравнениями в JS. `sort` использует по-байтовое
 * сравнение для JSON-кодированных значений, поэтому здесь нужно
 * сэмулировать именно его
 */

var Collator = function () {
	function Collator() {
		_classCallCheck(this, Collator);
	}

	_createClass(Collator, null, [{
		key: '_compareNumbers',
		value: function _compareNumbers(a, b) {
			if (a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			}

			return 0;
		}
	}, {
		key: '_compareSortAsJson',
		value: function _compareSortAsJson(dataType, a, b) {
			var keyA = Collator.generateSortKey(dataType, a);
			var keyB = Collator.generateSortKey(dataType, b);

			/*
    * JS uses simple string comparison algo, which is identical to byte-by-byte
    * comparison of UTF-8 encoded strings used in `LANG=C sort`
    * http://www.ecma-international.org/ecma-262/6.0/#sec-abstract-relational-comparison Note 2
    */

			if (keyA > keyB) {
				return 1;
			} else if (keyA < keyB) {
				return -1;
			}

			return 0;
		}

		/**
   *
   * @param {string} dataType
   * @param {mixed} a
   * @param {mixed} b
   * @returns {Number}
   */

	}, {
		key: 'compareSortKeys',
		value: function compareSortKeys(dataType, a, b) {
			if (dataType === DataType.NUMBER) {
				return Collator._compareNumbers(+a, +b);
			}

			return Collator._compareSortAsJson(dataType, a, b);
		}

		/**
   *
   * @param {string} dataType
   * @param {mixed} value
   * @returns {string}
   */

	}, {
		key: 'generateGroupKey',
		value: function generateGroupKey(dataType, value) {
			if (dataType === DataType.NUMBER) {
				return NumberUtils.toDecString(value) + '';
			} else if (dataType === DataType.STRING) {
				return Collator._generateGroupKeyString(value);
			} else {
				return Collator._generateKeyMixed(value);
			}
		}
	}, {
		key: 'generateSortKey',
		value: function generateSortKey(dataType, value) {
			if (dataType === DataType.NUMBER) {
				return NumberUtils.toDecString(value) + '';
			} else if (dataType === DataType.STRING) {
				return Collator._generateSortKeyString(value);
			} else {
				return Collator._generateKeyMixed(value);
			}
		}
	}, {
		key: '_generateSortKeyString',
		value: function _generateSortKeyString(value) {
			var s = STRING.prototype.call([value]);

			return s;
		}
	}, {
		key: '_generateGroupKeyString',
		value: function _generateGroupKeyString(value) {
			/* eslint-disable indent, no-unreachable */
			switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
				case 'string':
					return JSON.stringify(value);
					break;
				case 'number':
					return '"' + NumberUtils.toDecString(value) + '"';
					break;
				case 'boolean':
					return value ? '"true"' : '"false"';
					break;
				case 'undefined':
					return '""';
					break;
				default:
					if (value === null) {
						return '"null"';
					}

					return JSON.stringify(value);
					break;
			}
			/* eslint-enable indent, no-unreachable */
		}

		/**
   *
   * @param {mixed} value
   * @returns {string}
   */

	}, {
		key: '_generateKeyMixed',
		value: function _generateKeyMixed(value) {
			/* eslint-disable indent, no-unreachable */
			switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
				case 'string':
					return '6_' + JSON.stringify(value);
					break;
				case 'number':
					return '5_' + NumberUtils.toDecString(value) + '';
					break;
				case 'boolean':
					return value ? '4_true' : '3_false';
					break;
				case 'undefined':
					return '1_undefined';
					break;
				default:
					if (value === null) {
						return '2_null';
					}

					return '9_' + JSON.stringify(value);
					break;
			}
			/* eslint-enable indent, no-unreachable */
		}
	}]);

	return Collator;
}();

module.exports = Collator;

},{"./DataType":25,"./NumberUtils":34,"./sqlFunctions/basic/STRING":138}],18:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SqlNodes = require('./sql/Nodes');
var BasicColumn = require('./BasicColumn');
var AggregationColumn = require('./AggregationColumn');
var SqlLogicError = require('./error/SqlLogicError');
var BasicExpression = require('./BasicExpression');
var ExpressionAnalyser = require('./ExpressionAnalyser');
var AggregationExpression = require('./AggregationExpression');

var ColumnsAnalyser = function () {
	/**
  *
  * @param {PreparingContext} preparingContext
  * @returns {ColumnsAnalyser}
  */
	function ColumnsAnalyser(preparingContext) {
		_classCallCheck(this, ColumnsAnalyser);

		this.expressionAnalyser = new ExpressionAnalyser(preparingContext);
		this.preparingContext = preparingContext;
	}

	/**
  *
  * @param {Column[]} columns
  * @returns {Map<string[], BasicColumn|AggregationColumn>}
  */


	_createClass(ColumnsAnalyser, [{
		key: 'analyseColumns',
		value: function analyseColumns(columns) {
			var columnsMap = new Map();

			if (columns) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var selectColumn = _step.value;

						var column = this.analyseColumn(selectColumn);

						columnsMap.set(column.alias, column);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}

			return columnsMap;
		}

		/**
   *
   * @param {Node} expression
   * @returns {AggregationExpression|BasicExpression}
   */

	}, {
		key: 'analyseExpression',
		value: function analyseExpression(expression) {
			if (this.expressionAnalyser.isAggregationExpression(expression)) {
				return new AggregationExpression(this.preparingContext, expression);
			} else {
				return new BasicExpression(this.preparingContext, expression);
			}
		}

		/**
   * @private
   * @param {Node} column
   * @returns {BasicColumn|AggregationColumn}
   */

	}, {
		key: 'analyseColumn',
		value: function analyseColumn(column) {
			var alias = null;

			if (column.alias) {
				alias = column.alias.getFragments();
				if (alias[0] !== '@') {
					throw new SqlLogicError('You can\'t use aliases targeted on source');
				}
			} else if (column.expression instanceof SqlNodes.ColumnIdent) {
				if (column.expression.fragments.every(function (s) {
					return typeof s === 'string';
				})) {
					alias = column.expression.getFragments().slice();
					alias[0] = '@';
				}
			}

			if (!alias) {
				alias = ['@', column.expressionSqlString];
			}

			return this.column(alias, column.expression);
		}

		/**
   * @private
   * @param {string[]} alias
   * @param {Node} expression
   * @returns {BasicColumn|AggregationColumn}
   */

	}, {
		key: 'column',
		value: function column(alias, expression) {
			if (this.expressionAnalyser.isAggregationExpression(expression)) {
				return new AggregationColumn(this.preparingContext, alias, expression);
			} else {
				return new BasicColumn(this.preparingContext, alias, expression);
			}
		}
	}]);

	return ColumnsAnalyser;
}();

module.exports = ColumnsAnalyser;

},{"./AggregationColumn":7,"./AggregationExpression":8,"./BasicColumn":13,"./BasicExpression":14,"./ExpressionAnalyser":29,"./error/SqlLogicError":62,"./sql/Nodes":72}],19:[function(require,module,exports){
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlreadyExists = require('./error/AlreadyExists');
var NotFound = require('./error/NotFound');

var ComplexIdentsMap = function () {
	function ComplexIdentsMap() {
		_classCallCheck(this, ComplexIdentsMap);

		this.map = {};
	}

	_createClass(ComplexIdentsMap, [{
		key: '_key',
		value: function _key(path) {
			return JSON.stringify(path.map(function (s) {
				return s.toUpperCase();
			}));
		}
	}, {
		key: '_unkey',
		value: function _unkey(key) {
			return JSON.parse(key);
		}
	}, {
		key: 'add',
		value: function add(path, object) {
			var key = this._key(path);

			if (this.map[key]) {
				throw new AlreadyExists('ident ', path.join('.'));
			}

			this.map[key] = object;
		}
	}, {
		key: 'get',
		value: function get(path) {
			return this.map[this._key(path)];
		}
	}, {
		key: 'need',
		value: function need(path) {
			var f = this.get(path);

			if (!f) {
				throw new NotFound('ident ' + path.join('.'));
			}

			return f;
		}
	}, {
		key: Symbol.iterator,
		value: _regenerator2.default.mark(function value() {
			var k;
			return _regenerator2.default.wrap(function value$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.t0 = _regenerator2.default.keys(this.map);

						case 1:
							if ((_context.t1 = _context.t0()).done) {
								_context.next = 7;
								break;
							}

							k = _context.t1.value;
							_context.next = 5;
							return [this._unkey(k), this.map[k]];

						case 5:
							_context.next = 1;
							break;

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, value, this);
		})
	}]);

	return ComplexIdentsMap;
}();

module.exports = ComplexIdentsMap;

},{"./error/AlreadyExists":51,"./error/NotFound":57,"babel-runtime/regenerator":1}],20:[function(require,module,exports){
'use strict';

/**
 * Строка данных, может содержать несколько разных сырых объектов - по одному
 * на каждый DataSource.
 *
 * Этот класс может сериализоваться в JSON и десериализоваться в обычный JS-объект,
 * так что не стоит добавлять сюда методы, которые могут быть вызваны после десериализации.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataRow = function () {
	/**
  *
  * @param {object} sources key-value object {'@source1': {row1}, '@source2': {row2}}
  * @returns {DataRow}
  */
	function DataRow(sources) {
		_classCallCheck(this, DataRow);

		this.sources = sources;
		this.aggregationCache = {};
	}

	/**
  *
  * @param {Object} row
  * @returns {DataRow}
  */


	_createClass(DataRow, null, [{
		key: 'wrap',
		value: function wrap(row) {
			return new DataRow({ '@': row });
		}
	}]);

	return DataRow;
}();

DataRow.SOURCES_PROPERTY = 'sources';
DataRow.AGGREGATION_CACHE_PROPERTY = 'aggregationCache';

module.exports = DataRow;

},{}],21:[function(require,module,exports){
'use strict';

/**
 * Аналог таблицы в SQL, отсюда берутся данные для дальнейшей обработки
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataSource =
/**
 *
 * @param {Readable} stream
 * @returns {DataSource}
 */
function DataSource(stream) {
	_classCallCheck(this, DataSource);

	this.stream = stream;
};

DataSource.DEFAULT_NAME = '@';

module.exports = DataSource;

},{}],22:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataSourceResolver = require('./DataSourceResolver');
var ComplexIdentsMap = require('./ComplexIdentsMap');

var DataSourceApiResolver = function (_DataSourceResolver) {
	_inherits(DataSourceApiResolver, _DataSourceResolver);

	function DataSourceApiResolver() {
		_classCallCheck(this, DataSourceApiResolver);

		var _this = _possibleConstructorReturn(this, (DataSourceApiResolver.__proto__ || Object.getPrototypeOf(DataSourceApiResolver)).call(this));

		_this.sources = new ComplexIdentsMap();
		return _this;
	}

	/**
  *
  * @param {string[]} pathFragments
  * @param {DataSource} source
  * @returns {undefined}
  */


	_createClass(DataSourceApiResolver, [{
		key: 'addDataSource',
		value: function addDataSource(pathFragments, source) {
			this.sources.add(pathFragments, source);
		}

		/**
   *
   * @param {string[]} pathFragments
   * @returns {DataSource}
   */

	}, {
		key: 'resolve',
		value: function resolve(pathFragments) {
			return this.sources.get(pathFragments);
		}

		/**
   *
   * @param {string[]} pathFragments
   * @returns {string|null}
   */

	}, {
		key: 'extractAlias',
		value: function extractAlias(pathFragments) {
			if (!pathFragments.length) {
				return null;
			}

			var last = pathFragments[pathFragments.length - 1];

			if (/^[a-z_][a-z0-9_]*$/i.test(last)) {
				return last;
			}

			return null;
		}
	}]);

	return DataSourceApiResolver;
}(DataSourceResolver);

module.exports = DataSourceApiResolver;

},{"./ComplexIdentsMap":19,"./DataSourceResolver":23}],23:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataSource = require('./DataSource');
var ImplementationRequired = require('./error/ImplementationRequired');
var JlTransformsChain = require('./stream/JlTransformsChain');
var LinesSplitter = require('./stream/LinesSplitter');
var ChunkJoiner = require('./stream/ChunkJoiner');
var JsonParser = require('./stream/JsonParser');

var DataSourceResolver = function () {
	function DataSourceResolver() {
		_classCallCheck(this, DataSourceResolver);
	}

	_createClass(DataSourceResolver, [{
		key: '_resolve',

		/**
   *
   * @param {string[]} location
   * @returns {DataSource|null}
   */
		value: function _resolve(location) {
			var stream = this.resolve(location);

			if (!stream) {
				return null;
			}

			if (stream instanceof DataSource) {
				return stream;
			}

			if (!stream.outputType) {
				if (stream._readableState && stream._readableState.objectMode) {
					var objectsStream = new JlTransformsChain([stream, new ChunkJoiner()]);

					return new DataSource(objectsStream);
				} else {
					var _objectsStream = new JlTransformsChain([stream, new LinesSplitter(), new JsonParser()]);

					return new DataSource(_objectsStream);
				}
			} else {
				return new DataSource(stream);
			}
		}

		/**
   *
   * @param {string[]} location
   * @returns {DataSource}
   */

	}, {
		key: 'resolve',
		value: function resolve(location) {
			throw new ImplementationRequired();
		}

		/**
   *
   * @param {string[]} location
   * @returns {string}
   */

	}, {
		key: 'extractAlias',
		value: function extractAlias(location) {
			return null;
		}
	}]);

	return DataSourceResolver;
}();

module.exports = DataSourceResolver;

},{"./DataSource":21,"./error/ImplementationRequired":54,"./stream/ChunkJoiner":141,"./stream/JlTransformsChain":147,"./stream/JsonParser":149,"./stream/LinesSplitter":153}],24:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SqlNodes = require('./sql/Nodes');

var DataSourceResolversPool = function () {
	function DataSourceResolversPool() {
		_classCallCheck(this, DataSourceResolversPool);

		this.resolvers = [];
	}

	/**
  *
  * @param {DataSourceResolver} resolver
  * @returns {undefined}
  */


	_createClass(DataSourceResolversPool, [{
		key: 'add',
		value: function add(resolver) {
			this.resolvers.push(resolver);
		}

		/**
   *
   * @param {string[]} pathFragments
   * @returns {DataSource|null}
   */

	}, {
		key: 'resolve',
		value: function resolve(pathFragments) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.resolvers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var resolver = _step.value;

					var source = resolver._resolve(pathFragments);

					if (source) {
						return source;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return null;
		}

		/**
   *
   * @param {ComplexIdent} complexIdent
   * @returns {string}
   */

	}, {
		key: 'extractBindingAlias',
		value: function extractBindingAlias(complexIdent) {
			var lastFragment = complexIdent.fragments[complexIdent.fragments.length - 1];

			if (lastFragment instanceof SqlNodes.BindingIdent || lastFragment instanceof SqlNodes.BindingIdentList) {
				return lastFragment.basename();
			}

			return null;
		}

		/**
   *
   * @param {string[]} pathFragments
   * @returns {string}
   */

	}, {
		key: 'extractAlias',
		value: function extractAlias(pathFragments) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.resolvers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var resolver = _step2.value;

					var alias = resolver.extractAlias(pathFragments);

					if (alias !== null) {
						return alias;
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return null;
		}
	}]);

	return DataSourceResolversPool;
}();

module.exports = DataSourceResolversPool;

},{"./sql/Nodes":72}],25:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataType = function DataType() {
	_classCallCheck(this, DataType);

	throw new Error('This is a static class');
};

DataType.NUMBER = 'NUMBER';
DataType.STRING = 'STRING';
DataType.BOOL = 'BOOL';
DataType.DATE = 'BOOL';
DataType.MIXED = 'MIXED';

module.exports = DataType;

},{}],26:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeepCloner = function () {
	function DeepCloner() {
		_classCallCheck(this, DeepCloner);
	}

	_createClass(DeepCloner, null, [{
		key: 'clone',
		value: function clone(value) {
			var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

			if (type !== 'object' || value === null) {
				return value;
			}

			/* eslint-disable indent, no-unreachable */
			switch (value.constructor) {
				case Array:
					return DeepCloner.cloneArray(value);
					break;
				case Date:
					return DeepCloner.cloneDate(value);
					break;
				default:
					return DeepCloner.cloneRawObject(value);
			}
			/* eslint-enable indent no-unreachable */
		}

		/**
   *
   * @param {Array} array
   * @returns {Array}
   */

	}, {
		key: 'cloneArray',
		value: function cloneArray(array) {
			return array.slice().map(DeepCloner.clone);
		}

		/**
   *
   * @param {Date} date
   * @returns {Date}
   */

	}, {
		key: 'cloneDate',
		value: function cloneDate(date) {
			return new Date(date.valueOf());
		}

		/**
   *
   * @param {Object} object
   * @returns {Object}
   */

	}, {
		key: 'cloneRawObject',
		value: function cloneRawObject(object) {
			var copy = {};

			for (var k in object) {
				copy[k] = DeepCloner.clone(object[k]);
			}

			return copy;
		}
	}]);

	return DeepCloner;
}();

module.exports = DeepCloner;

},{}],27:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SqlParser = require('./sql/Parser');
var SqlNodes = require('./sql/Nodes');
var SqlToJs = require('./SqlToJs');
var PreparingContext = require('./PreparingContext');
var RuntimeContext = require('./RuntimeContext');
var FunctionsMap = require('./FunctionsMap');
var Select = require('./Select');
var Insert = require('./Insert');
var Update = require('./Update');
var path = require('path');

var Engine = function () {
	function Engine() {
		_classCallCheck(this, Engine);
	}

	_createClass(Engine, [{
		key: 'createQuery',

		/**
   *
   * @param {string} sql
   * @param {PublicApiOptions} options
   * @returns {Select|Insert}
   */
		value: function createQuery(sql) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var functionsMap = this.createFunctionsMap();
			var runtimeContext = new RuntimeContext(functionsMap);

			var sqlToJs = new SqlToJs(functionsMap, runtimeContext);

			var preparingContext = new PreparingContext(sqlToJs, functionsMap);

			preparingContext.options = options;

			var ast = SqlParser.parse(sql);

			if (ast instanceof SqlNodes.Select) {

				return new Select(preparingContext, runtimeContext, ast);
			} else if (ast instanceof SqlNodes.Delete) {
				var selectAst = new SqlNodes.Select();

				if (ast.where) {
					selectAst.where = new SqlNodes.UnaryLogicalOperation('!', ast.where);
				} else {
					selectAst.where = new SqlNodes.Boolean(false);
				}

				return new Select(preparingContext, runtimeContext, selectAst);
			} else if (ast instanceof SqlNodes.Insert) {

				return new Insert(preparingContext, runtimeContext, ast);
			} else if (ast instanceof SqlNodes.Update) {

				return new Update(preparingContext, runtimeContext, ast);
			} else {
				throw new Error('Unknown query: ' + ast.constructor.name);
			}
		}

		/**
   * @@returns {FunctionsMap}
   */

	}, {
		key: 'createFunctionsMap',
		value: function createFunctionsMap() {
			var map = new FunctionsMap();

			// Generated by
			// ls */*.js | awk '{print "\t\tmap.add([path.parse('\''"$1"'\'').name], require('\''./sqlFunctions/"$1"'\''));"}'

			map.add([path.parse('aggregation/AVG.js').name], require('./sqlFunctions/aggregation/AVG.js'));
			map.add([path.parse('aggregation/COUNT.js').name], require('./sqlFunctions/aggregation/COUNT.js'));
			map.add([path.parse('aggregation/COUNT_DISTINCT.js').name], require('./sqlFunctions/aggregation/COUNT_DISTINCT.js'));
			map.add([path.parse('aggregation/MAX.js').name], require('./sqlFunctions/aggregation/MAX.js'));
			map.add([path.parse('aggregation/MIN.js').name], require('./sqlFunctions/aggregation/MIN.js'));
			map.add([path.parse('aggregation/SUM.js').name], require('./sqlFunctions/aggregation/SUM.js'));
			map.add([path.parse('basic/CEIL.js').name], require('./sqlFunctions/basic/CEIL.js'));
			map.add([path.parse('basic/COALESCE.js').name], require('./sqlFunctions/basic/COALESCE.js'));
			map.add([path.parse('basic/CONCAT.js').name], require('./sqlFunctions/basic/CONCAT.js'));
			map.add([path.parse('basic/DATE.js').name], require('./sqlFunctions/basic/DATE.js'));
			map.add([path.parse('basic/FLOOR.js').name], require('./sqlFunctions/basic/FLOOR.js'));
			map.add([path.parse('basic/FROM_UNIXTIME.js').name], require('./sqlFunctions/basic/FROM_UNIXTIME.js'));
			map.add([path.parse('basic/IF.js').name], require('./sqlFunctions/basic/IF.js'));
			map.add([path.parse('basic/NOW.js').name], require('./sqlFunctions/basic/NOW.js'));
			map.add([path.parse('basic/NUMBER.js').name], require('./sqlFunctions/basic/NUMBER.js'));
			map.add([path.parse('basic/RAND.js').name], require('./sqlFunctions/basic/RAND.js'));
			map.add([path.parse('basic/ROUND.js').name], require('./sqlFunctions/basic/ROUND.js'));
			map.add([path.parse('basic/STRING.js').name], require('./sqlFunctions/basic/STRING.js'));
			map.add([path.parse('basic/UNIX_TIMESTAMP.js').name], require('./sqlFunctions/basic/UNIX_TIMESTAMP.js'));

			return map;
		}
	}]);

	return Engine;
}();

module.exports = Engine;

},{"./FunctionsMap":30,"./Insert":31,"./PreparingContext":36,"./RuntimeContext":43,"./Select":44,"./SqlToJs":46,"./Update":50,"./sql/Nodes":72,"./sql/Parser":73,"./sqlFunctions/aggregation/AVG.js":121,"./sqlFunctions/aggregation/COUNT.js":122,"./sqlFunctions/aggregation/COUNT_DISTINCT.js":123,"./sqlFunctions/aggregation/MAX.js":124,"./sqlFunctions/aggregation/MIN.js":125,"./sqlFunctions/aggregation/SUM.js":126,"./sqlFunctions/basic/CEIL.js":127,"./sqlFunctions/basic/COALESCE.js":128,"./sqlFunctions/basic/CONCAT.js":129,"./sqlFunctions/basic/DATE.js":130,"./sqlFunctions/basic/FLOOR.js":131,"./sqlFunctions/basic/FROM_UNIXTIME.js":132,"./sqlFunctions/basic/IF.js":133,"./sqlFunctions/basic/NOW.js":134,"./sqlFunctions/basic/NUMBER.js":135,"./sqlFunctions/basic/RAND.js":136,"./sqlFunctions/basic/ROUND.js":137,"./sqlFunctions/basic/STRING.js":138,"./sqlFunctions/basic/UNIX_TIMESTAMP.js":139,"path":undefined}],28:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JlTransformsChain = require('./stream/JlTransformsChain');

var Explainer = function () {
	function Explainer() {
		_classCallCheck(this, Explainer);
	}

	_createClass(Explainer, [{
		key: 'createExplain',
		value: function createExplain(transformsChain) {
			return this._createItemsByTransform(transformsChain);
		}
	}, {
		key: '_createItemsByTransform',
		value: function _createItemsByTransform(stream) {
			var explain = {
				type: stream.constructor.name
			};

			if (stream instanceof JlTransformsChain) {
				explain.childs = [];

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = stream.streams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var child = _step.value;

						explain.childs.push(this._createItemsByTransform(child));
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}

			return explain;
		}
	}]);

	return Explainer;
}();

module.exports = Explainer;

},{"./stream/JlTransformsChain":147}],29:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SqlNodes = require('./sql/Nodes');
var AggregationFunction = require('./AggregationFunction');
var DataType = require('./DataType');

var ExpressionAnalyser = function () {
	function ExpressionAnalyser(preparingContext) {
		_classCallCheck(this, ExpressionAnalyser);

		this.preparingContext = preparingContext;
	}

	/**
  *
  * @param {Node} expression
  * @returns {Boolean}
  */


	_createClass(ExpressionAnalyser, [{
		key: 'isAggregationExpression',
		value: function isAggregationExpression(expression) {
			var _this = this;

			var callIsAggregation = function callIsAggregation(call) {
				var func = _this.preparingContext.functionsMap.need(call.function.getFragments());

				if (func.prototype instanceof AggregationFunction) {
					return true;
				}

				return false;
			};

			if (expression instanceof SqlNodes.Call) {
				if (callIsAggregation(expression)) {
					return true;
				}
			}

			var isAggregation = false;

			expression.eachChildNodeRecursive(function (node) {
				if (_this.isAggregationExpression(node)) {
					isAggregation = true;
				}
			});

			return isAggregation;
		}
	}, {
		key: 'determineExpressionDataType',
		value: function determineExpressionDataType(expression) {
			var operationTypes = new Map([[SqlNodes.BinaryArithmeticOperation, DataType.NUMBER], [SqlNodes.UnaryArithmeticOperation, DataType.NUMBER], [SqlNodes.Number, DataType.NUMBER], [SqlNodes.String, DataType.STRING], [SqlNodes.LogicalOperation, DataType.BOOL], [SqlNodes.UnaryLogicalOperation, DataType.BOOL], [SqlNodes.ComparisonOperation, DataType.BOOL]]);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = operationTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 2),
					    ctor = _step$value[0],
					    type = _step$value[1];

					if (expression instanceof ctor) {
						return type;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (expression instanceof SqlNodes.Brackets) {
				return this.determineExpressionDataType(expression.expression);
			}

			if (expression instanceof SqlNodes.Call) {
				var func = this.preparingContext.functionsMap.need(expression.function.getFragments());

				return func.dataType();
			}

			return DataType.MIXED;
		}

		/**
   * Ищет имена использованных в выражении источников данных
   * @param {Node} expression
   * @returns {string[]}
   */

	}, {
		key: 'extractUsedSources',
		value: function extractUsedSources(expression) {
			if (expression instanceof SqlNodes.ColumnIdent) {
				return [expression.getFragments()[0]];
			}

			var used = {};

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = expression.childNodes()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var child = _step2.value;
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = this.extractUsedSources(child)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var name = _step3.value;

							used[name] = true;
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3.return) {
								_iterator3.return();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return Object.keys(used);
		}
	}]);

	return ExpressionAnalyser;
}();

module.exports = ExpressionAnalyser;

},{"./AggregationFunction":9,"./DataType":25,"./sql/Nodes":72}],30:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComplexIdentsMap = require('./ComplexIdentsMap');

var FunctionsMap = function (_ComplexIdentsMap) {
  _inherits(FunctionsMap, _ComplexIdentsMap);

  function FunctionsMap() {
    _classCallCheck(this, FunctionsMap);

    return _possibleConstructorReturn(this, (FunctionsMap.__proto__ || Object.getPrototypeOf(FunctionsMap)).apply(this, arguments));
  }

  return FunctionsMap;
}(ComplexIdentsMap);

module.exports = FunctionsMap;

},{"./ComplexIdentsMap":19}],31:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Append = require('./stream/Append');
var DataRow = require('./DataRow');

var Insert = function () {
	/**
  *
  * @param {PreparingContext} preparingContext
  * @param {RuntimeContext} runtimeContext
  * @param {Node} ast
  */
	function Insert(preparingContext, runtimeContext, ast) {
		_classCallCheck(this, Insert);

		this.preparingContext = preparingContext;
		this.runtimeContext = runtimeContext;
		this.ast = ast;
	}

	/**
  *
  * @param {DataSourceResolversPool} dataSourceResolversPool
  * @returns {Append}
  */


	_createClass(Insert, [{
		key: 'stream',
		value: function stream(dataSourceResolversPool) {
			var dummyRow = new DataRow({});
			var rows = [];

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.ast.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var exp = _step.value;

					rows.push(this.preparingContext.sqlToJs.nodeToFunction(exp)(dummyRow));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return new Append(rows);
		}
	}]);

	return Insert;
}();

module.exports = Insert;

},{"./DataRow":20,"./stream/Append":140}],32:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nodes = require('./sql/Nodes');
var SqlNotSupported = require('./error/SqlNotSupported');
var ExpressionAnalyser = require('./ExpressionAnalyser');

var Join = function () {
	/**
  *
  * @param {string} type
  * @param {PreparingContext} preparingContext
  * @param {DataSource} joiningSourceStream
  * @param {string} joiningDataSourceName
  * @param {Node} ast
  * @returns {Join}
  */
	function Join(type, preparingContext, joiningSourceStream, joiningDataSourceName, ast) {
		_classCallCheck(this, Join);

		this.type = type;
		this.preparingContext = preparingContext;
		this.joiningDataSource = joiningSourceStream;
		this.joiningDataSourceName = joiningDataSourceName;
		this.ast = ast;

		this.joiningDataSourceSortingsColumns = [];
		this.mainDataSourceSortingsColumns = [];

		this.parseAst(ast);
	}

	/**
  *
  * @param {Node} ast
  * @returns {undefined}
  */


	_createClass(Join, [{
		key: 'parseAst',
		value: function parseAst(ast) {
			if (ast instanceof Nodes.Brackets) {
				this.parseAst(ast.expression);

				return;
			}

			if (!(ast instanceof Nodes.ComparisonOperation)) {
				throw new SqlNotSupported('Only basic JOIN ON expression is supported: @source1.field1 = @source2.field2');
			}

			if (ast.operator !== '=') {
				throw new SqlNotSupported('Only operator = is supported yet in JOIN ON');
			}

			var expressionAnalyser = new ExpressionAnalyser(this.preparingContext);
			var usedLeft = expressionAnalyser.extractUsedSources(ast.left);
			var usedRight = expressionAnalyser.extractUsedSources(ast.right);

			var sortingJoining = [];
			var sortingMain = [];

			if (usedLeft.includes(this.joiningDataSourceName)) {
				if (usedRight.includes(this.joiningDataSourceName) || usedLeft.length > 1) {
					throw new SqlNotSupported('Only basic JOIN ON expression is supported: @source1.field1 = @source2.field2');
				}

				sortingJoining.push(ast.left);
				sortingMain.push(ast.right);
			} else if (usedRight.includes(this.joiningDataSourceName)) {
				if (usedLeft.includes(this.joiningDataSourceName) || usedRight.length > 1) {
					throw new SqlNotSupported('Only basic JOIN ON expression is supported: @source1.field1 = @source2.field2');
				}

				sortingJoining.push(ast.right);
				sortingMain.push(ast.left);
			}

			this.joiningDataSourceSortingsColumns = sortingJoining;
			this.mainDataSourceSortingsColumns = sortingMain;
		}
	}]);

	return Join;
}();

Join.LEFT = 'LEFT';
Join.INNER = 'INNER';

module.exports = Join;

},{"./ExpressionAnalyser":29,"./error/SqlNotSupported":63,"./sql/Nodes":72}],33:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgramError = require('./error/ProgramError');

var JoinOptions =
/**
 *
 * @param {Object} options
 * @returns {JoinOptions}
 */
function JoinOptions(options) {
	_classCallCheck(this, JoinOptions);

	this.maxKeysInMemory = 16000;
	this.forceInMemory = undefined;
	this.tmpDir = null;

	for (var k in options) {
		if (!this.hasOwnProperty(k)) {
			throw new ProgramError('Unknown Join option: ' + k);
		}

		this[k] = options[k];
	}
};

module.exports = JoinOptions;

},{"./error/ProgramError":59}],34:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberUtils = function () {
	function NumberUtils() {
		_classCallCheck(this, NumberUtils);
	}

	_createClass(NumberUtils, null, [{
		key: 'toDecString',

		/**
   * Сгенерировать десятичную строку без E-нотации
   * @param {number} number
   * @returns {string}
   */
		value: function toDecString(number) {
			var s = number + '';

			/*
    * @see http://www.ecma-international.org/ecma-262/5.1/#sec-9.8.1
    */

			if (number === 0 || number >= 1e-6 && number <= 1e20) {
				return s;
			}

			if (s === 'NaN' || s[0] === 'I' || s[1] === 'I') {
				// 'I' - /-?Infinity/
				return s;
			}

			return NumberUtils.exponentialStringToDec(s);
		}
	}, {
		key: 'exponentialStringToDec',
		value: function exponentialStringToDec(string) {
			var m = string.match(/^(-|)(?:([0-9]*)(?:\.([0-9]+))?)[eE]([-+]?[0-9]+)/);

			if (!m) {
				return string;
			}

			var _m = _slicedToArray(m, 5),
			    sign = _m[1],
			    int = _m[2],
			    float = _m[3],
			    exp = _m[4];

			if (int.length !== 1 || int[0] === '0') {
				// v8 не генерит такого сам
				throw new Error('not supported');
			}

			var dotPosition = +exp + 1;
			var digits = int + (float === undefined ? '' : float);

			if (dotPosition >= digits.length) {
				return sign + digits + '0'.repeat(dotPosition - digits.length);
			} else if (dotPosition < 0) {
				return sign + '0.' + '0'.repeat(-dotPosition) + digits;
			} else if (dotPosition === 0) {
				return sign + '0.' + digits;
			} else {
				return sign + digits.substr(0, dotPosition) + '.' + digits.substr(dotPosition);
			}
		}
	}]);

	return NumberUtils;
}();

module.exports = NumberUtils;

},{}],35:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Order =
/**
 *
 * @param {Function} valueFunction
 * @param {string} direction
 * @param {string} dataType
 * @returns {Order}
 */
function Order(valueFunction, direction, dataType) {
	_classCallCheck(this, Order);

	this.valueFunction = valueFunction;
	this.direction = direction;
	this.dataType = dataType;
};

Order.DIRECTION_ASC = 'ASC';
Order.DIRECTION_DESC = 'DESC';

module.exports = Order;

},{}],36:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PublicApiOptions = require('./PublicApiOptions');

/**
 * Контекст, который используется на этапе подготовки запроса.
 * В него входит, например, список обычных и агрегирующийх функций,
 * доступных в системе
 */

var PreparingContext =
/**
 *
 * @param {SqlToJs} sqlToJs
 * @param {FunctionsMap} functionsMap
 * @returns {PreparingContext}
 */
function PreparingContext(sqlToJs, functionsMap) {
	_classCallCheck(this, PreparingContext);

	this.sqlToJs = sqlToJs;
	this.functionsMap = functionsMap;

	/**
  * @type {PublicApiOptions}
  */
	this.options = new PublicApiOptions();
};

module.exports = PreparingContext;

},{"./PublicApiOptions":39}],37:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PropertiesPicker = function () {
	/**
  *
  * @param {Map} paths
  * @returns {PropertiesPicker}
  */
	function PropertiesPicker(paths) {
		_classCallCheck(this, PropertiesPicker);

		this.paths = paths;
		this.slicer = PropertiesPicker._compileSlicerProcedural(paths);
		this.merger = PropertiesPicker._compileMergerProcedural(paths);
	}

	/**
  * Создаёт новый объект, в которй копирует указанный набор свойств
  * @param {object} from
  * @returns {object}
  */


	_createClass(PropertiesPicker, [{
		key: 'sliceProperties',
		value: function sliceProperties(from) {
			return this.slicer(from);
		}

		/**
   * Копирует свойства из одного объекта в другой
   * @param {object} from
   * @param {object} to
   * @returns {object}
   */

	}, {
		key: 'mergeProperties',
		value: function mergeProperties(from, to) {
			return this.merger(from, to);
		}

		/**
   *
   * @param {Map} paths
   * @returns {Function}
   */

	}], [{
		key: '_compileMergerProcedural',
		value: function _compileMergerProcedural(paths) {
			var env = {
				functions: []
			};

			var code = '';

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 2),
					    path = _step$value[0],
					    source = _step$value[1];

					var getter = void 0;

					if (typeof source === 'function') {
						env.functions.push(source);
						getter = 'env.functions[' + (env.functions.length - 1) + '](row)';
					} else {
						getter = PropertiesPicker._compileGetterCode(source);
					}

					code += 'do {\n';
					var v = 'to';

					for (var i in path) {
						var p = path[i];

						code += '\tif (typeof(' + v + ') !== "object" || ' + v + ' === null) {\n';
						code += '\t\tcontinue;\n';
						code += '\t}';

						if (i < path.length - 1) {
							code += 'else if (!(' + JSON.stringify(p) + ' in ' + v + ')) {\n';
							code += '\t\t' + v + '[' + JSON.stringify(p) + '] = {};\n';
							code += '\t}';
						}

						code += '\n\n';

						v += '[' + JSON.stringify(p) + ']';
					}

					code += '\t' + v + ' = ' + getter + ';\n';

					code += '} while(false);\n\n';
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			code += 'return to;\n';

			return new Function('env', 'row', 'to', code).bind(undefined, env);
		}

		/**
   *
   * @param {Map} paths
   * @returns {Function}
   */

	}, {
		key: '_compileSlicerProcedural',
		value: function _compileSlicerProcedural(paths) {
			var env = {
				functions: []
			};

			var resultObject = {};

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = paths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var _step2$value = _slicedToArray(_step2.value, 2),
					    path = _step2$value[0],
					    source = _step2$value[1];

					if (typeof source === 'function') {
						env.functions.push(source);
						PropertiesPicker._objectSetProperty(path, resultObject, 'env.functions[' + (env.functions.length - 1) + '](row)');
					} else {
						PropertiesPicker._objectSetProperty(path, resultObject, PropertiesPicker._compileGetterCode(source));
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			var genObjectLiteral = function genObjectLiteral(val) {
				var lines = [];

				for (var k in val) {
					var v = val[k];

					if (typeof v === 'string') {
						continue;
					}

					var _code = genObjectLiteral(v);
					var indentedCode = _code.replace(/\n(.+)/g, '\n\t$1');

					lines.push('\t' + JSON.stringify(k) + ': ' + indentedCode);
				}

				return '{\n' + lines.join(',\n') + '\n}';
			};

			var genPropertiesAssigns = function genPropertiesAssigns(prefix, path, val, tmpVar) {
				var lines = [];

				for (var k in val) {
					var v = val[k];
					var propIdent = prefix + '[' + JSON.stringify(k) + ']';

					if (typeof v !== 'string') {
						lines.push.apply(lines, _toConsumableArray(genPropertiesAssigns(propIdent, path.concat([k]), v, tmpVar)));
						continue;
					}

					var _code2 = tmpVar + ' = ' + v + ';\n';

					_code2 += 'if (' + tmpVar + ' !== undefined) {\n';
					_code2 += '\t' + propIdent + ' = tmp;\n';
					_code2 += '}\n';

					lines.push(_code2);
				}

				return lines;
			};

			var code = 'const result = ' + genObjectLiteral(resultObject) + ';\n\n';

			code += 'let tmp;\n\n';
			code += genPropertiesAssigns('result', [], resultObject, 'tmp').join('\n') + '\n';
			code += 'return result;\n';

			return new Function('env', 'row', code).bind(undefined, env);
		}

		/**
   *
   * @param {Map} path
   * @returns {String}
   */

	}, {
		key: '_compileGetterCode',
		value: function _compileGetterCode(path) {
			var levels = [];
			var rel = 'row';

			for (var i = 0; i < path.length - 1; i++) {
				var fragment = path[i];

				rel += '[' + JSON.stringify(fragment) + ']';
				levels.push('(' + rel + ' || undefined)');
			}

			levels.push(rel + '[' + JSON.stringify(path[path.length - 1]) + ']');

			if (levels.length > 1) {
				return '(' + levels.join(' && ') + ')';
			} else {
				return levels[0];
			}
		}

		/**
   *
   * @param {Map} path
   * @param {object} obj
   * @param {mixed} value
   * @returns {Boolean}
   */

	}, {
		key: '_objectSetProperty',
		value: function _objectSetProperty(path, obj, value) {
			function deepSet(path, pathOffset, obj, value) {
				var seg = path[pathOffset];

				if (pathOffset >= path.length - 1) {
					obj[seg] = value;

					return true;
				}

				var childObject;

				if (seg in obj) {
					childObject = obj[seg];
				} else {
					childObject = {};
				}

				if ((typeof childObject === 'undefined' ? 'undefined' : _typeof(childObject)) !== 'object' || childObject === null) {
					return false;
				}

				var found = deepSet(path, pathOffset + 1, childObject, value);

				if (found) {
					obj[seg] = childObject;
				}

				return found;
			}

			return deepSet(path, 0, obj, value);
		}
	}]);

	return PropertiesPicker;
}();

module.exports = PropertiesPicker;

},{}],38:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = require('./Engine');
var PublicSelect = require('./public/PublicSelect');
var PublicApiOptions = require('./PublicApiOptions');
var Explainer = require('./Explainer');

var PublicApi = function () {
	/**
  *
  * @param {PublicApiOptions} options
  */
	function PublicApi() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new PublicApiOptions();

		_classCallCheck(this, PublicApi);

		if (options instanceof PublicApiOptions) {
			this.options = options;
		} else {
			this.options = new PublicApiOptions(options);
		}

		this.engine = new Engine();
	}

	/**
  *
  * @param {string} sql
  * @returns {PublicSelect}
  */


	_createClass(PublicApi, [{
		key: 'query',
		value: function query(sql) {
			return new PublicSelect(this.engine.createQuery(sql, this.options), this.options.dataSourceResolvers);
		}
	}, {
		key: 'explain',
		value: function explain(select) {
			var e = new Explainer();

			return e.createExplain(select);
		}
	}]);

	return PublicApi;
}();

PublicApi.DataSourceResolver = require('./DataSourceResolver');

PublicApi.exceptions = {
	JlException: require('./error/JlException'),
	SqlFunctionArgumentError: require('./error/SqlFunctionArgumentError'),
	SqlLogicError: require('./error/SqlLogicError'),
	SqlNotSupported: require('./error/SqlNotSupported'),
	JsonParsingError: require('./error/JsonParsingError'),
	DataSourceNotFound: require('./error/DataSourceNotFound')
};

PublicApi.version = require('../package.json').version;

module.exports = PublicApi;

},{"../package.json":3,"./DataSourceResolver":23,"./Engine":27,"./Explainer":28,"./PublicApiOptions":39,"./error/DataSourceNotFound":53,"./error/JlException":55,"./error/JsonParsingError":56,"./error/SqlFunctionArgumentError":61,"./error/SqlLogicError":62,"./error/SqlNotSupported":63,"./public/PublicSelect":69}],39:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SortOptions = require('./SortOptions');
var JoinOptions = require('./JoinOptions');
var ProgramError = require('./error/ProgramError');

var PublicApiOptions = function PublicApiOptions() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	_classCallCheck(this, PublicApiOptions);

	this.tmpDir = null;
	this.forceInMemory = undefined;
	this.sortOptions = null;
	this.joinOptions = null;
	this.dataSourceResolvers = [];

	for (var k in options) {
		if (!this.hasOwnProperty(k)) {
			throw new ProgramError('Unknown API option: ' + k);
		}

		this[k] = options[k];
	}

	if (!options.sortOptions) {
		this.sortOptions = new SortOptions({});
	} else if (!(options.sortOptions instanceof SortOptions)) {
		this.sortOptions = new SortOptions(options.sortOptions);
	}

	if (!options.joinOptions) {
		this.joinOptions = new JoinOptions({});
	} else if (!(options.sortOptions instanceof JoinOptions)) {
		this.joinOptions = new JoinOptions(options.joinOptions);
	}

	if (this.tmpDir) {
		if (!(options.sortOptions && options.sortOptions.tmpDir)) {
			this.sortOptions.tmpDir = this.tmpDir;
		}

		if (!(options.joinOptions && options.joinOptions.tmpDir)) {
			this.joinOptions.tmpDir = this.tmpDir;
		}
	}

	if (this.forceInMemory !== undefined) {
		if (this.sortOptions.forceInMemory === undefined) {
			this.sortOptions.forceInMemory = this.forceInMemory;
		}

		if (this.joinOptions.forceInMemory === undefined) {
			this.joinOptions.forceInMemory = this.forceInMemory;
		}
	}
};

module.exports = PublicApiOptions;

},{"./JoinOptions":33,"./SortOptions":45,"./error/ProgramError":59}],40:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quoter = function () {
	function Quoter() {
		_classCallCheck(this, Quoter);
	}

	_createClass(Quoter, null, [{
		key: 'unquote',

		/**
   *
   * @param {string} string
   * @returns {string}
   */
		value: function unquote(string) {
			var stringWoQuotes = string.substr(1, string.length - 2);

			return Quoter.unescape(stringWoQuotes);
		}

		/**
   *
   * @param {string} string
   * @param {string} quoteCharacter
   * @returns {string}
   */

	}, {
		key: 'unquoteOptionalQuotes',
		value: function unquoteOptionalQuotes(string, quoteCharacter) {
			if (!string.length) {
				return '';
			}

			var stringWoQuotes = void 0;

			if (string[0] === quoteCharacter) {
				stringWoQuotes = string.substr(1, string.length - 2);
			} else {
				stringWoQuotes = string;
			}

			return Quoter.unescape(stringWoQuotes);
		}

		/**
   *
   * @param {string} string
   * @param {object} customEscapes
   * @returns {string}
   */

	}, {
		key: 'unescape',
		value: function unescape(string) {
			var customEscapes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			/**
    * @see http://dev.mysql.com/doc/refman/5.7/en/string-literals.html Table 10.1
    */
			var specialChars = {
				'n': '\n',
				't': '\t',
				'r': '\r',
				'0': '\0', // An ASCII NUL (X'00') character
				'b': '\b', // A backspace character
				'Z': '\x1a', //	ASCII 26 (Control+Z)
				'%': '\\%', // For LIKE
				'_': '\\_' // For LIKE
			};

			for (var char in customEscapes) {
				specialChars[char] = customEscapes[char];
			}

			var unescapedString = '';
			var charIsEscaped = false;

			var position = -1;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = string[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _char = _step.value;

					position++;

					if (charIsEscaped) {
						if (_char in specialChars) {
							if (specialChars[_char] instanceof Function) {
								unescapedString += specialChars[_char](_char, position - 1);
							} else {
								unescapedString += specialChars[_char];
							}
						} else {
							unescapedString += _char;
						}

						charIsEscaped = false;
						continue;
					}

					if (_char === Quoter.escapeCharacter) {
						charIsEscaped = true;
						continue;
					}

					unescapedString += _char;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (charIsEscaped) {
				throw new Error('Unexpected end of string after "\\": ' + string);
			}

			return unescapedString;
		}
	}]);

	return Quoter;
}();

Quoter.escapeCharacter = '\\';

module.exports = Quoter;

},{}],41:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegexpInfo = function RegexpInfo(source, flags, regexp) {
	_classCallCheck(this, RegexpInfo);

	this.source = source;
	this.flags = flags;
	this.regexp = regexp;
};

module.exports = RegexpInfo;

},{}],42:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegexpInfo = require('./RegexpInfo');
var RegexpSyntaxError = require('./error/RegexpSyntaxError');

var RegexpUtils = function () {
	function RegexpUtils() {
		_classCallCheck(this, RegexpUtils);
	}

	_createClass(RegexpUtils, null, [{
		key: 'parseRegexp',

		/**
   * Method to avoid v8 RegExp bug in node v6
   *
   * @param {string} string
   * @returns {RegexpInfo}
   */
		value: function parseRegexp(string) {
			var m = string.match(/^\/((?:\\.|[^\\/])*)\/([a-z]*)$/i);

			if (!m) {
				throw new RegexpSyntaxError(string);
			}

			var source = m[1];
			var flags = m[2];

			if (source === '') {
				// avoid comment-like regex `//`
				source = '(?:)';
			}

			try {
				var regexp = new RegExp(source, flags);

				return new RegexpInfo(source, flags, regexp);
			} catch (e) {
				throw new RegexpSyntaxError(e.message + ': ' + string);
			}
		}
	}]);

	return RegexpUtils;
}();

module.exports = RegexpUtils;

},{"./RegexpInfo":41,"./error/RegexpSyntaxError":60}],43:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasicFunction = require('./BasicFunction');
var ProgramError = require('./error/ProgramError');

var RuntimeContext =
/**
 *
 * @param {FunctionMap} functionsMap
 * @returns {RuntimeContext}
 */
function RuntimeContext(functionsMap) {
	_classCallCheck(this, RuntimeContext);

	this.basicFunctions = {};
	this.basicFunctionsPropertyName = 'basicFunctions';

	this.aggregations = {};
	this.aggregationsPropertyName = 'aggregations';

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = functionsMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _step$value = _slicedToArray(_step.value, 2),
			    path = _step$value[0],
			    func = _step$value[1];

			if (path.length > 1) {
				throw new ProgramError('Multilevel names for functions is not supported');
			}

			if (!(func.prototype instanceof BasicFunction)) {
				continue;
			}

			var f = new func();

			this.basicFunctions[path[0]] = f.call.bind(f);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
};

module.exports = RuntimeContext;

},{"./BasicFunction":15,"./error/ProgramError":59}],44:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColumnsAnalyser = require('./ColumnsAnalyser');
var Sorter = require('./stream/Sorter');
var Filter = require('./stream/Filter');
var Joiner = require('./stream/Joiner');
var PropertiesPickerTransformer = require('./stream/PropertiesPickerTransformer');
var Groupper = require('./stream/Groupper');
var Order = require('./Order');
var Terminator = require('./stream/Terminator');
var Join = require('./Join');
var Mutator = require('./stream/Mutator');
var Aggregation = require('./Aggregation');
var AggregationExpression = require('./AggregationExpression');
var JlTransformsChain = require('./stream/JlTransformsChain');
var DataRow = require('./DataRow');
var DataSource = require('./DataSource');
var DataType = require('./DataType');
var Nodes = require('./sql/Nodes');
var ExpressionAnalyser = require('./ExpressionAnalyser');

var SqlNotSupported = require('./error/SqlNotSupported');
var SqlLogicError = require('./error/SqlLogicError');
var NotSupported = require('./error/NotSupported');
var DataSourceNotFound = require('./error/DataSourceNotFound');

var Select = function () {
	/**
  *
  * @param {PreparingContext} preparingContext
  * @param {RuntimeContext} runtimeContext
  * @param {Node} ast
  */
	function Select(preparingContext, runtimeContext, ast) {
		_classCallCheck(this, Select);

		if (ast.limit) {
			throw new SqlNotSupported('LIMIT is not supported yet');
		}

		if (ast.distinct && ast.groups.length) {
			throw new SqlNotSupported('SELECT DISTINCT and GROUP BY');
		}

		/**
   * @type {PreparingContext}
   */
		this.preparingContext = preparingContext;

		this.expressionAnalyser = new ExpressionAnalyser(this.preparingContext);

		/**
   * @type {PreparingContext}
   */
		this.runtimeContext = runtimeContext;
		this.sqlToJs = preparingContext.sqlToJs;
		this.ast = ast;

		var columnsAnalyser = new ColumnsAnalyser(preparingContext);

		this.columns = columnsAnalyser.analyseColumns(ast.columns);

		if (this.ast.where && columnsAnalyser.expressionAnalyser.isAggregationExpression(this.ast.where)) {
			throw new SqlLogicError('aggregation function in WHERE');
		}

		this.expressions = [];

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value = _slicedToArray(_step.value, 2),
				    column = _step$value[1];

				this.expressions.push(column);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = this.ast.orders[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var order = _step2.value;

				this.expressions.push(columnsAnalyser.analyseExpression(order.expression));
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		if (this.ast.having) {
			this.expressions.push(columnsAnalyser.analyseExpression(this.ast.having));
		}

		if (this.ast.distinct && this.hasAggregationColumns()) {
			throw new SqlNotSupported('SELECT DISTINCT and aggregation functions');
		}
	}

	/**
  *
  * @returns {Sorter|null}
  */


	_createClass(Select, [{
		key: 'sorter',
		value: function sorter() {
			var orders = this.orders(this.ast.orders);

			if (!orders.length) {
				return null;
			}

			return this.createSorterInstance(orders);
		}

		/**
   *
   * @returns {Filter|null}
   */

	}, {
		key: 'filter',
		value: function filter() {
			if (!this.ast.where) {
				return null;
			}

			return new Filter(this.sqlToJs.nodeToFunction(this.ast.where));
		}

		/**
   *
   * @returns {Filter|null}
   */

	}, {
		key: 'having',
		value: function having() {
			if (!this.ast.having) {
				return null;
			}

			return new Filter(this.sqlToJs.nodeToFunction(this.ast.having));
		}
	}, {
		key: 'resolveDataSource',
		value: function resolveDataSource(dataSourceResolversPool, tableAst) {
			var dataSource = dataSourceResolversPool.resolve(tableAst.location.getFragments());

			if (!dataSource) {
				throw new DataSourceNotFound(tableAst.location.getFragments());
			}

			return dataSource;
		}

		/**
   *
   * @param {DataSourceResolverPool} dataSourceResolversPool
   * @returns {Join[]}
   */

	}, {
		key: 'joins',
		value: function joins(dataSourceResolversPool) {
			var joins = [];

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.ast.joins[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var joinAst = _step3.value;

					var joinType = void 0;

					if (joinAst instanceof Nodes.LeftJoin) {
						joinType = Join.LEFT;
					} else if (joinAst instanceof Nodes.InnerJoin) {
						joinType = Join.INNER;
					} else {
						throw new SqlNotSupported('INNER ans LEFT JOINs only supported yet');
					}

					var tableAlias = joinAst.table.alias && joinAst.table.alias.name;
					var dataSourcePath = joinAst.table.location.getFragments();

					if (!tableAlias) {
						tableAlias = dataSourceResolversPool.extractBindingAlias(joinAst.table.location);

						if (tableAlias !== null) {
							tableAlias = '@' + tableAlias;
						}
					}

					if (!tableAlias) {
						tableAlias = dataSourceResolversPool.extractAlias(dataSourcePath);

						if (tableAlias !== null) {
							tableAlias = '@' + tableAlias;
						}
					}

					if (!tableAlias) {
						throw new SqlLogicError('Tables must have an alias');
					}

					var dataSource = this.resolveDataSource(dataSourceResolversPool, joinAst.table);

					joins.push(new Join(joinType, this.preparingContext, dataSource, tableAlias, joinAst.expression));
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return joins;
		}

		/**
   *
   * @param {Node[]} ordersOrGroups
   * @returns {Order[]}
   */

	}, {
		key: 'orders',
		value: function orders(ordersOrGroups) {
			var _this = this;

			if (!ordersOrGroups.length) {
				return [];
			}

			var orders = ordersOrGroups.map(function (item) {
				var valueFunc = _this.sqlToJs.nodeToFunction(item.expression);
				var direction = item.direction === 'DESC' ? Order.DIRECTION_DESC : Order.DIRECTION_ASC;

				var dataType = _this.expressionAnalyser.determineExpressionDataType(item.expression);

				return new Order(valueFunc, direction, dataType === DataType.MIXED ? DataType.STRING : dataType);
			});

			return orders;
		}

		/**
   *
   * @returns {Boolean}
   */

	}, {
		key: 'hasAggregationColumns',
		value: function hasAggregationColumns() {
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = this.expressions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var expression = _step4.value;

					if (expression instanceof AggregationExpression) {
						return true;
					}
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			return false;
		}

		/**
   *
   * @param {Order[]} orders
   * @returns {Sorter}
   */

	}, {
		key: 'createSorterInstance',
		value: function createSorterInstance(orders) {
			return new Sorter(orders, this.preparingContext.options.sortOptions);
		}

		/**
   *
   * @returns {null|JlTransformsChain|Groupper}
   */

	}, {
		key: 'groupper',
		value: function groupper() {
			var groupper = this.createGroupper();

			if (!groupper) {
				return null;
			}

			if (this.ast.distinct) {
				var _sorter = this.createSorterInstance(this.orders(this.ast.columns));

				var _chain = new JlTransformsChain([_sorter, groupper]);

				return _chain;
			}

			if (!this.ast.groups.length) {
				// implicit GROUP BY
				return groupper;
			}

			// make pre-sorting
			var sorter = this.createSorterInstance(this.orders(this.ast.groups));

			var chain = new JlTransformsChain([sorter, groupper]);

			return chain;
		}

		/**
   *
   * @param {Join} join
   * @returns {JlTransform[]}
   */

	}, {
		key: 'joinerPipeline',
		value: function joinerPipeline(join) {
			if (join.mainDataSourceSortingsColumns.length < 1 || join.joiningDataSourceSortingsColumns.length < 1) {
				throw new NotSupported('Only Equi Join is supported: ON @joined.field = [@main.]field');
			}

			var joiningWrapper = new Mutator(function (row) {
				var s = {};

				s[join.joiningDataSourceName] = row;

				return new DataRow(s);
			});

			var joiningSorter = this.createSorterInstance(this.orders(join.joiningDataSourceSortingsColumns.map(function (e) {
				return new Nodes.Brackets(e);
			})));

			var mainSorter = this.createSorterInstance(this.orders(join.mainDataSourceSortingsColumns.map(function (e) {
				return new Nodes.Brackets(e);
			})));

			var joiner = new Joiner(this.preparingContext, join, this.sqlToJs.nodeToFunction(join.mainDataSourceSortingsColumns[0]), mainSorter, this.sqlToJs.nodeToFunction(join.joiningDataSourceSortingsColumns[0]), new JlTransformsChain([join.joiningDataSource.stream, joiningWrapper, joiningSorter]));

			return [mainSorter, new Terminator(), joiner];
		}

		/**
   *
   * @param {DataResolversPool} dataSourceResolversPool
   * @returns {JlTransformsChain}
   */

	}, {
		key: 'stream',
		value: function stream(dataSourceResolversPool) {
			var pipeline = [];

			if (this.ast.table) {
				// FROM clause
				if (this.ast.table.alias) {
					throw new SqlNotSupported('Data source in FROM should not have an alias');
				}

				var mainDataSource = this.resolveDataSource(dataSourceResolversPool, this.ast.table);

				pipeline.push(new Terminator());
				pipeline.push(mainDataSource.stream);
			}

			pipeline.push(new Mutator(DataRow.wrap));

			var joins = this.joins(dataSourceResolversPool);

			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = joins[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var join = _step5.value;

					pipeline.push.apply(pipeline, _toConsumableArray(this.joinerPipeline(join)));
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			var filter = this.filter();

			if (filter) {
				pipeline.push(filter);
			}

			var groupper = this.groupper();

			if (groupper) {
				pipeline.push(groupper);
			} else if (this.columns.size) {
				/*
     * группировщик сам создаёт строки с нужными полями, поэтому вычленение
     * полей нужно только для безгруппировочных запросов
     */
				var m = new Map();

				var _iteratorNormalCompletion6 = true;
				var _didIteratorError6 = false;
				var _iteratorError6 = undefined;

				try {
					for (var _iterator6 = this.columns[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
						var _step6$value = _slicedToArray(_step6.value, 2),
						    path = _step6$value[0],
						    column = _step6$value[1];

						m.set(path, column.valueSource());
					}
				} catch (err) {
					_didIteratorError6 = true;
					_iteratorError6 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion6 && _iterator6.return) {
							_iterator6.return();
						}
					} finally {
						if (_didIteratorError6) {
							throw _iteratorError6;
						}
					}
				}

				pipeline.push(new PropertiesPickerTransformer(m, this.ast.allColumns));
			}

			var having = this.having();

			if (having) {
				pipeline.push(having);
			}

			var sorter = this.sorter();

			if (sorter) {
				pipeline.push(sorter);
			}

			pipeline.push(new Mutator(function (row) {
				return row.sources[DataSource.DEFAULT_NAME] || {};
			}));

			return new JlTransformsChain(pipeline);
		}

		/**
   * @private
   * @returns {Groupper}
   */

	}, {
		key: 'createGroupper',
		value: function createGroupper() {
			var _this2 = this;

			var aggregation = new Aggregation(this.preparingContext, this.runtimeContext, this.expressions);
			var keyGenerators = void 0;

			if (this.ast.distinct) {
				keyGenerators = this.ast.columns.map(function (c) {
					return _this2.sqlToJs.nodeToFunction(c.expression);
				});
			} else {
				if (!this.ast.groups.length) {
					if (!this.hasAggregationColumns()) {
						return null;
					}

					/*
      * For aggregation queries without GROUP BY, e.g. `SELECT SUM(c) AS sum`
      */
					return new Groupper(function () {
						return null;
					}, aggregation);
				}

				if (!this.columns.size || this.ast.allColumns) {
					throw new SqlLogicError('`SELECT * ... GROUP BY ...` does not make sense');
				}

				keyGenerators = this.ast.groups.map(function (g) {
					return _this2.sqlToJs.nodeToFunction(g.expression);
				});
			}

			var keyGeneratorCb = void 0;

			if (keyGenerators.length === 1) {
				keyGeneratorCb = keyGenerators[0];
			} else {
				keyGeneratorCb = function keyGeneratorCb(row) {
					return keyGenerators.map(function (g) {
						return g(row);
					});
				};
			}

			return new Groupper(keyGeneratorCb, aggregation);
		}
	}]);

	return Select;
}();

module.exports = Select;

},{"./Aggregation":4,"./AggregationExpression":8,"./ColumnsAnalyser":18,"./DataRow":20,"./DataSource":21,"./DataType":25,"./ExpressionAnalyser":29,"./Join":32,"./Order":35,"./error/DataSourceNotFound":53,"./error/NotSupported":58,"./error/SqlLogicError":62,"./error/SqlNotSupported":63,"./sql/Nodes":72,"./stream/Filter":143,"./stream/Groupper":144,"./stream/JlTransformsChain":147,"./stream/Joiner":148,"./stream/Mutator":154,"./stream/PropertiesPickerTransformer":155,"./stream/Sorter":157,"./stream/Terminator":160}],45:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgramError = require('./error/ProgramError');

var SortOptions = function () {
	function SortOptions() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, SortOptions);

		this.path = 'sort';
		this.unique = false;
		this.numeric = false;
		this.reverse = false;
		this.stable = false;
		this.merge = false;
		this.ignoreCase = false;
		this.sortByHash = false;
		this.tmpDir = null;
		this.bufferSize = 64 * 1024 * 1024;
		this.separator = '\t';
		this.threads = null;
		this.keys = [];

		this.inMemoryBufferSize = 16000;
		this.forceInMemory = undefined;

		for (var k in options) {
			if (!this.hasOwnProperty(k)) {
				throw new ProgramError('Unknown option: ' + k);
			}

			this[k] = options[k];
		}
	}

	/**
  *
  * @returns {SortOptions}
  */


	_createClass(SortOptions, [{
		key: 'clone',
		value: function clone() {
			return new SortOptions(this);
		}
	}]);

	return SortOptions;
}();

module.exports = SortOptions;

},{"./error/ProgramError":59}],46:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AggregationFunction = require('./AggregationFunction');
var SqlToJsHelpers = require('./SqlToJsHelpers');
var RegexpUtils = require('./RegexpUtils');

var ProgramError = require('./error/ProgramError');

var SqlToJs = function () {
	/**
  *
  * @param {FunctionsMap} functionsMap
  * @param {RuntimeContext} runtimeContext
  * @returns {SqlToJs}
  */
	function SqlToJs(functionsMap, runtimeContext) {
		_classCallCheck(this, SqlToJs);

		this.runtimeContext = runtimeContext;
		this.functionsMap = functionsMap;

		this.basicFunctionsPropertyName = 'this.' + this.runtimeContext.basicFunctionsPropertyName;
		this.aggregationPropertyName = 'this.' + this.runtimeContext.aggregationsPropertyName;

		this.rowArgumentName = 'row';

		/* TODO config */
		this.rowVarName = 'row.sources';
		this.aggregationCacheVarName = 'row.aggregationCache';

		this.helpers = new SqlToJsHelpers();
	}

	/**
  *
  * @param {Node} node
  * @returns {string}
  */


	_createClass(SqlToJs, [{
		key: 'nodeToCode',
		value: function nodeToCode(node) {
			var nodeType = node.type();

			var codeConstructorName = 'codeFrom_' + nodeType;

			if (!(codeConstructorName in this)) {
				throw new ProgramError('Unknown node type: ' + nodeType);
			}

			return this[codeConstructorName](node);
		}

		/**
   *
   * @param {Node} node
   * @returns {Function}
   */

	}, {
		key: 'nodeToFunction',
		value: function nodeToFunction(node) {
			return new Function(['_helpers', this.rowArgumentName], 'return ' + this.nodeToCode(node)).bind(this.runtimeContext, this.helpers);
		}

		/**
   *
   * @param {mixed} basic
   * @returns {string}
   */

	}, {
		key: 'basicTypeToCode',
		value: function basicTypeToCode(basic) {
			return JSON.stringify(basic);
		}
	}, {
		key: 'codeFrom_ColumnIdent',
		value: function codeFrom_ColumnIdent(columnIdent) {
			/*
    * SQL: `a`.`b`.`c`
    * JS: ((item.a || undefined) && (item.a.b || undefined) && item.a.b.c)
    */
			var levels = [];
			var rel = this.rowVarName;
			var frags = columnIdent.getFragments();

			for (var i = 0; i < frags.length - 1; i++) {
				var fragment = frags[i];

				rel += '[' + JSON.stringify(fragment) + ']';
				levels.push('(' + rel + ' || undefined)');
			}

			levels.push(rel + '[' + JSON.stringify(frags[frags.length - 1]) + ']');

			if (levels.length > 1) {
				return '(' + levels.join(' && ') + ')';
			} else {
				return levels[0];
			}
		}
	}, {
		key: 'codeFrom_FunctionIdent',
		value: function codeFrom_FunctionIdent(functionIdent) {
			return this.basicFunctionsPropertyName + '[' + functionIdent.getFragments().map(function (s) {
				return s.toUpperCase();
			}).map(JSON.stringify).join('][') + ']';
		}
	}, {
		key: 'codeFrom_Call',
		value: function codeFrom_Call(call) {
			var func = this.functionsMap.get(call.function.getFragments());

			if (func && func.prototype instanceof AggregationFunction) {
				/*
     * Результат агрегирующей функции берётс из закешированного значения,
     * а кеш генерится в Aggregation
     */
				var nodeKey = JSON.stringify(call.id);

				var code = this.aggregationCacheVarName + '[' + nodeKey + ']';

				return code;
			}

			return this.codeFrom_FunctionIdent(call.function) + '([' + this.nodeToCode(call.args) + '])';
		}
	}, {
		key: 'codeFrom_String',
		value: function codeFrom_String(string) {
			return this.basicTypeToCode(string.value);
		}
	}, {
		key: 'codeFrom_Boolean',
		value: function codeFrom_Boolean(boolean) {
			return this.basicTypeToCode(boolean.value);
		}
	}, {
		key: 'codeFrom_Number',
		value: function codeFrom_Number(number) {
			return this.basicTypeToCode(number.value);
		}
	}, {
		key: 'codeFrom_Null',
		value: function codeFrom_Null(n) {
			return this.basicTypeToCode(null);
		}
	}, {
		key: 'codeFrom_Brackets',
		value: function codeFrom_Brackets(brackets) {
			return '(' + this.nodeToCode(brackets.expression) + ')';
		}
	}, {
		key: 'codeFrom_UnaryOperation',
		value: function codeFrom_UnaryOperation(unary) {
			return unary.operator + '(' + this.nodeToCode(unary.right) + ')';
		}
	}, {
		key: 'codeFrom_UnaryLogicalOperation',
		value: function codeFrom_UnaryLogicalOperation(unary) {
			return this.codeFrom_UnaryOperation(unary);
		}
	}, {
		key: 'codeFrom_UnaryArithmeticOperation',
		value: function codeFrom_UnaryArithmeticOperation(unary) {
			return this.codeFrom_UnaryOperation(unary);
		}
	}, {
		key: 'codeFrom_BinaryOperation',
		value: function codeFrom_BinaryOperation(binary) {
			if (binary.right.deepType() === 'Interval') {
				return this.codeFrom_BinaryOperator_interval(binary);
			}

			var left = this.nodeToCode(binary.left);
			var right = this.nodeToCode(binary.right);

			if (binary.operator === '+') {
				return '((' + left + ') - 0) ' + binary.operator + ' ((' + right + ') - 0)';
			}

			return left + ' ' + binary.operator + ' ' + right;
		}
	}, {
		key: 'codeFrom_BinaryOperator_interval',
		value: function codeFrom_BinaryOperator_interval(binary) {
			var intervalBase = binary.left;
			var interval = binary.right;
			var line = this.nodeToCode(intervalBase);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = interval.deltas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var delta = _step.value;

					var deltaSize = this.nodeToCode(delta.expression);

					if (binary.operator === '-') {
						deltaSize = '-(' + deltaSize + ')';
					}

					line = '_helpers.date.moveOnInterval(' + line + ', ' + JSON.stringify(delta.unit) + ', ' + deltaSize + ')';
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return line;
		}
	}, {
		key: 'codeFrom_BinaryArithmeticOperation',
		value: function codeFrom_BinaryArithmeticOperation(binary) {
			return this.codeFrom_BinaryOperation(binary);
		}
	}, {
		key: 'codeFrom_IntervalOperation',
		value: function codeFrom_IntervalOperation(oper) {
			return this.codeFrom_BinaryOperation(oper);
		}
	}, {
		key: 'codeFrom_ComparisonOperation',
		value: function codeFrom_ComparisonOperation(comp) {
			var op = comp.operator === '=' ? '==' : comp.operator;

			var leftCode = this.nodeToCode(comp.left);
			var rightCode = this.nodeToCode(comp.right);

			var isDates = false;

			if (comp.left.deepType() === 'IntervalOperation') {
				rightCode = '_helpers.date.toDate(' + rightCode + ')';

				isDates = true;
			}

			if (comp.right.deepType() === 'IntervalOperation') {
				leftCode = '_helpers.date.toDate(' + leftCode + ')';

				isDates = true;
			}

			if (isDates) {
				rightCode = '(' + rightCode + ').getTime()';
				leftCode = '(' + leftCode + ').getTime()';
			}

			return leftCode + ' ' + op + ' ' + rightCode;
		}
	}, {
		key: 'codeFrom_LogicalOperation',
		value: function codeFrom_LogicalOperation(comp) {
			var operatorsMapping = {
				and: '&&',
				or: '||'
			};

			var operator = operatorsMapping[comp.operator.toLowerCase()] || comp.operator;

			return '!!(' + this.nodeToCode(comp.left) + ' ' + operator + ' ' + this.nodeToCode(comp.right) + ')';
		}
	}, {
		key: 'codeFrom_ExpressionsList',
		value: function codeFrom_ExpressionsList(expressionsList) {
			return expressionsList.values.map(this.nodeToCode.bind(this)).join(', ');
		}
	}, {
		key: 'codeFrom_BindingValueScalar',
		value: function codeFrom_BindingValueScalar(binded) {
			return this.nodeToCode(binded.ast);
		}
	}, {
		key: 'codeFrom_BindingValueList',
		value: function codeFrom_BindingValueList(binded) {
			return this.nodeToCode(binded.ast);
		}
	}, {
		key: 'codeFrom_UnstrictIn',
		value: function codeFrom_UnstrictIn(exp) {
			return '_helpers.operators.unstrictIn([' + this.nodeToCode(exp.haystack) + '], ' + this.nodeToCode(exp.needle) + ')';
		}
	}, {
		key: 'codeFrom_StrictIn',
		value: function codeFrom_StrictIn(exp) {
			return '[' + this.nodeToCode(exp.haystack) + '].includes(' + this.nodeToCode(exp.needle) + ')';
		}
	}, {
		key: 'codeFrom_Map',
		value: function codeFrom_Map(exp) {
			var itemsCode = [];

			for (var k in exp.map) {
				itemsCode.push(JSON.stringify(k) + ': ' + this.nodeToCode(exp.map[k]));
			}

			return '{' + itemsCode.join(', ') + '}';
		}
	}, {
		key: 'codeFrom_Array',
		value: function codeFrom_Array(exp) {
			var itemsCode = [];

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = exp.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var item = _step2.value;

					itemsCode.push(this.nodeToCode(item));
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return '[' + itemsCode.join(', ') + ']';
		}

		/**
   *
   * @param {LikeOpearion} exp
   * @returns {string}
   */

	}, {
		key: 'codeFrom_LikeOperation',
		value: function codeFrom_LikeOperation(exp) {
			if (exp.right.deepType() === 'String') {
				// pattern - constant string. Can be compiled once

				var regex = this.helpers.operators.likeCompileRegexString(exp.right.value, exp.caseSensitive);

				return '(' + regex + '.test(' + this.nodeToCode(exp.left).toString() + '))';
			} else {
				return '_helpers.operators.like(' + '"" + ' + this.nodeToCode(exp.right) + ', ' + (exp.caseSensitive ? 'true' : 'false') + ', ' + this.nodeToCode(exp.left) + ')';
			}
		}

		/**
   *
   * @param {RegexpOperation} exp
   * @returns {string}
   */

	}, {
		key: 'codeFrom_RegexpOperation',
		value: function codeFrom_RegexpOperation(exp) {
			if (exp.right.deepType() === 'String') {
				var r = RegexpUtils.parseRegexp(exp.right.value).regexp;

				var regexpString = '/' + r.source + '/' + r.flags;

				return '(' + regexpString + '.test(' + this.nodeToCode(exp.left) + ' + ""))';
			} else {
				return '_helpers.operators.regexp(' + this.nodeToCode(exp.right) + ' + ""' + ', ' + this.nodeToCode(exp.left) + ' + ""' + ')';
			}
		}

		/**
   *
   * @param {BetweenOperation} exp
   * @returns {string}
   */

	}, {
		key: 'codeFrom_BetweenOperation',
		value: function codeFrom_BetweenOperation(exp) {
			return '_helpers.operators.between(' + this.nodeToCode(exp.left) + ', ' + this.nodeToCode(exp.rangeStart) + ', ' + this.nodeToCode(exp.rangeEnd) + ')';
		}

		/**
   *
   * @param {IsOperation} exp
   * @returns {string}
   */

	}, {
		key: 'codeFrom_IsOperation',
		value: function codeFrom_IsOperation(exp) {
			return '_helpers.operators.is(' + this.nodeToCode(exp.left) + ', ' + JSON.stringify(exp.expected) + ')';
		}
	}]);

	return SqlToJs;
}();

module.exports = SqlToJs;

},{"./AggregationFunction":9,"./RegexpUtils":42,"./SqlToJsHelpers":48,"./error/ProgramError":59}],47:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interval = require('./sql/nodes/Interval');
var ProgramError = require('./error/ProgramError');

var SqlTOJsDateHelper = function () {
	function SqlTOJsDateHelper(sqlToJs) {
		_classCallCheck(this, SqlTOJsDateHelper);

		this.sqlToJs = sqlToJs;
	}

	_createClass(SqlTOJsDateHelper, [{
		key: '_date',
		value: function _date(value) {
			if (value instanceof Date) {
				return new Date(value);
			}

			var r = typeof value === 'undefined' ? 'undefined' : _typeof(value);

			var result = null;

			if (r === 'number') {
				result = new Date(value * 1000);
			} else if (r === 'string') {
				result = new Date(value);
			}

			if (isNaN(result.getTime())) {
				return null;
			}

			return result;
		}
	}, {
		key: 'toDate',
		value: function toDate(dateOrTs) {
			if (dateOrTs instanceof Date) {
				return dateOrTs;
			}

			return this._date(dateOrTs);
		}
	}, {
		key: 'moveOnInterval',
		value: function moveOnInterval(ts, intervalUnit, intervalSize) {
			var date = this._date(ts);

			if (!date) {
				return null;
			}

			/* eslint-disable indent */
			switch (intervalUnit) {
				case Interval.UNIT_YEAR:
					date.setFullYear(date.getFullYear() + intervalSize);
					break;
				case Interval.UNIT_MONTH:
					date.setMonth(date.getMonth() + intervalSize);
					break;
				case Interval.UNIT_DAY:
					date.setDate(date.getDate() + intervalSize);
					break;
				case Interval.UNIT_HOUR:
					date.setHours(date.getHours() + intervalSize);
					break;
				case Interval.UNIT_MINUTE:
					date.setMinutes(date.getMinutes() + intervalSize);
					break;
				case Interval.UNIT_SECOND:
					date.setSeconds(date.getSeconds() + intervalSize);
					break;
				default:
					throw new ProgramError('Unknown interval unit: ' + intervalUnit);
			}
			/* eslint-enable indent */

			return date;
		}
	}]);

	return SqlTOJsDateHelper;
}();

module.exports = SqlTOJsDateHelper;

},{"./error/ProgramError":59,"./sql/nodes/Interval":97}],48:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SqlToJsDateHelper = require('./SqlToJsDateHelper');
var SqlToJsOperatorsHelper = require('./SqlToJsOperatorsHelper');

var SqlToJsHelpers =
/**
 *
 * @param {SqlToJs} sqlToJs
 * @returns {SqlToJsHelpers}
 */
function SqlToJsHelpers(sqlToJs) {
	_classCallCheck(this, SqlToJsHelpers);

	this.date = new SqlToJsDateHelper(sqlToJs);
	this.operators = new SqlToJsOperatorsHelper(sqlToJs);
};

module.exports = SqlToJsHelpers;

},{"./SqlToJsDateHelper":47,"./SqlToJsOperatorsHelper":49}],49:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quoter = require('./Quoter');
var RegexpUtils = require('./RegexpUtils');

var SqlToJsOperatorsHelper = function () {
	function SqlToJsOperatorsHelper() {
		_classCallCheck(this, SqlToJsOperatorsHelper);
	}

	_createClass(SqlToJsOperatorsHelper, [{
		key: 'unstrictIn',

		/**
   *
   * @param {Array} haystack
   * @param {mixed} needle
   * @returns {Boolean}
   */
		value: function unstrictIn(haystack, needle) {
			/* eslint-disable eqeqeq */
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = haystack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var v = _step.value;

					if (v == needle) {
						return true;
					}
				}
				/* eslint-enable eqeqeq */
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return false;
		}
	}, {
		key: '_regexEscapeString',
		value: function _regexEscapeString(string) {
			/**
    * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_Expressions
    */
			return string.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&');
		}
	}, {
		key: 'likeCompileRegexBaseString',
		value: function likeCompileRegexBaseString(likeString) {
			var _this = this;

			/*
    * У LIKE в MySQL мягко говоря станная логика экранирования
    * @see http://dev.mysql.com/doc/refman/5.7/en/string-comparison-functions.html#operator_like
    */
			var regex = '';
			var lastPos = 0;

			var nextRegexSegment = function nextRegexSegment(chr, position) {
				var seg = likeString.substr(lastPos, position);
				var regexSeg = _this._regexEscapeString(seg).replace(/%/g, '[\\s\\S]*').replace(/_/g, '[\\s\\S]') + chr;

				lastPos = position + 2;

				regex += regexSeg;

				return ''; // результат тут не важен
			};

			var quoting = {
				'%': nextRegexSegment,
				'_': nextRegexSegment
			};

			Quoter.unescape(likeString, quoting);

			nextRegexSegment('', likeString.length);

			return '^' + regex + '$';
		}
	}, {
		key: 'likeCompileRegexString',
		value: function likeCompileRegexString(likeString, caseSensitive) {
			var regex = this.likeCompileRegexBaseString(likeString);

			return '/' + regex + '/' + (caseSensitive ? '' : 'i');
		}
	}, {
		key: 'likeCompileRegex',
		value: function likeCompileRegex(likeString, caseSensitive) {
			var regex = this.likeCompileRegexBaseString(likeString);

			return new RegExp(regex, caseSensitive ? '' : 'i');
		}
	}, {
		key: 'like',
		value: function like(likeString, caseSensitive, value) {
			var re = this.likeCompileRegex(likeString, caseSensitive);

			return re.test('' + value);
		}

		/**
   * Этот метод используется только для динамических REGEXP
   * @param {string} regexpString
   * @param {string} value
   * @returns {boolean}
   */

	}, {
		key: 'regexp',
		value: function regexp(regexpString, value) {
			return RegexpUtils.parseRegexp(regexpString).regexp.test(value);
		}

		/**
   * @param {mixed} value
   * @param {mixed} rangeStart
   * @param {mixed} rangeEnd
   * @returns {Boolean}
   */

	}, {
		key: 'between',
		value: function between(value, rangeStart, rangeEnd) {
			return value >= rangeStart && value <= rangeEnd;
		}
	}, {
		key: 'is',
		value: function is(value, expected) {
			/* eslint-disable indent, no-unreachable */
			switch (expected) {
				case 'array':
					return value instanceof Array;
					break;
				case 'object':
					return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !(value instanceof Array);
					break;
				case 'string':
					return typeof value === 'string';
					break;
				case 'number':
					return typeof value === 'number';
					break;
				case 'bool':
					return typeof value === 'boolean';
					break;
				case 'null':
					return value === null;
					break;
				default:
					throw new Error('Unknown expected type: ' + expected);
			}
			/* eslint-enable indent, no-unreachable */
		}
	}]);

	return SqlToJsOperatorsHelper;
}();

module.exports = SqlToJsOperatorsHelper;

},{"./Quoter":40,"./RegexpUtils":42}],50:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpressionAnalyser = require('./ExpressionAnalyser');
var BasicColumn = require('./BasicColumn');
var PropertiesPickerTransformer = require('./stream/PropertiesPickerTransformer');
var Mutator = require('./stream/Mutator');
var DataRow = require('./DataRow');
var DataSource = require('./DataSource');
var JlTransformsChain = require('./stream/JlTransformsChain');
var SqlLogicError = require('./error/SqlLogicError');

var Update = function () {
	/**
  *
  * @param {PreparingContext} preparingContext
  * @param {RuntimeContext} runtimeContext
  * @param {SqlNodes.Update} ast
  */
	function Update(preparingContext, runtimeContext, ast) {
		_classCallCheck(this, Update);

		this.preparingContext = preparingContext;
		this.runtimeContext = runtimeContext;
		this.ast = ast;

		var expressionAnalyser = new ExpressionAnalyser(preparingContext);

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this.ast.sets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var s = _step.value;

				if (expressionAnalyser.isAggregationExpression(s.expression)) {
					throw new SqlLogicError('aggregation function in SET');
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		if (ast.where) {
			if (expressionAnalyser.isAggregationExpression(ast.where)) {
				throw new SqlLogicError('aggregation function in WHERE');
			}
		}
	}

	/**
  *
  * @param {DataSourceResolversPool} dataSourceResolversPool
  * @returns {JlTransformsChain}
  */


	_createClass(Update, [{
		key: 'stream',
		value: function stream(dataSourceResolversPool) {
			var filter = this.ast.where ? this.preparingContext.sqlToJs.nodeToFunction(this.ast.where) : null;
			var pipeline = [new Mutator(DataRow.wrap)];

			var m = new Map();

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.ast.sets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var s = _step2.value;

					m.set(s.columnIdent.getFragments(), new BasicColumn(this.preparingContext, s.columnIdent, s.expression).valueSource());
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			pipeline.push(new PropertiesPickerTransformer(m, true, filter));

			pipeline.push(new Mutator(function (row) {
				return row.sources[DataSource.DEFAULT_NAME] || {};
			}));

			return new JlTransformsChain(pipeline);
		}
	}]);

	return Update;
}();

module.exports = Update;

},{"./BasicColumn":13,"./DataRow":20,"./DataSource":21,"./ExpressionAnalyser":29,"./error/SqlLogicError":62,"./stream/JlTransformsChain":147,"./stream/Mutator":154,"./stream/PropertiesPickerTransformer":155}],51:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var AlreadyExists = function (_JlException) {
  _inherits(AlreadyExists, _JlException);

  function AlreadyExists() {
    _classCallCheck(this, AlreadyExists);

    return _possibleConstructorReturn(this, (AlreadyExists.__proto__ || Object.getPrototypeOf(AlreadyExists)).apply(this, arguments));
  }

  return AlreadyExists;
}(JlException);

module.exports = AlreadyExists;

},{"./JlException":55}],52:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var ChildProcessError = function (_JlException) {
	_inherits(ChildProcessError, _JlException);

	function ChildProcessError(cmd, args, statusCode, signal) {
		_classCallCheck(this, ChildProcessError);

		return _possibleConstructorReturn(this, (ChildProcessError.__proto__ || Object.getPrototypeOf(ChildProcessError)).call(this, 'Error executing command `' + cmd + '`' + '(status=' + statusCode + ', signal=' + signal + ') with args ' + JSON.stringify(args)));
	}

	return ChildProcessError;
}(JlException);

module.exports = ChildProcessError;

},{"./JlException":55}],53:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = require('./NotFound');

var DataSourceNotFound = function (_NotFound) {
	_inherits(DataSourceNotFound, _NotFound);

	function DataSourceNotFound(pathFragments) {
		_classCallCheck(this, DataSourceNotFound);

		return _possibleConstructorReturn(this, (DataSourceNotFound.__proto__ || Object.getPrototypeOf(DataSourceNotFound)).call(this, pathFragments.join('.')));
	}

	return DataSourceNotFound;
}(NotFound);

module.exports = DataSourceNotFound;

},{"./NotFound":57}],54:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var ImplementationRequired = function (_JlException) {
  _inherits(ImplementationRequired, _JlException);

  function ImplementationRequired() {
    _classCallCheck(this, ImplementationRequired);

    return _possibleConstructorReturn(this, (ImplementationRequired.__proto__ || Object.getPrototypeOf(ImplementationRequired)).apply(this, arguments));
  }

  return ImplementationRequired;
}(JlException);

module.exports = ImplementationRequired;

},{"./JlException":55}],55:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

var JlException = function (_extendableBuiltin2) {
	_inherits(JlException, _extendableBuiltin2);

	function JlException() {
		var _ref;

		_classCallCheck(this, JlException);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = JlException.__proto__ || Object.getPrototypeOf(JlException)).call.apply(_ref, [this].concat(args)));

		_this.name = _this.constructor.name;
		return _this;
	}

	return JlException;
}(_extendableBuiltin(Error));

module.exports = JlException;

},{}],56:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var JsonParsingError = function (_JlException) {
	_inherits(JsonParsingError, _JlException);

	function JsonParsingError(message, json) {
		_classCallCheck(this, JsonParsingError);

		var _this = _possibleConstructorReturn(this, (JsonParsingError.__proto__ || Object.getPrototypeOf(JsonParsingError)).call(this, message));

		_this.json = json;
		return _this;
	}

	return JsonParsingError;
}(JlException);

module.exports = JsonParsingError;

},{"./JlException":55}],57:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var NotFound = function (_JlException) {
  _inherits(NotFound, _JlException);

  function NotFound() {
    _classCallCheck(this, NotFound);

    return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
  }

  return NotFound;
}(JlException);

module.exports = NotFound;

},{"./JlException":55}],58:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var NotSupported = function (_JlException) {
  _inherits(NotSupported, _JlException);

  function NotSupported() {
    _classCallCheck(this, NotSupported);

    return _possibleConstructorReturn(this, (NotSupported.__proto__ || Object.getPrototypeOf(NotSupported)).apply(this, arguments));
  }

  return NotSupported;
}(JlException);

module.exports = NotSupported;

},{"./JlException":55}],59:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var ProgramError = function (_JlException) {
  _inherits(ProgramError, _JlException);

  function ProgramError() {
    _classCallCheck(this, ProgramError);

    return _possibleConstructorReturn(this, (ProgramError.__proto__ || Object.getPrototypeOf(ProgramError)).apply(this, arguments));
  }

  return ProgramError;
}(JlException);

module.exports = ProgramError;

},{"./JlException":55}],60:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var RegexpSyntaxError = function (_JlException) {
  _inherits(RegexpSyntaxError, _JlException);

  function RegexpSyntaxError() {
    _classCallCheck(this, RegexpSyntaxError);

    return _possibleConstructorReturn(this, (RegexpSyntaxError.__proto__ || Object.getPrototypeOf(RegexpSyntaxError)).apply(this, arguments));
  }

  return RegexpSyntaxError;
}(JlException);

module.exports = RegexpSyntaxError;

},{"./JlException":55}],61:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SqlLogicError = require('./SqlLogicError');

var SqlFunctionArgumentError = function (_SqlLogicError) {
  _inherits(SqlFunctionArgumentError, _SqlLogicError);

  function SqlFunctionArgumentError() {
    _classCallCheck(this, SqlFunctionArgumentError);

    return _possibleConstructorReturn(this, (SqlFunctionArgumentError.__proto__ || Object.getPrototypeOf(SqlFunctionArgumentError)).apply(this, arguments));
  }

  return SqlFunctionArgumentError;
}(SqlLogicError);

module.exports = SqlFunctionArgumentError;

},{"./SqlLogicError":62}],62:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var SqlLogicError = function (_JlException) {
  _inherits(SqlLogicError, _JlException);

  function SqlLogicError() {
    _classCallCheck(this, SqlLogicError);

    return _possibleConstructorReturn(this, (SqlLogicError.__proto__ || Object.getPrototypeOf(SqlLogicError)).apply(this, arguments));
  }

  return SqlLogicError;
}(JlException);

module.exports = SqlLogicError;

},{"./JlException":55}],63:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlException = require('./JlException');

var SqlNotSupported = function (_JlException) {
  _inherits(SqlNotSupported, _JlException);

  function SqlNotSupported() {
    _classCallCheck(this, SqlNotSupported);

    return _possibleConstructorReturn(this, (SqlNotSupported.__proto__ || Object.getPrototypeOf(SqlNotSupported)).apply(this, arguments));
  }

  return SqlNotSupported;
}(JlException);

module.exports = SqlNotSupported;

},{"./JlException":55}],64:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChildProcessError = require('../error/ChildProcessError');

var CutWrapper =
/**
 *
 * @param {string} columnSeparator
 * @param {string} columnsDef
 * @returns {CutWrapper}
 */
function CutWrapper(columnSeparator, columnsDef) {
	_classCallCheck(this, CutWrapper);

	var cmd = 'cut';
	var args = ['-d', columnSeparator, '-f', columnsDef];

	var p = require('child_process').spawn(cmd, args, {
		stdio: ['pipe', 'pipe', process.stderr]
	});

	p.on('close', function (code, signal) {
		if (code !== 0) {
			throw new ChildProcessError(cmd, args, code, signal);
		}
	});

	this.process = p;
	this.stdin = p.stdin;
	this.stdout = p.stdout;
};

module.exports = CutWrapper;

},{"../error/ChildProcessError":52,"child_process":undefined}],65:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChildProcessError = require('../error/ChildProcessError');

var WcWrapper = function WcWrapper() {
	_classCallCheck(this, WcWrapper);

	var cmd = 'wc';
	var args = ['-l'];

	var p = require('child_process').spawn(cmd, args, {
		stdio: ['pipe', 'pipe', process.stderr]
	});

	p.on('close', function (code, signal) {
		if (code !== 0) {
			throw new ChildProcessError(cmd, args, code, signal);
		}
	});

	this.process = p;
	this.stdin = p.stdin;
	this.stdout = p.stdout;
};

module.exports = WcWrapper;

},{"../error/ChildProcessError":52,"child_process":undefined}],66:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transform = require('stream').Transform;
var Collator = require('../../Collator');

var SortInputTransform = function (_Transform) {
	_inherits(SortInputTransform, _Transform);

	/**
  *
  * @param {Order[]} orders
  * @returns {SortInputTransform}
  */
	function SortInputTransform(orders) {
		_classCallCheck(this, SortInputTransform);

		var _this = _possibleConstructorReturn(this, (SortInputTransform.__proto__ || Object.getPrototypeOf(SortInputTransform)).call(this, { objectMode: true }));

		_this.columnSeparator = '\t';

		/**
   * @type {Order[]}
   */
		_this.orders = orders;
		return _this;
	}

	_createClass(SortInputTransform, [{
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			/*
    * TODO compile key generation function
    */
			var output = '';

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = chunk[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var row = _step.value;

					var columnValues = [];

					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = this.orders[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var order = _step2.value;

							var key = Collator.generateSortKey(order.dataType, order.valueFunction(row));

							columnValues.push(key);
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					output += columnValues.join(this.columnSeparator) + this.columnSeparator + JSON.stringify(row) + '\n';
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (output.length) {
				this.push(output);
			}

			cb();
		}
	}]);

	return SortInputTransform;
}(Transform);

module.exports = SortInputTransform;

},{"../../Collator":17,"stream":undefined}],67:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChildProcessError = require('../../error/ChildProcessError');

var SortWrapper = function () {
	/**
  * @param {SortOptions} options
  */
	function SortWrapper(options) {
		_classCallCheck(this, SortWrapper);

		var sortCmd = options.path || 'sort';

		var argsHash = {
			'-u': !!options.unique,
			'-n': !!options.numeric,
			'-r': !!options.reverse,
			'-s': !!options.stable,
			'-m': !!options.merge,
			'-i': !!options.ignoreCase,
			'-R': !!options.sortByHash,
			'-T': options.tmpDir,
			'-S': options.bufferSize ? options.bufferSize + 'b' : null,
			'-t': options.separator,
			'--parallel': options.threads
		};

		var args = [];

		for (var opt in argsHash) {
			var optval = argsHash[opt];

			if (optval === null || optval === undefined || optval === false) {
				continue;
			}

			if (optval === true) {
				args.push(opt);
			} else {
				args.push(opt);
				args.push(optval.toString());
			}
		}

		if (options.keys) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = options.keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var keydef = _step.value;

					args.push('-k');
					args.push(keydef);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}

		var p = this._runSimple(sortCmd, args);

		p.on('close', function (code, signal) {
			if (code !== 0) {
				throw new ChildProcessError(sortCmd, args, code, signal);
			}
		});

		this.process = p;
		this.stdin = p.stdin;
		this.stdout = p.stdout;
	}

	_createClass(SortWrapper, [{
		key: '_runSimple',
		value: function _runSimple(cmd, args) {
			var options = {
				stdio: ['pipe', 'pipe', process.stderr],
				env: {
					LC_ALL: 'C'
				}
			};

			var p = require('child_process').spawn(cmd, args, options);

			return p;
		}
	}]);

	return SortWrapper;
}();

module.exports = SortWrapper;

},{"../../error/ChildProcessError":52,"child_process":undefined}],68:[function(require,module,exports){
'use strict';

/**
 * Ugly, write-only but fast implementation of stream JSON separating parser
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonBorderExplorer = function () {
	function JsonBorderExplorer() {
		_classCallCheck(this, JsonBorderExplorer);

		this.stack = [];

		this.nextCharEscaped = false;

		this.buf = null;
		this.off = null;

		this.pushedEarnedValue = null;

		this.objectState = null;
		this.arrayState = null;

		this.earningInProgress = false;
		this.keywordRemaining = 0;
	}

	_createClass(JsonBorderExplorer, [{
		key: 'write',
		value: function write(buf, off) {
			this.buf = buf;
			this.off = off;

			while (this.off < this.buf.length) {
				if (this.stack.length) {
					this.earningInProgress = true;
				}

				if (this.earnValue(true) !== null) {
					if (!this.stack.length) {
						this.buf = null; // just free link

						return this.off;
					}
				}
			}

			return -1;
		}
	}, {
		key: 'end',
		value: function end() {
			if (this.stack.length) {
				if (this.stack.length === 1 && this.stack[0] === JsonBorderExplorer.TYPE_NUMBER) {
					/*
      * number - единственный тип, конец которого детектится только
      * наличием следующего символа, поэтому если number в конце,
      * то его нужно детектить явно
      */
					return this.off;
				}

				throw new Error('Unexpected end of JSON, expected ending of: ' + this.stack.join(', '));
			}

			return -1;
		}
	}, {
		key: 'earnType',
		value: function earnType() {
			var chr = this.buf[this.off];

			this.off++;

			/* eslint-disable indent, no-unreachable */
			switch (chr) {
				case 0x22:
					// '"'
					return JsonBorderExplorer.TYPE_STRING;
					break;
				case 0x7b:
					// '{'
					this.objectState = null;

					return JsonBorderExplorer.TYPE_OBJECT;
					break;
				case 0x5b:
					// '['
					this.arrayState = null;

					return JsonBorderExplorer.TYPE_ARRAY;
					break;
				case 0x6e:
					// 'n'
					this.keywordRemaining = 3;

					return JsonBorderExplorer.TYPE_NULL;
					break;
				case 0x74:
					// 't'
					this.keywordRemaining = 3;

					return JsonBorderExplorer.TYPE_TRUE;
					break;
				case 0x66:
					// 'f'
					this.keywordRemaining = 4;

					return JsonBorderExplorer.TYPE_FALSE;
					break;
				default:
					// numbers
					if (chr >= 0x30 && chr <= 0x39 || chr === 0x2d) {
						// '0' - '9', '-'
						return JsonBorderExplorer.TYPE_NUMBER;
					}
			}
			/* eslint-enable indent, no-unreachable */

			throw new Error("Unexpected character: " + String.fromCharCode(chr));
		}
	}, {
		key: 'earnValue',
		value: function earnValue() {
			var ignoreStackedValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			if (!ignoreStackedValue && this.pushedEarnedValue !== null) {
				var v = this.pushedEarnedValue;

				this.pushedEarnedValue = null;

				return v;
			}

			var type = null;
			var stacked = this.earningInProgress;
			var stackSize = this.stack.length;

			if (this.earningInProgress) {
				type = this.stack[this.stack.length - 1];
			} else {
				if (!this.earnSpaces()) {
					return null;
				}

				this.earningInProgress = true;
				type = this.earnType();
			}

			var r = null;

			/* eslint-disable indent, no-unreachable, no-fallthrough */
			switch (type) {
				case JsonBorderExplorer.TYPE_STRING:
					r = this.earnString();
					break;
				case JsonBorderExplorer.TYPE_TRUE:
				case JsonBorderExplorer.TYPE_FALSE:
				case JsonBorderExplorer.TYPE_NULL:
					r = this.earnKeyword();
					break;
				case JsonBorderExplorer.TYPE_NUMBER:
					r = this.earnNumber();
					break;
				case JsonBorderExplorer.TYPE_OBJECT:
					r = this.earnObject();

					if (r !== null) {
						/*
      * восстанавливаем правильное состояние для родительского
      * объекта выше по дереву
      */
						this.objectState = 'valueReading';
					}
					break;
				case JsonBorderExplorer.TYPE_ARRAY:
					r = this.earnArray();

					if (r !== null) {
						/*
      * восстанавливаем правильное состояние для родительского
      * объекта выше по дереву
      */
						this.arrayState = 'valueReading';
					}
					break;
				default:
					throw new Error('Unknown type: ' + type);
			}
			/* eslint-enable indent, no-unreachable, no-fallthrough */

			if (r !== null) {
				this.pushedEarnedValue = r;
				this.earningInProgress = false;

				if (stacked) {
					this.stack.pop();
				}
			} else if (!stacked) {
				// значение не дочитали до конца - сохраним в стек, чтобы дочитать
				this.stack.splice(stackSize, 0, type);
			}

			return r;
		}
	}, {
		key: 'earnString',
		value: function earnString() {
			for (; this.off < this.buf.length; this.off++) {
				if (this.nextCharEscaped) {
					this.nextCharEscaped = false;
					continue;
				}

				var chr = this.buf[this.off];

				if (chr === 0x22) {
					// '"'
					this.off++;

					return true;
				}

				if (chr === 0x5c) {
					// '\'
					this.nextCharEscaped = true;
				}
			}

			return null;
		}
	}, {
		key: 'earnKeyword',
		value: function earnKeyword() {
			if (this.buf.length - this.off >= this.keywordRemaining) {
				this.off += this.keywordRemaining;

				return true;
			}

			this.keywordRemaining -= this.buf.length - this.off;

			this.off = this.buf.length;

			return null;
		}
	}, {
		key: 'earnNumber',
		value: function earnNumber() {
			for (; this.off < this.buf.length; this.off++) {
				var chr = this.buf[this.off];

				if (!(chr >= 0x30 && chr <= 0x39 || chr === 0x2d || chr === 0x2b || chr === 0x2e || chr === 0x45 || chr === 0x65)) {
					// '0' - '9', '-', 'E', 'e'
					return true;
				}
			}

			return null;
		}
	}, {
		key: 'earnObject',
		value: function earnObject() {
			while (this.off < this.buf.length) {
				/* eslint-disable indent, no-unreachable, no-fallthrough */
				switch (this.objectState) {
					case null:
						if (!this.earnSpaces()) {
							return null;
						}

						if (this.buf[this.off] !== 0x22) {
							// '"'
							if (this.buf[this.off] === 0x7d) {
								// '}'
								this.off++;

								return true;
							}

							throw new Error('Object key expected');
						}

						this.off++;

					case 'keyReading':
						if (this.earnString() === null) {
							this.objectState = 'keyReading';

							return null;
						}

					case 'colonReading':
						if (!this.earnSpaces()) {
							this.objectState = 'colonReading';

							return null;
						}

						if (this.buf[this.off] !== 0x3a) {
							// ':'
							throw new Error('Colon expected after object key');
						}

						this.off++;

					case 'beforeValue':
						if (!this.earnSpaces()) {
							this.objectState = 'beforeValue';

							return null;
						}

						this.earningInProgress = false;
						this.pushedEarnedValue = null;

					case 'valueReading':
						/*
       * состояние здесь унжно установить сразу т.к. оно может
       * меняться неявно
       */
						this.objectState = 'valueReading';

						if (this.earnValue() === null) {
							return null;
						}
					case 'commaOrEndReading':
						if (!this.earnSpaces()) {
							this.objectState = 'commaOrEndReading';

							return null;
						}

						if (this.buf[this.off] === 0x2c) {
							// ','
							this.objectState = null;
							this.off++;
						} else if (this.buf[this.off] === 0x7d) {
							// '}'
							this.off++;

							return true;
						} else {
							throw new Error('Comma or end of object expected');
						}
						break;
					default:
						throw new Error('Wrong state: ' + this.objectState);
				}
				/* eslint-enable indent, no-unreachable, no-fallthrough */
			}

			return null;
		}
	}, {
		key: 'earnArray',
		value: function earnArray() {
			while (this.off < this.buf.length) {
				/* eslint-disable indent, no-unreachable, no-fallthrough */
				switch (this.arrayState) {
					case null:
						if (!this.earnSpaces()) {
							return null;
						}

						if (this.buf[this.off] === 0x5d) {
							// ']'
							this.off++;

							return true;
						}
					case 'beforeValue':
						this.earningInProgress = false;
						this.pushedEarnedValue = null;
					case 'valueReading':
						this.arrayState = 'valueReading';

						if (this.earnValue() === null) {
							return null;
						}
					case 'commaOrEndReading':
						if (!this.earnSpaces()) {
							this.arrayState = 'commaOrEndReading';

							return null;
						}

						if (this.buf[this.off] === 0x2c) {
							// ','
							this.arrayState = null;
							this.off++;
						} else if (this.buf[this.off] === 0x5d) {
							// ']'
							this.off++;

							return true;
						} else {
							throw new Error('Comma or end of array expected');
						}

						break;
					default:
						throw new Error('Wrong state: ' + this.arrayState);
				}
				/* eslint-enable indent, no-unreachable, no-fallthrough */
			}

			return null;
		}
	}, {
		key: 'earnSpaces',
		value: function earnSpaces() {
			for (; this.off < this.buf.length; this.off++) {
				var chr = this.buf[this.off];

				if (!(chr === 0x20 || chr === 0x09 || chr === 0x0a || chr === 0x0d)) {
					return true;
				}
			}

			return null;
		}
	}]);

	return JsonBorderExplorer;
}();

JsonBorderExplorer.TYPE_STRING = 'string';
JsonBorderExplorer.TYPE_NUMBER = 'number';
JsonBorderExplorer.TYPE_TRUE = 'true';
JsonBorderExplorer.TYPE_FALSE = 'false';
JsonBorderExplorer.TYPE_NULL = 'null';
JsonBorderExplorer.TYPE_OBJECT = 'object';
JsonBorderExplorer.TYPE_ARRAY = 'array';

module.exports = JsonBorderExplorer;

},{}],69:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JlTransform = require('../stream/JlTransform');
var JlPassThrough = require('../stream/JlPassThrough');
var JlTransformsChain = require('../stream/JlTransformsChain');

var JsonParser = require('../stream/JsonParser');
var JsonSplitter = require('../stream/JsonSplitter');
var ChunkJoiner = require('../stream/ChunkJoiner');

var PublicSelectFrom = require('./PublicSelectFrom');

var DataSourceApiResolver = require('../DataSourceApiResolver');
var DataSourceResolversPool = require('../DataSourceResolversPool');

var Binder = require('../Binder');

var PublicSelect = function () {
	/**
  *
  * @param {Select} select
  * @param {DataSourceResolver[]} dataSourceResolvers
  * @returns {PublicSelect}
  */
	function PublicSelect(select) {
		var dataSourceResolvers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

		_classCallCheck(this, PublicSelect);

		this.select = select;
		this.binder = new Binder();
		this.dataSourceApiResolver = new DataSourceApiResolver();

		this.dataSourceResolversPool = new DataSourceResolversPool();

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = dataSourceResolvers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var resolver = _step.value;

				this.dataSourceResolversPool.add(resolver);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		this.dataSourceResolversPool.add(this.dataSourceApiResolver);
	}

	/**
  *
  * @param {string} ident
  * @param {mixed} value
  * @returns {this|PublicSelect}
  */


	_createClass(PublicSelect, [{
		key: 'bind',
		value: function bind(ident, value) {
			this.binder.bind(ident, value);

			return this;
		}

		/**
   * @param {Readable} input
   * @returns {PublicSelectFrom}
   */

	}, {
		key: '_selectFrom',
		value: function _selectFrom(input) {
			this.binder.expandInplace(this.select.ast);

			return new PublicSelectFrom(this, this.select, input);
		}

		/**
   *
   * @param {Readable} stream
   * @returns {PublicSelectFrom}
   */

	}, {
		key: 'fromJsonStream',
		value: function fromJsonStream(stream) {
			var chain = [new JsonSplitter(), new JsonParser()];

			if (stream) {
				chain.unshift(stream);
			}

			var input = new JlTransformsChain(chain);

			return this._selectFrom(input);
		}

		/**
   * Empty stream to support FROM clause
   * @returns {PublicSelectFrom}
   */

	}, {
		key: 'fromEmptyStream',
		value: function fromEmptyStream() {
			var stream = new JlPassThrough(JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS);

			stream.end();

			return this._selectFrom(stream);
		}

		/**
   *
   * @param {Readable} stream
   * @returns {PublicSelectFrom}
   */

	}, {
		key: 'fromObjectsStream',
		value: function fromObjectsStream(stream) {
			var input = new ChunkJoiner();

			if (stream) {
				input = new JlTransformsChain([stream, input]);
			}

			return this._selectFrom(input);
		}

		/**
   *
   * @param {ReadableStream} stream
   * @returns {PublicSelectFrom}
   */

	}, {
		key: 'fromArrayOfObjects',
		value: function fromArrayOfObjects(array) {
			var stream = new JlPassThrough(JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS);

			stream.end(array);

			return this._selectFrom(stream);
		}
	}]);

	return PublicSelect;
}();

module.exports = PublicSelect;

},{"../Binder":16,"../DataSourceApiResolver":22,"../DataSourceResolversPool":24,"../stream/ChunkJoiner":141,"../stream/JlPassThrough":145,"../stream/JlTransform":146,"../stream/JlTransformsChain":147,"../stream/JsonParser":149,"../stream/JsonSplitter":150,"./PublicSelectFrom":70}],70:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JlTransform = require('../stream/JlTransform');
var JlTransformsChain = require('../stream/JlTransformsChain');
var JlPassThrough = require('../stream/JlPassThrough');

var JsonStringifier = require('../stream/JsonStringifier');
var LinesJoiner = require('../stream/LinesJoiner');
var ChunkSplitter = require('../stream/ChunkSplitter');

var DataSource = require('../DataSource');

var JsonParser = require('../stream/JsonParser');
var JsonSplitter = require('../stream/JsonSplitter');
var ChunkJoiner = require('../stream/ChunkJoiner');

var ProgramError = require('../error/ProgramError');

var PublicSelectFrom = function () {
	function PublicSelectFrom(publicSelect, select, inputStream) {
		_classCallCheck(this, PublicSelectFrom);

		this.publicSelect = publicSelect;
		this.select = select;
		this.inputStream = inputStream;
	}

	/**
  *
  * @param {Writable} stream
  * @returns {Transform}
  */


	_createClass(PublicSelectFrom, [{
		key: 'toObjectsStream',
		value: function toObjectsStream() {
			var stream = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			var chain = [this.inputStream, this.select.stream(this.publicSelect.dataSourceResolversPool), new ChunkSplitter()];

			if (stream) {
				stream.push(stream);
			}

			return new JlTransformsChain(chain);
		}

		/**
   *
   * @param {Writable} stream
   * @returns {Transform}
   */

	}, {
		key: 'toJsonStream',
		value: function toJsonStream() {
			var outputStream = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			var chain = [this.inputStream, this.select.stream(this.publicSelect.dataSourceResolversPool), new JsonStringifier(), new LinesJoiner()];

			if (outputStream) {
				chain.push(outputStream);
			}

			var stream = new JlTransformsChain(chain);

			return stream;
		}

		/**
   *
   * @param {Writable} stream
   * @returns {Transform}
   */

	}, {
		key: 'toArrayOfObjects',
		value: function toArrayOfObjects(cb) {
			if (typeof cb !== 'function') {
				throw new ProgramError('Function argument expected');
			}

			var output = this.toObjectsStream();
			var objects = [];

			output.on('data', function (object) {
				objects.push(object);
			});

			output.on('end', function () {
				cb(objects);
			});

			return output;
		}

		/**
   *
   * @param {string[]|string} location
   * @param {Object[]} array
   * @returns {PublicSelectFrom}
   */

	}, {
		key: 'addArrayOfObjects',
		value: function addArrayOfObjects(location, array) {
			var stream = new JlPassThrough(JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS);

			stream.end(array);

			this.publicSelect.dataSourceApiResolver.addDataSource(this._path(location), new DataSource(stream));

			return this;
		}

		/**
   *
   * @param {string[]|string} location
   * @param {Readable} stream
   * @returns {PublicSelectFrom}
   */

	}, {
		key: 'addJsonStream',
		value: function addJsonStream(location, stream) {
			var chain = new JlTransformsChain([stream, new JsonSplitter(), new JsonParser()]);

			this.publicSelect.dataSourceApiResolver.addDataSource(this._path(location), new DataSource(chain));

			return this;
		}

		/**
   *
   * @param {string[]|string} location
   * @param {Readable} stream
   * @returns {PublicSelectFrom}
   */

	}, {
		key: 'addObjectsStream',
		value: function addObjectsStream(location, stream) {
			this.publicSelect.dataSourceApiResolver.addDataSource(this._path(location), new DataSource(stream.pipe(new ChunkJoiner())));

			return this;
		}

		/**
   *
   * @param {string[]|string} location
   * @returns {string[]}
   */

	}, {
		key: '_path',
		value: function _path(location) {
			if (typeof location === 'string') {
				return [location];
			}

			if (!(location instanceof Array)) {
				throw new ProgramError('Array or string expected');
			}

			return location;
		}
	}]);

	return PublicSelectFrom;
}();

module.exports = PublicSelectFrom;

},{"../DataSource":21,"../error/ProgramError":59,"../stream/ChunkJoiner":141,"../stream/ChunkSplitter":142,"../stream/JlPassThrough":145,"../stream/JlTransform":146,"../stream/JlTransformsChain":147,"../stream/JsonParser":149,"../stream/JsonSplitter":150,"../stream/JsonStringifier":151,"../stream/LinesJoiner":152}],71:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('util');
var ProgramError = require('../error/ProgramError');
var ImplementationRequired = require('../error/ImplementationRequired');

var Node = function () {
	function Node() {
		_classCallCheck(this, Node);

		Node.lastId++;
		this.id = 'Node_' + Node.lastId;
	}

	/**
  *
  * @returns {string}
  */


	_createClass(Node, [{
		key: 'type',
		value: function type() {
			return this.constructor.name;
		}

		/**
   * Must be overrided in bracket-like nodes
   * @returns {string}
   */

	}, {
		key: 'deepType',
		value: function deepType() {
			return this.type();
		}
	}, {
		key: 'inspect',
		value: function inspect(depth, opts) {
			var obj = {};

			for (var k in this) {
				if (this.hasOwnProperty(k)) {
					obj[k] = this[k];
				}
			}

			var type = this.type();

			if (opts && opts.colors) {
				var color = util.inspect.colors[util.inspect.styles.special][0];

				type = '\x1b[' + color + 'm' + type + '\x1b[0m';
			}

			return type + ' ' + util.inspect(obj, opts);
		}

		/**
   * @returns {Node[]}
   */

	}, {
		key: 'childNodes',
		value: function childNodes() {
			throw new ImplementationRequired(this.type() + '::childNodes()');
		}
	}, {
		key: 'eachChildNodeRecursive',
		value: function eachChildNodeRecursive(cb) {
			var childs = this.childNodes();

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = childs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var child = _step.value;

					cb(child);

					child.eachChildNodeRecursive(cb);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}

		/**
   *
   * @returns {Node[]}
   */

	}, {
		key: 'childNodesRecursive',
		value: function childNodesRecursive() {
			var nodes = [];

			this.eachChildNodeRecursive(function (f) {
				nodes.push(f);
			});

			return nodes;
		}

		/**
   *
   * @returns {Node}
   */

	}, {
		key: 'clone',
		value: function clone() {
			var clone = function clone(value) {
				var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

				if (type === 'object') {
					if (value === null) {

						return null;
					} else if (value instanceof Node) {

						return value.clone();
					} else if (value instanceof Array) {

						return value.slice().map(clone);
					} else {
						throw new ProgramError('Non-cloneable object');
					}
				} else {
					return value;
				}
			};

			var copy = Object.create(this.constructor.prototype);

			for (var k in this) {
				copy[k] = clone(this[k]);
			}

			Node.lastId++;
			copy.id = Node.lastId;

			return copy;
		}
	}]);

	return Node;
}();

Node.lastId = 0;

module.exports = Node;

},{"../error/ImplementationRequired":54,"../error/ProgramError":59,"util":undefined}],72:[function(require,module,exports){
'use strict';

// generated by `make`

exports['Array'] = require('./nodes/Array.js');
exports['BetweenOperation'] = require('./nodes/BetweenOperation.js');
exports['BinaryArithmeticOperation'] = require('./nodes/BinaryArithmeticOperation.js');
exports['BinaryOperation'] = require('./nodes/BinaryOperation.js');
exports['BindingIdent'] = require('./nodes/BindingIdent.js');
exports['BindingIdentList'] = require('./nodes/BindingIdentList.js');
exports['BindingValueList'] = require('./nodes/BindingValueList.js');
exports['BindingValueScalar'] = require('./nodes/BindingValueScalar.js');
exports['Boolean'] = require('./nodes/Boolean.js');
exports['Brackets'] = require('./nodes/Brackets.js');
exports['Call'] = require('./nodes/Call.js');
exports['Column'] = require('./nodes/Column.js');
exports['ColumnIdent'] = require('./nodes/ColumnIdent.js');
exports['ComparisonOperation'] = require('./nodes/ComparisonOperation.js');
exports['ComplexIdent'] = require('./nodes/ComplexIdent.js');
exports['DataSourceIdent'] = require('./nodes/DataSourceIdent.js');
exports['Delete'] = require('./nodes/Delete.js');
exports['ExpressionsList'] = require('./nodes/ExpressionsList.js');
exports['FunctionIdent'] = require('./nodes/FunctionIdent.js');
exports['GroupBy'] = require('./nodes/GroupBy.js');
exports['Ident'] = require('./nodes/Ident.js');
exports['InnerJoin'] = require('./nodes/InnerJoin.js');
exports['Insert'] = require('./nodes/Insert.js');
exports['Interval'] = require('./nodes/Interval.js');
exports['IntervalOperation'] = require('./nodes/IntervalOperation.js');
exports['IsOperation'] = require('./nodes/IsOperation.js');
exports['LeftJoin'] = require('./nodes/LeftJoin.js');
exports['LikeOperation'] = require('./nodes/LikeOperation.js');
exports['Limit'] = require('./nodes/Limit.js');
exports['LogicalOperation'] = require('./nodes/LogicalOperation.js');
exports['Map'] = require('./nodes/Map.js');
exports['Null'] = require('./nodes/Null.js');
exports['Number'] = require('./nodes/Number.js');
exports['OrderBy'] = require('./nodes/OrderBy.js');
exports['RegexpOperation'] = require('./nodes/RegexpOperation.js');
exports['Select'] = require('./nodes/Select.js');
exports['StrictIn'] = require('./nodes/StrictIn.js');
exports['String'] = require('./nodes/String.js');
exports['Table'] = require('./nodes/Table.js');
exports['TableAlias'] = require('./nodes/TableAlias.js');
exports['TableLocation'] = require('./nodes/TableLocation.js');
exports['UnaryArithmeticOperation'] = require('./nodes/UnaryArithmeticOperation.js');
exports['UnaryLogicalOperation'] = require('./nodes/UnaryLogicalOperation.js');
exports['UnaryOperation'] = require('./nodes/UnaryOperation.js');
exports['UnstrictIn'] = require('./nodes/UnstrictIn.js');
exports['Update'] = require('./nodes/Update.js');
exports['UpdateSet'] = require('./nodes/UpdateSet.js');

},{"./nodes/Array.js":74,"./nodes/BetweenOperation.js":75,"./nodes/BinaryArithmeticOperation.js":76,"./nodes/BinaryOperation.js":77,"./nodes/BindingIdent.js":78,"./nodes/BindingIdentList.js":79,"./nodes/BindingValueList.js":80,"./nodes/BindingValueScalar.js":81,"./nodes/Boolean.js":82,"./nodes/Brackets.js":83,"./nodes/Call.js":84,"./nodes/Column.js":85,"./nodes/ColumnIdent.js":86,"./nodes/ComparisonOperation.js":87,"./nodes/ComplexIdent.js":88,"./nodes/DataSourceIdent.js":89,"./nodes/Delete.js":90,"./nodes/ExpressionsList.js":91,"./nodes/FunctionIdent.js":92,"./nodes/GroupBy.js":93,"./nodes/Ident.js":94,"./nodes/InnerJoin.js":95,"./nodes/Insert.js":96,"./nodes/Interval.js":97,"./nodes/IntervalOperation.js":98,"./nodes/IsOperation.js":99,"./nodes/LeftJoin.js":100,"./nodes/LikeOperation.js":101,"./nodes/Limit.js":102,"./nodes/LogicalOperation.js":103,"./nodes/Map.js":104,"./nodes/Null.js":105,"./nodes/Number.js":106,"./nodes/OrderBy.js":107,"./nodes/RegexpOperation.js":108,"./nodes/Select.js":109,"./nodes/StrictIn.js":110,"./nodes/String.js":111,"./nodes/Table.js":112,"./nodes/TableAlias.js":113,"./nodes/TableLocation.js":114,"./nodes/UnaryArithmeticOperation.js":115,"./nodes/UnaryLogicalOperation.js":116,"./nodes/UnaryOperation.js":117,"./nodes/UnstrictIn.js":118,"./nodes/Update.js":119,"./nodes/UpdateSet.js":120}],73:[function(require,module,exports){
"use strict";

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
    var o = function o(k, v, _o, l) {
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
    },
        $V0 = [1, 62],
        $V1 = [1, 63],
        $V2 = [1, 64],
        $V3 = [1, 65],
        $V4 = [1, 66],
        $V5 = [1, 67],
        $V6 = [1, 68],
        $V7 = [1, 69],
        $V8 = [1, 70],
        $V9 = [1, 71],
        $Va = [1, 72],
        $Vb = [1, 73],
        $Vc = [1, 74],
        $Vd = [1, 75],
        $Ve = [1, 76],
        $Vf = [1, 77],
        $Vg = [1, 78],
        $Vh = [1, 79],
        $Vi = [1, 80],
        $Vj = [1, 81],
        $Vk = [1, 82],
        $Vl = [1, 83],
        $Vm = [1, 84],
        $Vn = [1, 85],
        $Vo = [1, 86],
        $Vp = [1, 87],
        $Vq = [1, 88],
        $Vr = [1, 89],
        $Vs = [1, 90],
        $Vt = [1, 91],
        $Vu = [1, 92],
        $Vv = [1, 93],
        $Vw = [1, 94],
        $Vx = [1, 95],
        $Vy = [1, 96],
        $Vz = [1, 97],
        $VA = [1, 98],
        $VB = [1, 99],
        $VC = [1, 100],
        $VD = [1, 54],
        $VE = [1, 51],
        $VF = [1, 52],
        $VG = [1, 45],
        $VH = [1, 101],
        $VI = [1, 55],
        $VJ = [1, 61],
        $VK = [1, 60],
        $VL = [1, 57],
        $VM = [1, 58],
        $VN = [1, 59],
        $VO = [1, 41],
        $VP = [1, 44],
        $VQ = [1, 34],
        $VR = [1, 35],
        $VS = [1, 36],
        $VT = [1, 40],
        $VU = [1, 103],
        $VV = [5, 25],
        $VW = [5, 21, 25],
        $VX = [5, 21, 24, 25],
        $VY = [5, 21, 22, 24, 25],
        $VZ = [5, 20, 21, 22, 24, 25],
        $V_ = [5, 20, 21, 22, 24, 25, 29, 30, 31],
        $V$ = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 52, 53, 56, 58, 63, 68, 71, 76, 77, 78, 82, 84, 86, 92, 93, 102, 103],
        $V01 = [5, 66],
        $V11 = [1, 124],
        $V21 = [1, 125],
        $V31 = [5, 15, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 66, 69, 73, 83, 107, 131],
        $V41 = [1, 141],
        $V51 = [1, 142],
        $V61 = [1, 143],
        $V71 = [1, 144],
        $V81 = [1, 145],
        $V91 = [1, 146],
        $Va1 = [1, 128],
        $Vb1 = [1, 129],
        $Vc1 = [1, 130],
        $Vd1 = [1, 131],
        $Ve1 = [1, 132],
        $Vf1 = [1, 133],
        $Vg1 = [1, 134],
        $Vh1 = [1, 135],
        $Vi1 = [1, 136],
        $Vj1 = [1, 137],
        $Vk1 = [1, 138],
        $Vl1 = [1, 139],
        $Vm1 = [1, 140],
        $Vn1 = [5, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 66, 69, 73, 83, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 131],
        $Vo1 = [1, 151],
        $Vp1 = [5, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 55, 66, 69, 73, 82, 83, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 118, 131],
        $Vq1 = [5, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 55, 64, 66, 69, 73, 82, 83, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 118, 131],
        $Vr1 = [1, 156],
        $Vs1 = [1, 161],
        $Vt1 = [2, 27],
        $Vu1 = [5, 15, 20, 21, 22, 24, 25, 29, 30, 31],
        $Vv1 = [1, 175],
        $Vw1 = [5, 15, 20, 21, 22, 24, 25, 29, 30, 31, 66],
        $Vx1 = [1, 182],
        $Vy1 = [1, 183],
        $Vz1 = [1, 184],
        $VA1 = [1, 190],
        $VB1 = [1, 209],
        $VC1 = [1, 210],
        $VD1 = [1, 211],
        $VE1 = [1, 212],
        $VF1 = [1, 213],
        $VG1 = [5, 15, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 42, 66, 69, 73, 83, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 131],
        $VH1 = [1, 224],
        $VI1 = [66, 73, 83],
        $VJ1 = [66, 69],
        $VK1 = [5, 20, 21, 22, 24, 25, 29, 30, 31, 118],
        $VL1 = [1, 214],
        $VM1 = [5, 15, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 42, 66, 69, 73, 83, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 131],
        $VN1 = [5, 18, 19, 42, 66, 69, 73, 83, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 131],
        $VO1 = [5, 15, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 42, 66, 69, 73, 83, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 131],
        $VP1 = [5, 15, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 42, 66, 69, 73, 83, 98, 99, 100, 101, 104, 107, 131],
        $VQ1 = [5, 15, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 66, 69, 73, 83, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 131],
        $VR1 = [5, 25, 66],
        $VS1 = [5, 21, 24, 25, 66],
        $VT1 = [5, 15, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 42, 66, 69, 73, 83, 104, 107, 131],
        $VU1 = [1, 283],
        $VV1 = [1, 284],
        $VW1 = [1, 285],
        $VX1 = [1, 286],
        $VY1 = [1, 287],
        $VZ1 = [1, 288],
        $V_1 = [5, 20, 66],
        $V$1 = [5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 52, 53, 56, 58, 63, 66, 68, 69, 71, 73, 76, 77, 78, 82, 83, 84, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 107, 131];
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "queries": 3, "insert": 4, "EOF": 5, "delete": 6, "select": 7, "update": 8, "keywords": 9, "SELECT": 10, "DELETE": 11, "INSERT": 12, "UPDATE": 13, "SET": 14, "FROM": 15, "STRICT": 16, "IN": 17, "AND": 18, "OR": 19, "WHERE": 20, "ORDER": 21, "GROUP": 22, "BY": 23, "HAVING": 24, "LIMIT": 25, "OFFSET": 26, "ASC": 27, "DESC": 28, "JOIN": 29, "LEFT": 30, "INNER": 31, "INTERVAL": 32, "YEAR": 33, "MONTH": 34, "DAY": 35, "HOUR": 36, "MINUTE": 37, "SECOND": 38, "LIKE": 39, "ILIKE": 40, "REGEXP": 41, "NOT": 42, "IS_KEYWORD": 43, "STRING_KEYWORD": 44, "NUMBER_KEYWORD": 45, "BOOL_KEYWORD": 46, "OBJECT_KEYWORD": 47, "ARRAY_KEYWORD": 48, "dataSourceIdent": 49, "DATA_SOURCE_IDENT": 50, "ident": 51, "IDENT": 52, "BINDING_IDENT": 53, "complexIdent": 54, ".": 55, "BINDING_IDENT_LIST": 56, "number": 57, "NUMBER": 58, "intervalUnit": 59, "interval": 60, "expression": 61, "jsonObjectItem": 62, "STRING": 63, ":": 64, "jsonObjectItems": 65, ",": 66, "jsonObject": 67, "{": 68, "}": 69, "jsonArray": 70, "[": 71, "expressionsList": 72, "]": 73, "jsonValue": 74, "scalarConst": 75, "NULL": 76, "TRUE": 77, "FALSE": 78, "const": 79, "predicate": 80, "callExpression": 81, "(": 82, ")": 83, "COUNT": 84, "DISTINCT": 85, "*": 86, "typeKeyword": 87, "isExpression": 88, "baseExpression": 89, "%": 90, "/": 91, "+": 92, "-": 93, "=": 94, "!==": 95, "===": 96, "!=": 97, ">": 98, ">=": 99, "<": 100, "<=": 101, "!": 102, "BINDING_VALUE_SCALAR": 103, "BETWEEN": 104, "BINDING_VALUE_LIST": 105, "column": 106, "AS": 107, "columns": 108, "selectClause": 109, "deleteClause": 110, "insertClause": 111, "VALUES": 112, "updateClause": 113, "selectColumns": 114, "table": 115, "selectFrom": 116, "join": 117, "ON": 118, "selectJoin": 119, "where": 120, "selectWhere": 121, "deleteWhere": 122, "insertValues": 123, "updateSets": 124, "updateWhere": 125, "groupping": 126, "grouppingList": 127, "selectGroup": 128, "selectHaving": 129, "order": 130, "NUMERIC": 131, "ordersList": 132, "selectOrder": 133, "selectLimit": 134, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 10: "SELECT", 11: "DELETE", 12: "INSERT", 13: "UPDATE", 14: "SET", 15: "FROM", 16: "STRICT", 17: "IN", 18: "AND", 19: "OR", 20: "WHERE", 21: "ORDER", 22: "GROUP", 23: "BY", 24: "HAVING", 25: "LIMIT", 26: "OFFSET", 27: "ASC", 28: "DESC", 29: "JOIN", 30: "LEFT", 31: "INNER", 32: "INTERVAL", 33: "YEAR", 34: "MONTH", 35: "DAY", 36: "HOUR", 37: "MINUTE", 38: "SECOND", 39: "LIKE", 40: "ILIKE", 41: "REGEXP", 42: "NOT", 43: "IS_KEYWORD", 44: "STRING_KEYWORD", 45: "NUMBER_KEYWORD", 46: "BOOL_KEYWORD", 47: "OBJECT_KEYWORD", 48: "ARRAY_KEYWORD", 50: "DATA_SOURCE_IDENT", 52: "IDENT", 53: "BINDING_IDENT", 55: ".", 56: "BINDING_IDENT_LIST", 58: "NUMBER", 63: "STRING", 64: ":", 66: ",", 68: "{", 69: "}", 71: "[", 73: "]", 76: "NULL", 77: "TRUE", 78: "FALSE", 82: "(", 83: ")", 84: "COUNT", 85: "DISTINCT", 86: "*", 90: "%", 91: "/", 92: "+", 93: "-", 94: "=", 95: "!==", 96: "===", 97: "!=", 98: ">", 99: ">=", 100: "<", 101: "<=", 102: "!", 103: "BINDING_VALUE_SCALAR", 104: "BETWEEN", 105: "BINDING_VALUE_LIST", 107: "AS", 112: "VALUES", 118: "ON", 131: "NUMERIC" },
        productions_: [0, [3, 2], [3, 2], [3, 2], [3, 2], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [49, 1], [51, 1], [51, 1], [51, 1], [54, 3], [54, 3], [54, 1], [54, 1], [54, 1], [57, 1], [59, 1], [59, 1], [59, 1], [59, 1], [59, 1], [59, 1], [60, 3], [60, 3], [62, 3], [62, 3], [65, 1], [65, 3], [67, 3], [67, 2], [70, 3], [70, 2], [74, 1], [74, 1], [75, 1], [75, 1], [75, 1], [75, 1], [75, 1], [79, 1], [61, 1], [61, 3], [61, 3], [81, 4], [81, 3], [81, 4], [81, 5], [81, 4], [81, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [88, 3], [88, 3], [88, 4], [88, 4], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 3], [89, 2], [89, 2], [89, 2], [89, 6], [89, 5], [89, 1], [89, 1], [89, 1], [89, 1], [89, 3], [89, 1], [89, 3], [89, 3], [89, 4], [89, 4], [89, 3], [89, 4], [89, 1], [80, 5], [80, 6], [80, 1], [72, 3], [72, 3], [72, 1], [72, 1], [106, 3], [106, 3], [106, 1], [108, 3], [108, 1], [109, 2], [109, 1], [110, 1], [111, 2], [113, 1], [114, 2], [114, 4], [114, 2], [115, 3], [115, 1], [116, 3], [116, 1], [117, 4], [117, 5], [117, 5], [119, 2], [119, 1], [120, 2], [121, 2], [121, 1], [122, 2], [122, 1], [123, 2], [123, 3], [124, 5], [124, 5], [125, 2], [125, 1], [126, 1], [127, 3], [127, 1], [128, 4], [128, 1], [129, 3], [129, 1], [130, 2], [130, 2], [130, 1], [130, 3], [130, 3], [130, 2], [132, 3], [132, 1], [133, 4], [133, 1], [134, 5], [134, 5], [134, 3], [134, 1], [7, 1], [6, 1], [4, 1], [8, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:case 2:case 3:case 4:
                    return $$[$0 - 1];
                    break;
                case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 23:case 24:case 25:case 26:case 27:case 28:case 29:case 30:case 31:case 32:case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 87:case 88:case 89:case 90:case 91:case 116:case 121:case 128:case 189:
                    this.$ = $$[$0];
                    break;
                case 44:
                    this.$ = new Nodes.DataSourceIdent($$[$0]);
                    break;
                case 45:case 47:
                    this.$ = new Nodes.Ident($$[$0]);
                    break;
                case 46:
                    this.$ = new Nodes.BindingIdent($$[$0]);
                    break;
                case 48:
                    $$[$0 - 2].addFragment($$[$0]);this.$ = $$[$0 - 2];
                    break;
                case 49:
                    $$[$0 - 2].addFragment(new Nodes.BindingIdentList($$[$0]));this.$ = $$[$0 - 2];
                    break;
                case 50:
                    this.$ = new Nodes.ComplexIdent(['@', new Nodes.BindingIdentList($$[$0])]);
                    break;
                case 51:
                    this.$ = new Nodes.ComplexIdent(['@', $$[$0]]);
                    break;
                case 52:
                    this.$ = new Nodes.ComplexIdent([$$[$0].name]);
                    break;
                case 53:
                    this.$ = new Nodes.Number($$[$0]);
                    break;
                case 54:
                    this.$ = Nodes.Interval.UNIT_YEAR;
                    break;
                case 55:
                    this.$ = Nodes.Interval.UNIT_MONTH;
                    break;
                case 56:
                    this.$ = Nodes.Interval.UNIT_DAY;
                    break;
                case 57:
                    this.$ = Nodes.Interval.UNIT_HOUR;
                    break;
                case 58:
                    this.$ = Nodes.Interval.UNIT_MINUTE;
                    break;
                case 59:
                    this.$ = Nodes.Interval.UNIT_SECOND;
                    break;
                case 60:
                    this.$ = new Nodes.Interval();this.$.add($$[$0 - 1], $$[$0]);
                    break;
                case 61:
                    this.$.add($$[$0 - 1], $$[$0]);
                    break;
                case 62:
                    this.$ = { key: new Nodes.String($$[$0 - 2]).value, value: $$[$0] };
                    break;
                case 63:
                    this.$ = { key: $$[$0 - 2].name, value: $$[$0] };
                    break;
                case 64:
                    this.$ = {};this.$[$$[$0].key] = $$[$0].value;
                    break;
                case 65:
                    this.$ = $$[$0 - 2];this.$[$$[$0].key] = $$[$0].value;
                    break;
                case 66:
                    this.$ = new Nodes.Map($$[$0 - 1]);
                    break;
                case 67:
                    this.$ = new Nodes.Map({});
                    break;
                case 68:
                    this.$ = new Nodes.Array($$[$0 - 1].values);
                    break;
                case 69:
                    this.$ = new Nodes.Array([]);
                    break;
                case 70:case 71:case 73:case 77:case 118:case 157:case 158:case 160:case 162:case 168:case 173:case 175:case 185:case 190:case 191:case 192:case 193:
                    this.$ = $$[$0];
                    break;
                case 72:
                    this.$ = new Nodes.String($$[$0]);
                    break;
                case 74:
                    this.$ = new Nodes.Null();
                    break;
                case 75:
                    this.$ = new Nodes.Boolean(true);
                    break;
                case 76:
                    this.$ = new Nodes.Boolean(false);
                    break;
                case 79:case 80:
                    this.$ = new Nodes.LogicalOperation($$[$0 - 1], $$[$0 - 2], $$[$0]);
                    break;
                case 81:
                    this.$ = new Nodes.Call(new Nodes.FunctionIdent($$[$0 - 3]), $$[$0 - 1]);
                    break;
                case 82:
                    this.$ = new Nodes.Call(new Nodes.FunctionIdent($$[$0 - 2]));
                    break;
                case 83:
                    this.$ = new Nodes.Call(new Nodes.FunctionIdent(new Nodes.ComplexIdent(['@', $$[$0 - 3]])), new Nodes.ExpressionsList([$$[$0 - 1]]));
                    break;
                case 84:
                    this.$ = new Nodes.Call(new Nodes.FunctionIdent(new Nodes.ComplexIdent(['@', 'COUNT_DISTINCT'])), new Nodes.ExpressionsList([$$[$0 - 1]]));
                    break;
                case 85:
                    this.$ = new Nodes.Call(new Nodes.FunctionIdent(new Nodes.ComplexIdent(['@', $$[$0 - 3]])));
                    break;
                case 86:
                    this.$ = new Nodes.ColumnIdent(['@', $$[$0]]);
                    break;
                case 92:case 93:
                    this.$ = new Nodes.IsOperation($$[$0 - 2], $$[$0]);
                    break;
                case 94:case 95:
                    this.$ = new Nodes.UnaryLogicalOperation('!', new Nodes.IsOperation($$[$0 - 3], $$[$0]));
                    break;
                case 96:case 97:case 98:case 99:case 100:
                    this.$ = new Nodes.BinaryArithmeticOperation($$[$0 - 1], $$[$0 - 2], $$[$0]);
                    break;
                case 101:case 102:
                    this.$ = new Nodes.IntervalOperation($$[$0 - 1], $$[$0 - 2], $$[$0]);
                    break;
                case 103:case 104:case 105:case 106:case 107:case 108:case 109:case 110:
                    this.$ = new Nodes.ComparisonOperation($$[$0 - 1], $$[$0 - 2], $$[$0]);
                    break;
                case 111:case 112:
                    this.$ = new Nodes.UnaryArithmeticOperation($$[$0 - 1], $$[$0]);
                    break;
                case 113:
                    this.$ = new Nodes.UnaryLogicalOperation($$[$0 - 1], $$[$0]);
                    break;
                case 114:
                    this.$ = new Nodes.StrictIn($$[$0 - 5], $$[$0 - 1]);
                    break;
                case 115:
                    this.$ = new Nodes.UnstrictIn($$[$0 - 4], $$[$0 - 1]);
                    break;
                case 117:
                    this.$ = Nodes.ColumnIdent.fromComplexIdent($$[$0]);
                    break;
                case 119:
                    this.$ = new Nodes.BindingValueScalar($$[$0]);
                    break;
                case 120:
                    this.$ = new Nodes.Brackets($$[$0 - 1]);
                    break;
                case 122:case 123:
                    this.$ = new Nodes.LikeOperation($$[$0 - 1], $$[$0 - 2], $$[$0]);
                    break;
                case 124:case 125:
                    this.$ = new Nodes.UnaryLogicalOperation('!', new Nodes.LikeOperation($$[$0 - 1], $$[$0 - 3], $$[$0]));
                    break;
                case 126:
                    this.$ = new Nodes.RegexpOperation($$[$0 - 1], $$[$0 - 2], $$[$0]);
                    break;
                case 127:
                    this.$ = new Nodes.UnaryLogicalOperation('!', new Nodes.RegexpOperation($$[$0 - 1], $$[$0 - 3], $$[$0]));
                    break;
                case 129:
                    this.$ = new Nodes.BetweenOperation($$[$0 - 4], $$[$0 - 2], $$[$0]);
                    break;
                case 130:
                    this.$ = new Nodes.UnaryLogicalOperation('!', new Nodes.BetweenOperation($$[$0 - 5], $$[$0 - 2], $$[$0]));
                    break;
                case 132:case 170:case 182:
                    $$[$0 - 2].push($$[$0]);this.$ = $$[$0 - 2];
                    break;
                case 133:
                    $$[$0 - 2].push(new Nodes.BindingValueList($$[$0]));this.$ = $$[$0 - 2];
                    break;
                case 134:
                    this.$ = new Nodes.ExpressionsList([new Nodes.BindingValueList($$[$0])]);
                    break;
                case 135:
                    this.$ = new Nodes.ExpressionsList([$$[$0]]);
                    break;
                case 136:
                    this.$ = new Nodes.Column($$[$0 - 2], $$[$0]);
                    break;
                case 137:
                    this.$ = new Nodes.Column($$[$0 - 2], new Nodes.ColumnIdent(['@', $$[$0]]));
                    break;
                case 138:
                    var sql = yy.lexer[JL_JISON_INPUT_SYMBOL].slice(this._$.range[0], this._$.range[1]);this.$ = new Nodes.Column($$[$0], null, sql);
                    break;
                case 139:
                    this.$ = $$[$0 - 2].concat($$[$0]);
                    break;
                case 140:case 171:case 183:
                    this.$ = [$$[$0]];
                    break;
                case 141:
                    this.$ = new Nodes.Select();this.$.distinct = true;
                    break;
                case 142:
                    this.$ = new Nodes.Select();
                    break;
                case 143:
                    this.$ = new Nodes.Delete();
                    break;
                case 144:
                    this.$ = new Nodes.Insert();
                    break;
                case 145:
                    this.$ = new Nodes.Update();
                    break;
                case 146:
                    $$[$0 - 1].columns = $$[$0];this.$ = $$[$0 - 1];
                    break;
                case 147:
                    $$[$0 - 3].allColumns = true;$$[$0 - 3].columns = $$[$0];this.$ = $$[$0 - 3];
                    break;
                case 148:
                    $$[$0 - 1].columns = [];$$[$0 - 1].allColumns = true;this.$ = $$[$0 - 1];
                    break;
                case 149:
                    this.$ = new Nodes.Table(new Nodes.TableLocation($$[$0 - 2]), new Nodes.TableAlias($$[$0]));
                    break;
                case 150:
                    this.$ = new Nodes.Table(new Nodes.TableLocation($$[$0]));
                    break;
                case 151:
                    $$[$0 - 2].table = $$[$0];this.$ = $$[$0 - 2];
                    break;
                case 152:
                    $$[$0].table = null;this.$ = $$[$0];
                    break;
                case 153:case 154:
                    this.$ = new Nodes.InnerJoin($$[$0 - 2], $$[$0]);
                    break;
                case 155:
                    this.$ = new Nodes.LeftJoin($$[$0 - 2], $$[$0]);
                    break;
                case 156:
                    this.$ = $$[$0 - 1];this.$.join($$[$0]);
                    break;
                case 159:case 161:case 167:
                    this.$ = $$[$0 - 1];this.$.where = $$[$0];
                    break;
                case 163:
                    this.$ = new Nodes.Insert([$$[$0]]);
                    break;
                case 164:
                    this.$ = $$[$0 - 2];this.$.push($$[$0]);
                    break;
                case 165:
                    this.$ = new Nodes.Update();this.$.sets.push(new Nodes.UpdateSet($$[$0 - 2], $$[$0]));
                    break;
                case 166:
                    this.$ = $$[$0 - 4];this.$.sets.push(new Nodes.UpdateSet($$[$0 - 2], $$[$0]));
                    break;
                case 169:
                    this.$ = new Nodes.GroupBy($$[$0]);
                    break;
                case 172:
                    $$[$0 - 3].groups = $$[$0];this.$ = $$[$0 - 3];
                    break;
                case 174:
                    $$[$0 - 2].having = $$[$0];this.$ = $$[$0 - 2];
                    break;
                case 176:case 177:
                    this.$ = new Nodes.OrderBy($$[$0 - 1], $$[$0]);
                    break;
                case 178:
                    this.$ = new Nodes.OrderBy($$[$0]);
                    break;
                case 179:case 180:
                    this.$ = new Nodes.OrderBy($$[$0 - 2], $$[$0], $$[$0 - 1]);
                    break;
                case 181:
                    this.$ = new Nodes.OrderBy($$[$0 - 1], 'ASC', $$[$0]);
                    break;
                case 184:
                    $$[$0 - 3].orders = $$[$0];this.$ = $$[$0 - 3];
                    break;
                case 186:
                    $$[$0 - 4].setLimit($$[$0].value, $$[$0 - 2].value);this.$ = $$[$0 - 4];
                    break;
                case 187:
                    $$[$0 - 4].setLimit($$[$0 - 2].value, $$[$0].value);this.$ = $$[$0 - 4];
                    break;
                case 188:
                    $$[$0 - 2].setLimit($$[$0].value);this.$ = $$[$0 - 2];
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 6: 3, 7: 4, 8: 5, 10: [1, 25], 11: [1, 15], 12: [1, 14], 13: [1, 19], 109: 24, 110: 11, 111: 10, 113: 17, 114: 23, 116: 22, 119: 21, 121: 20, 122: 7, 123: 6, 124: 13, 125: 9, 128: 18, 129: 16, 133: 12, 134: 8 }, { 1: [3] }, { 5: [1, 26] }, { 5: [1, 27] }, { 5: [1, 28] }, { 5: [1, 29] }, { 5: [2, 192], 66: [1, 30] }, { 5: [2, 191] }, { 5: [2, 190] }, { 5: [2, 193] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 31, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 5: [2, 162], 20: $VU, 120: 102 }, { 5: [2, 189], 25: [1, 104] }, { 5: [2, 168], 20: $VU, 66: [1, 106], 120: 105 }, { 112: [1, 107] }, o([5, 20], [2, 143]), o($VV, [2, 185], { 21: [1, 108] }), { 14: [1, 109] }, o($VW, [2, 175], { 24: [1, 110] }), { 14: [2, 145] }, o($VX, [2, 173], { 22: [1, 111] }), o($VY, [2, 160], { 120: 112, 20: $VU }), o($VZ, [2, 157], { 117: 113, 29: [1, 114], 30: [1, 116], 31: [1, 115] }), o($V_, [2, 152], { 15: [1, 117] }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 121, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 86: [1, 119], 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 106: 120, 108: 118 }, o($V$, [2, 142], { 85: [1, 122] }), { 1: [2, 1] }, { 1: [2, 2] }, { 1: [2, 3] }, { 1: [2, 4] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 123, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, o($V01, [2, 163], { 18: $V11, 19: $V21 }), o($V31, [2, 78]), o($V31, [2, 131], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 42: [1, 127], 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1, 98: $Vj1, 99: $Vk1, 100: $Vl1, 101: $Vm1, 104: [1, 126] }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 147, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 148, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 149, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, o($Vn1, [2, 116]), o($Vn1, [2, 117], { 55: $Vo1, 82: [1, 150] }), o($Vn1, [2, 118]), o($Vn1, [2, 119]), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 152, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, o($Vn1, [2, 121]), o($Vn1, [2, 128]), o($Vn1, [2, 86], { 82: [1, 153] }), o($Vp1, [2, 50]), o($Vp1, [2, 51]), o($Vp1, [2, 52]), o($Vn1, [2, 77]), o($Vn1, [2, 70]), o($Vn1, [2, 71]), o($Vq1, [2, 45]), o($Vq1, [2, 46]), o($Vq1, [2, 47]), o($Vp1, [2, 44]), o($Vn1, [2, 72]), o($Vn1, [2, 73]), o($Vn1, [2, 74]), o($Vn1, [2, 75]), o($Vn1, [2, 76]), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 157, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 72: 154, 73: [1, 155], 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 105: $Vr1 }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 51: 162, 52: $VE, 53: $VF, 62: 160, 63: $Vs1, 65: 158, 69: [1, 159] }, o($Vq1, [2, 5]), o($Vq1, [2, 6]), o($Vq1, [2, 7]), o($Vq1, [2, 8]), o($Vq1, [2, 9]), o($Vq1, [2, 10]), o($Vq1, [2, 11]), o($Vq1, [2, 12]), o($Vq1, [2, 13]), o($Vq1, [2, 14]), o($Vq1, [2, 15]), o($Vq1, [2, 16]), o($Vq1, [2, 17]), o($Vq1, [2, 18]), o($Vq1, [2, 19]), o($Vq1, [2, 20]), o($Vq1, [2, 21]), o($Vq1, [2, 22]), o($Vq1, [2, 23]), o($Vq1, [2, 24]), o($Vq1, [2, 25]), o($Vq1, [2, 26]), o($Vq1, $Vt1), o($Vq1, [2, 28]), o($Vq1, [2, 29]), o($Vq1, [2, 30]), o($Vq1, [2, 31]), o($Vq1, [2, 32]), o($Vq1, [2, 33]), o($Vq1, [2, 34]), o($Vq1, [2, 35]), o($Vq1, [2, 36]), o($Vq1, [2, 37]), o($Vq1, [2, 38]), o($Vq1, [2, 39]), o($Vq1, [2, 40]), o($Vq1, [2, 41]), o($Vq1, [2, 42]), o($Vq1, [2, 43]), o([5, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 66, 69, 73, 83, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 131], [2, 53]), { 5: [2, 161] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 163, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 57: 164, 58: $VH }, { 5: [2, 167] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 165, 56: $VG }, o([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 52, 53, 56, 58, 63, 68, 71, 76, 77, 78, 82, 84, 92, 93, 102, 103], [2, 144]), { 23: [1, 166] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 167, 56: $VG }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 168, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 23: [1, 169] }, o($VY, [2, 159]), o($VZ, [2, 156]), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 171, 56: $VG, 115: 170 }, { 29: [1, 172] }, { 29: [1, 173] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 171, 56: $VG, 115: 174 }, o($Vu1, [2, 146], { 66: $Vv1 }), o($Vu1, [2, 148], { 66: [1, 176] }), o($Vw1, [2, 140]), o($Vw1, [2, 138], { 18: $V11, 19: $V21, 107: [1, 177] }), o($V$, [2, 141]), o($V01, [2, 164], { 18: $V11, 19: $V21 }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 178, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 179, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 180, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 39: $Vx1, 40: $Vy1, 41: $Vz1, 104: [1, 181] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 185, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 186, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 187, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $VA1, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 60: 189, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 188, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $VA1, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 60: 192, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 191, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 193, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 194, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 195, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 196, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 197, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 198, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 199, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 200, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 17: [1, 201] }, { 82: [1, 202] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 203, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 204, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 205, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 42: [1, 208], 44: $VB1, 45: $VC1, 46: $VD1, 47: $VE1, 48: $VF1, 76: [1, 207], 87: 206 }, o($VG1, [2, 111], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1 }), o($VG1, [2, 112], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1 }), o([5, 15, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 66, 69, 73, 83, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 131], [2, 113], { 16: $V41, 17: $V51 }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 157, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 72: 215, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 83: [1, 216], 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 105: $Vr1 }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 51: 217, 52: $VE, 53: $VF, 56: [1, 218] }, { 18: $V11, 19: $V21, 83: [1, 219] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 220, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 85: [1, 221], 86: [1, 222], 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 66: $VH1, 73: [1, 223] }, o($Vn1, [2, 69]), o($VI1, [2, 134]), o($VI1, [2, 135], { 18: $V11, 19: $V21 }), { 66: [1, 226], 69: [1, 225] }, o($Vn1, [2, 67]), o($VJ1, [2, 64]), { 64: [1, 227] }, { 64: [1, 228] }, o($VY, [2, 158], { 18: $V11, 19: $V21 }), { 5: [2, 188], 26: [1, 230], 66: [1, 229] }, { 55: $Vo1, 94: [1, 231] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 234, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 130: 233, 132: 232 }, { 55: $Vo1, 94: [1, 235] }, o($VW, [2, 174], { 18: $V11, 19: $V21 }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 238, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 126: 237, 127: 236 }, { 118: [1, 239] }, o($VK1, [2, 150], { 55: $Vo1, 107: [1, 240] }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 171, 56: $VG, 115: 241 }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 171, 56: $VG, 115: 242 }, o($V_, [2, 151]), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 121, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 106: 120, 108: 243 }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 121, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 106: 120, 108: 244 }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 245, 56: $VG, 84: [1, 246] }, o($V31, [2, 79]), o($V31, [2, 80]), { 16: $V41, 17: $V51, 18: [1, 247], 39: $V61, 40: $V71, 41: $V81, 42: $VL1, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1, 98: $Vj1, 99: $Vk1, 100: $Vl1, 101: $Vm1 }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 248, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 249, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 250, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 251, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, o($VM1, [2, 96], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91 }), o($VM1, [2, 97], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91 }), o($VM1, [2, 98], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91 }), o($VG1, [2, 99], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1 }), o($VN1, [2, 101], { 80: 32, 89: 33, 81: 37, 54: 38, 79: 39, 74: 42, 88: 43, 51: 46, 49: 47, 75: 48, 70: 49, 67: 50, 9: 53, 57: 56, 61: 252, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 50: $VD, 52: $VE, 53: $VF, 56: $VG, 58: $VH, 63: $VI, 68: $VJ, 71: $VK, 76: $VL, 77: $VM, 78: $VN, 82: $VO, 84: $VP, 102: $VS, 103: $VT }), o([5, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 55, 66, 69, 73, 83, 86, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 107, 131], $Vt1, { 80: 32, 89: 33, 81: 37, 54: 38, 79: 39, 74: 42, 88: 43, 51: 46, 49: 47, 75: 48, 70: 49, 67: 50, 9: 53, 57: 56, 61: 253, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 23: $Vd, 26: $Vg, 32: $Vm, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 50: $VD, 52: $VE, 53: $VF, 56: $VG, 58: $VH, 63: $VI, 68: $VJ, 71: $VK, 76: $VL, 77: $VM, 78: $VN, 82: $VO, 84: $VP, 102: $VS, 103: $VT }), o($VG1, [2, 100], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1 }), o($VN1, [2, 102], { 80: 32, 89: 33, 81: 37, 54: 38, 79: 39, 74: 42, 88: 43, 51: 46, 49: 47, 75: 48, 70: 49, 67: 50, 9: 53, 57: 56, 61: 252, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 50: $VD, 52: $VE, 53: $VF, 56: $VG, 58: $VH, 63: $VI, 68: $VJ, 71: $VK, 76: $VL, 77: $VM, 78: $VN, 82: $VO, 84: $VP, 102: $VS, 103: $VT }), o($VO1, [2, 103], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1 }), o($VO1, [2, 104], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1 }), o($VO1, [2, 105], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1 }), o($VO1, [2, 106], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1 }), o($VP1, [2, 107], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1 }), o($VP1, [2, 108], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1 }), o($VP1, [2, 109], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1 }), o($VP1, [2, 110], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1 }), { 82: [1, 254] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 157, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 72: 255, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 105: $Vr1 }, o($VQ1, [2, 122], { 16: $V41, 17: $V51, 43: $V91 }), o($VQ1, [2, 123], { 16: $V41, 17: $V51, 43: $V91 }), o($VQ1, [2, 126], { 16: $V41, 17: $V51, 43: $V91 }), o($Vn1, [2, 92]), o($Vn1, [2, 93]), { 44: $VB1, 45: $VC1, 46: $VD1, 47: $VE1, 48: $VF1, 76: [1, 257], 87: 256 }, o($Vn1, [2, 87]), o($Vn1, [2, 88]), o($Vn1, [2, 89]), o($Vn1, [2, 90]), o($Vn1, [2, 91]), { 39: $Vx1, 40: $Vy1, 41: $Vz1 }, { 66: $VH1, 83: [1, 258] }, o($Vn1, [2, 82]), o($Vp1, [2, 48]), o($Vp1, [2, 49]), o($Vn1, [2, 120]), { 18: $V11, 19: $V21, 83: [1, 259] }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 260, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 83: [1, 261] }, o($Vn1, [2, 68]), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 262, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 105: [1, 263] }, o($Vn1, [2, 66]), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 51: 162, 52: $VE, 53: $VF, 62: 264, 63: $Vs1 }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 265, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 266, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 57: 267, 58: $VH }, { 57: 268, 58: $VH }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 269, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, o($VV, [2, 184], { 66: [1, 270] }), o($VR1, [2, 183]), o($VR1, [2, 178], { 18: $V11, 19: $V21, 27: [1, 271], 28: [1, 272], 131: [1, 273] }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 274, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, o($VX, [2, 172], { 66: [1, 275] }), o($VS1, [2, 171]), o($VS1, [2, 169], { 18: $V11, 19: $V21 }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 276, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 49: 277, 50: $VD }, { 118: [1, 278] }, { 118: [1, 279] }, o($Vw1, [2, 139]), o($Vu1, [2, 147], { 66: $Vv1 }), o($Vw1, [2, 136], { 55: $Vo1 }), o($Vw1, [2, 137]), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 280, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 16: $V41, 17: $V51, 18: [1, 281], 39: $V61, 40: $V71, 41: $V81, 42: $VL1, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1, 98: $Vj1, 99: $Vk1, 100: $Vl1, 101: $Vm1 }, o($VT1, [2, 124], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1, 98: $Vj1, 99: $Vk1, 100: $Vl1, 101: $Vm1 }), o($VT1, [2, 125], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1, 98: $Vj1, 99: $Vk1, 100: $Vl1, 101: $Vm1 }), o($VT1, [2, 127], { 16: $V41, 17: $V51, 39: $V61, 40: $V71, 41: $V81, 43: $V91, 86: $Va1, 90: $Vb1, 91: $Vc1, 92: $Vd1, 93: $Ve1, 94: $Vf1, 95: $Vg1, 96: $Vh1, 97: $Vi1, 98: $Vj1, 99: $Vk1, 100: $Vl1, 101: $Vm1 }), { 18: $V11, 19: $V21, 33: $VU1, 34: $VV1, 35: $VW1, 36: $VX1, 37: $VY1, 38: $VZ1, 59: 282 }, { 18: $V11, 19: $V21, 33: $VU1, 34: $VV1, 35: $VW1, 36: $VX1, 37: $VY1, 38: $VZ1, 59: 289 }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 157, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 72: 290, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 105: $Vr1 }, { 66: $VH1, 83: [1, 291] }, o($Vn1, [2, 94]), o($Vn1, [2, 95]), o($Vn1, [2, 81]), o($Vn1, [2, 83]), { 18: $V11, 19: $V21, 83: [1, 292] }, o($Vn1, [2, 85]), o($VI1, [2, 132], { 18: $V11, 19: $V21 }), o($VI1, [2, 133]), o($VJ1, [2, 65]), o($VJ1, [2, 62], { 18: $V11, 19: $V21 }), o($VJ1, [2, 63], { 18: $V11, 19: $V21 }), { 5: [2, 186] }, { 5: [2, 187] }, o($V_1, [2, 166], { 18: $V11, 19: $V21 }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 234, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 130: 293 }, o($VR1, [2, 176]), o($VR1, [2, 177]), o($VR1, [2, 181], { 27: [1, 294], 28: [1, 295] }), o($V_1, [2, 165], { 18: $V11, 19: $V21 }), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 238, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT, 126: 296 }, o($VZ, [2, 153], { 18: $V11, 19: $V21 }), o($VK1, [2, 149]), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 297, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 61: 298, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 32, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, o($V31, [2, 129]), { 9: 53, 10: $V0, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5, 16: $V6, 17: $V7, 18: $V8, 19: $V9, 20: $Va, 21: $Vb, 22: $Vc, 23: $Vd, 24: $Ve, 25: $Vf, 26: $Vg, 27: $Vh, 28: $Vi, 29: $Vj, 30: $Vk, 31: $Vl, 32: $Vm, 33: $Vn, 34: $Vo, 35: $Vp, 36: $Vq, 37: $Vr, 38: $Vs, 39: $Vt, 40: $Vu, 41: $Vv, 42: $Vw, 43: $Vx, 44: $Vy, 45: $Vz, 46: $VA, 47: $VB, 48: $VC, 49: 47, 50: $VD, 51: 46, 52: $VE, 53: $VF, 54: 38, 56: $VG, 57: 56, 58: $VH, 63: $VI, 67: 50, 68: $VJ, 70: 49, 71: $VK, 74: 42, 75: 48, 76: $VL, 77: $VM, 78: $VN, 79: 39, 80: 299, 81: 37, 82: $VO, 84: $VP, 88: 43, 89: 33, 92: $VQ, 93: $VR, 102: $VS, 103: $VT }, o($V$1, [2, 61]), o($V$1, [2, 54]), o($V$1, [2, 55]), o($V$1, [2, 56]), o($V$1, [2, 57]), o($V$1, [2, 58]), o($V$1, [2, 59]), o($V$1, [2, 60]), { 66: $VH1, 83: [1, 300] }, o($Vn1, [2, 115]), o($Vn1, [2, 84]), o($VR1, [2, 182]), o($VR1, [2, 179]), o($VR1, [2, 180]), o($VS1, [2, 170]), o($VZ, [2, 154], { 18: $V11, 19: $V21 }), o($VZ, [2, 155], { 18: $V11, 19: $V21 }), o($V31, [2, 130]), o($Vn1, [2, 114])],
        defaultActions: { 7: [2, 191], 8: [2, 190], 9: [2, 193], 19: [2, 145], 26: [2, 1], 27: [2, 2], 28: [2, 3], 29: [2, 4], 102: [2, 161], 105: [2, 167], 267: [2, 186], 268: [2, 187] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var _parseError = function _parseError(msg, hash) {
                    this.message = msg;
                    this.hash = hash;
                };

                _parseError.prototype = Error;

                throw new _parseError(str, hash);
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                tstack = [],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function lex() {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };

    var Nodes = require('./Nodes.js');
    var JL_JISON_INPUT_SYMBOL = Symbol('JL_JISON_INPUT_SYMBOL');
    /* generated by jison-lex 0.3.4 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function setInput(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function less(n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true, "ranges": true, "backtrack_lexer": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                if (!(JL_JISON_INPUT_SYMBOL in yy.lexer)) {
                    yy.lexer[JL_JISON_INPUT_SYMBOL] = this.matches.input;
                }

                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        break;
                    case 1:
                        return 10;
                        break;
                    case 2:
                        return 11;
                        break;
                    case 3:
                        return 12;
                        break;
                    case 4:
                        return 112;
                        break;
                    case 5:
                        return 13;
                        break;
                    case 6:
                        return 66;
                        break;
                    case 7:
                        return 76;
                        break;
                    case 8:
                        return 77;
                        break;
                    case 9:
                        return 78;
                        break;
                    case 10:
                        return 43;
                        break;
                    case 11:
                        return 44;
                        break;
                    case 12:
                        return 45;
                        break;
                    case 13:
                        return 46;
                        break;
                    case 14:
                        return 46;
                        break;
                    case 15:
                        return 47;
                        break;
                    case 16:
                        return 48;
                        break;
                    case 17:
                        return 42;
                        break;
                    case 18:
                        return 15;
                        break;
                    case 19:
                        return 85;
                        break;
                    case 20:
                        return 131;
                        break;
                    case 21:
                        return 20;
                        break;
                    case 22:
                        return 21;
                        break;
                    case 23:
                        return 22;
                        break;
                    case 24:
                        return 23;
                        break;
                    case 25:
                        return 24;
                        break;
                    case 26:
                        return 84;
                        break;
                    case 27:
                        return 25;
                        break;
                    case 28:
                        return 26;
                        break;
                    case 29:
                        return 30;
                        break;
                    case 30:
                        return 31;
                        break;
                    case 31:
                        return 14;
                        break;
                    case 32:
                        return 32;
                        break;
                    case 33:
                        return 33;
                        break;
                    case 34:
                        return 34;
                        break;
                    case 35:
                        return 35;
                        break;
                    case 36:
                        return 36;
                        break;
                    case 37:
                        return 37;
                        break;
                    case 38:
                        return 38;
                        break;
                    case 39:
                        return 39;
                        break;
                    case 40:
                        return 40;
                        break;
                    case 41:
                        return 41;
                        break;
                    case 42:
                        return 104;
                        break;
                    case 43:
                        return 63;
                        break;
                    case 44:
                        return 63;
                        break;
                    case 45:
                        return 58;
                        break;
                    case 46:
                        return 103;
                        break;
                    case 47:
                        return 105;
                        break;
                    case 48:
                        return 53;
                        break;
                    case 49:
                        return 56;
                        break;
                    case 50:
                        return 107;
                        break;
                    case 51:
                        return 27;
                        break;
                    case 52:
                        return 28;
                        break;
                    case 53:
                        return 16;
                        break;
                    case 54:
                        return 17;
                        break;
                    case 55:
                        return 118;
                        break;
                    case 56:
                        return 29;
                        break;
                    case 57:
                        return 92;
                        break;
                    case 58:
                        return 93;
                        break;
                    case 59:
                        return 91;
                        break;
                    case 60:
                        return 86;
                        break;
                    case 61:
                        return 90;
                        break;
                    case 62:
                        return 96;
                        break;
                    case 63:
                        return 95;
                        break;
                    case 64:
                        return 94;
                        break;
                    case 65:
                        return 94;
                        break;
                    case 66:
                        return 82;
                        break;
                    case 67:
                        return 83;
                        break;
                    case 68:
                        return 101;
                        break;
                    case 69:
                        return 99;
                        break;
                    case 70:
                        return 100;
                        break;
                    case 71:
                        return 98;
                        break;
                    case 72:
                        return 18;
                        break;
                    case 73:
                        return 18;
                        break;
                    case 74:
                        return 19;
                        break;
                    case 75:
                        return 19;
                        break;
                    case 76:
                        return 55;
                        break;
                    case 77:
                        return 97;
                        break;
                    case 78:
                        return 102;
                        break;
                    case 79:
                        return 68;
                        break;
                    case 80:
                        return 69;
                        break;
                    case 81:
                        return 64;
                        break;
                    case 82:
                        return 71;
                        break;
                    case 83:
                        return 73;
                        break;
                    case 84:
                        return 50;
                        break;
                    case 85:
                        return 52;
                        break;
                    case 86:
                        return 52;
                        break;
                    case 87:
                        return 5;
                        break;
                }
            },
            rules: [/^(?:\s+)/i, /^(?:SELECT\b)/i, /^(?:DELETE\b)/i, /^(?:INSERT\b)/i, /^(?:VALUES\b)/i, /^(?:UPDATE\b)/i, /^(?:,)/i, /^(?:NULL\b)/i, /^(?:TRUE\b)/i, /^(?:FALSE\b)/i, /^(?:IS\b)/i, /^(?:STRING\b)/i, /^(?:NUMBER\b)/i, /^(?:BOOL\b)/i, /^(?:BOOLEAN\b)/i, /^(?:OBJECT\b)/i, /^(?:ARRAY\b)/i, /^(?:NOT\b)/i, /^(?:FROM\b)/i, /^(?:DISTINCT\b)/i, /^(?:NUMERIC\b)/i, /^(?:WHERE\b)/i, /^(?:ORDER\b)/i, /^(?:GROUP\b)/i, /^(?:BY\b)/i, /^(?:HAVING\b)/i, /^(?:COUNT\b)/i, /^(?:LIMIT\b)/i, /^(?:OFFSET\b)/i, /^(?:LEFT\b)/i, /^(?:INNER\b)/i, /^(?:SET\b)/i, /^(?:INTERVAL\b)/i, /^(?:YEAR\b)/i, /^(?:MONTH\b)/i, /^(?:DAY\b)/i, /^(?:HOUR\b)/i, /^(?:MINUTE\b)/i, /^(?:SECOND\b)/i, /^(?:LIKE\b)/i, /^(?:ILIKE\b)/i, /^(?:REGEXP\b)/i, /^(?:BETWEEN\b)/i, /^(?:"(\\.|[^\\"])*")/i, /^(?:'(\\.|[^\\'])*')/i, /^(?:[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)/i, /^(?::[a-z_][a-z0-9_]*)/i, /^(?:::[a-z_][a-z0-9_]*)/i, /^(?:\{:[a-z_][a-z0-9_]*\})/i, /^(?:\{::[a-z_][a-z0-9_]*\})/i, /^(?:AS\b)/i, /^(?:ASC\b)/i, /^(?:DESC\b)/i, /^(?:STRICT\b)/i, /^(?:IN\b)/i, /^(?:ON\b)/i, /^(?:JOIN\b)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:\/)/i, /^(?:\*)/i, /^(?:%)/i, /^(?:===)/i, /^(?:!==)/i, /^(?:==)/i, /^(?:=)/i, /^(?:\()/i, /^(?:\))/i, /^(?:<=)/i, /^(?:>=)/i, /^(?:<)/i, /^(?:>)/i, /^(?:AND\b)/i, /^(?:&&)/i, /^(?:OR\b)/i, /^(?:\|\|)/i, /^(?:\.)/i, /^(?:!=)/i, /^(?:!)/i, /^(?:\{)/i, /^(?:\})/i, /^(?::)/i, /^(?:\[)/i, /^(?:\])/i, /^(?:(@([a-z_][a-z0-9_]*|)))/i, /^(?:`(\\.|[^\\`])*`)/i, /^(?:([a-z_][a-z0-9_]*))/i, /^(?:$)/i],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () {
        return parser.parse.apply(parser, arguments);
    };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && require.main === module) {
        exports.main(process.argv.slice(1));
    }
}

},{"./Nodes.js":72,"fs":undefined,"path":undefined}],74:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Array = function (_Node) {
	_inherits(Array, _Node);

	function Array(items) {
		_classCallCheck(this, Array);

		var _this = _possibleConstructorReturn(this, (Array.__proto__ || Object.getPrototypeOf(Array)).call(this));

		_this.items = items;
		return _this;
	}

	_createClass(Array, [{
		key: 'childNodes',
		value: function childNodes() {
			return this.items;
		}
	}]);

	return Array;
}(Node);

module.exports = Array;

},{"../Node":71}],75:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var BetweenOperation = function (_Node) {
	_inherits(BetweenOperation, _Node);

	function BetweenOperation(left, rangeStart, rangeEnd) {
		_classCallCheck(this, BetweenOperation);

		var _this = _possibleConstructorReturn(this, (BetweenOperation.__proto__ || Object.getPrototypeOf(BetweenOperation)).call(this));

		_this.left = left;
		_this.rangeStart = rangeStart;
		_this.rangeEnd = rangeEnd;
		return _this;
	}

	_createClass(BetweenOperation, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.left];
		}
	}]);

	return BetweenOperation;
}(Node);

module.exports = BetweenOperation;

},{"../Node":71}],76:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BinaryOperation = require('./BinaryOperation');

var BinaryArithmeticOperation = function (_BinaryOperation) {
  _inherits(BinaryArithmeticOperation, _BinaryOperation);

  function BinaryArithmeticOperation() {
    _classCallCheck(this, BinaryArithmeticOperation);

    return _possibleConstructorReturn(this, (BinaryArithmeticOperation.__proto__ || Object.getPrototypeOf(BinaryArithmeticOperation)).apply(this, arguments));
  }

  return BinaryArithmeticOperation;
}(BinaryOperation);

module.exports = BinaryArithmeticOperation;

},{"./BinaryOperation":77}],77:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var BinaryOperation = function (_Node) {
	_inherits(BinaryOperation, _Node);

	function BinaryOperation(operator, left, right) {
		_classCallCheck(this, BinaryOperation);

		var _this = _possibleConstructorReturn(this, (BinaryOperation.__proto__ || Object.getPrototypeOf(BinaryOperation)).call(this));

		_this.operator = operator;
		_this.left = left;
		_this.right = right;
		return _this;
	}

	_createClass(BinaryOperation, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.left, this.right];
		}
	}]);

	return BinaryOperation;
}(Node);

module.exports = BinaryOperation;

},{"../Node":71}],78:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var BindingIdent = function (_Node) {
	_inherits(BindingIdent, _Node);

	function BindingIdent(ident) {
		_classCallCheck(this, BindingIdent);

		var _this = _possibleConstructorReturn(this, (BindingIdent.__proto__ || Object.getPrototypeOf(BindingIdent)).call(this));

		_this.ident = ident.slice(1, -1);
		_this.binded = null;
		return _this;
	}

	_createClass(BindingIdent, [{
		key: 'expand',
		value: function expand(binded) {
			this.binded = binded;
		}
	}, {
		key: 'basename',
		value: function basename() {
			return this.ident.slice(1);
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}]);

	return BindingIdent;
}(Node);

module.exports = BindingIdent;

},{"../Node":71}],79:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var BindingIdentList = function (_Node) {
	_inherits(BindingIdentList, _Node);

	function BindingIdentList(ident) {
		_classCallCheck(this, BindingIdentList);

		var _this = _possibleConstructorReturn(this, (BindingIdentList.__proto__ || Object.getPrototypeOf(BindingIdentList)).call(this));

		_this.ident = ident.slice(1, -1);
		_this.binded = null;
		return _this;
	}

	_createClass(BindingIdentList, [{
		key: 'expand',
		value: function expand(binded) {
			this.binded = binded;
		}
	}, {
		key: 'basename',
		value: function basename() {
			return this.ident.slice(2);
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}]);

	return BindingIdentList;
}(Node);

module.exports = BindingIdentList;

},{"../Node":71}],80:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var BindingValueList = function (_Node) {
	_inherits(BindingValueList, _Node);

	function BindingValueList(ident) {
		_classCallCheck(this, BindingValueList);

		var _this = _possibleConstructorReturn(this, (BindingValueList.__proto__ || Object.getPrototypeOf(BindingValueList)).call(this));

		_this.ident = ident;
		_this.ast = null;
		return _this;
	}

	_createClass(BindingValueList, [{
		key: 'expand',
		value: function expand(ast) {
			this.ast = ast;
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			return this.ast ? [this.ast] : [];
		}
	}]);

	return BindingValueList;
}(Node);

module.exports = BindingValueList;

},{"../Node":71}],81:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var BindingValueScalar = function (_Node) {
	_inherits(BindingValueScalar, _Node);

	function BindingValueScalar(ident) {
		_classCallCheck(this, BindingValueScalar);

		var _this = _possibleConstructorReturn(this, (BindingValueScalar.__proto__ || Object.getPrototypeOf(BindingValueScalar)).call(this));

		_this.ident = ident;
		_this.ast = null;
		return _this;
	}

	_createClass(BindingValueScalar, [{
		key: 'expand',
		value: function expand(ast) {
			this.ast = ast;
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			return this.ast ? [this.ast] : [];
		}
	}]);

	return BindingValueScalar;
}(Node);

module.exports = BindingValueScalar;

},{"../Node":71}],82:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Boolean = function (_Node) {
	_inherits(Boolean, _Node);

	function Boolean(bool) {
		_classCallCheck(this, Boolean);

		var _this = _possibleConstructorReturn(this, (Boolean.__proto__ || Object.getPrototypeOf(Boolean)).call(this));

		_this.value = !!bool;
		return _this;
	}

	_createClass(Boolean, [{
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}]);

	return Boolean;
}(Node);

module.exports = Boolean;

},{"../Node":71}],83:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Brackets = function (_Node) {
	_inherits(Brackets, _Node);

	function Brackets(expression) {
		_classCallCheck(this, Brackets);

		var _this = _possibleConstructorReturn(this, (Brackets.__proto__ || Object.getPrototypeOf(Brackets)).call(this));

		_this.expression = expression;
		return _this;
	}

	_createClass(Brackets, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.expression];
		}
	}, {
		key: 'deepType',
		value: function deepType() {
			return this.expression.deepType();
		}
	}]);

	return Brackets;
}(Node);

module.exports = Brackets;

},{"../Node":71}],84:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');
var Nodes = require('../Nodes');

var Call = function (_Node) {
	_inherits(Call, _Node);

	function Call(functionIdent) {
		var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Nodes.ExpressionsList([]);

		_classCallCheck(this, Call);

		var _this = _possibleConstructorReturn(this, (Call.__proto__ || Object.getPrototypeOf(Call)).call(this));

		_this.function = functionIdent;
		_this.args = args;
		return _this;
	}

	_createClass(Call, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.function].concat([this.args]);
		}
	}]);

	return Call;
}(Node);

module.exports = Call;

},{"../Node":71,"../Nodes":72}],85:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Column = function (_Node) {
	_inherits(Column, _Node);

	function Column(expression) {
		var alias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		var expressionSqlString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		_classCallCheck(this, Column);

		var _this = _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).call(this));

		_this.alias = alias;
		_this.expression = expression;
		_this.expressionSqlString = expressionSqlString;
		return _this;
	}

	_createClass(Column, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.expression];
		}
	}]);

	return Column;
}(Node);

module.exports = Column;

},{"../Node":71}],86:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComplexIdent = require('./ComplexIdent');

var ColumnIdent = function (_ComplexIdent) {
	_inherits(ColumnIdent, _ComplexIdent);

	function ColumnIdent() {
		_classCallCheck(this, ColumnIdent);

		return _possibleConstructorReturn(this, (ColumnIdent.__proto__ || Object.getPrototypeOf(ColumnIdent)).apply(this, arguments));
	}

	_createClass(ColumnIdent, null, [{
		key: 'fromComplexIdent',
		value: function fromComplexIdent(complexIdent) {
			var ident = new this.prototype.constructor([]);

			ident.fragments = complexIdent.fragments.slice(0);

			return ident;
		}
	}]);

	return ColumnIdent;
}(ComplexIdent);

module.exports = ColumnIdent;

},{"./ComplexIdent":88}],87:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BinaryOperation = require('./BinaryOperation');

var ComparisonOperation = function (_BinaryOperation) {
  _inherits(ComparisonOperation, _BinaryOperation);

  function ComparisonOperation() {
    _classCallCheck(this, ComparisonOperation);

    return _possibleConstructorReturn(this, (ComparisonOperation.__proto__ || Object.getPrototypeOf(ComparisonOperation)).apply(this, arguments));
  }

  return ComparisonOperation;
}(BinaryOperation);

module.exports = ComparisonOperation;

},{"./BinaryOperation":77}],88:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');
var BindingIdent = require('./BindingIdent');
var Ident = require('./Ident');
var BindingIdentList = require('./BindingIdentList');
var ProgramError = require('../../error/ProgramError');

var ComplexIdent = function (_Node) {
	_inherits(ComplexIdent, _Node);

	function ComplexIdent(fragments) {
		_classCallCheck(this, ComplexIdent);

		var _this = _possibleConstructorReturn(this, (ComplexIdent.__proto__ || Object.getPrototypeOf(ComplexIdent)).call(this));

		_this.fragments = [];

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = fragments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var fragment = _step.value;

				_this.addFragment(fragment);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return _this;
	}

	_createClass(ComplexIdent, [{
		key: 'addFragment',
		value: function addFragment(fragment) {
			if (fragment instanceof BindingIdent || fragment instanceof BindingIdentList) {
				this.fragments.push(fragment);
			} else if (fragment instanceof Ident) {
				this.fragments.push(fragment.name);
			} else {
				// string
				this.fragments.push(Ident._unquote(fragment));
			}
		}
	}, {
		key: 'getFragments',
		value: function getFragments() {
			var strings = [];

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.fragments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var f = _step2.value;

					if (f instanceof BindingIdent) {
						var binded = f.binded;

						if (binded === null) {
							throw new ProgramError('Binds not expanded');
						}

						strings.push(binded);
					} else if (f instanceof BindingIdentList) {
						var _binded = f.binded;

						if (_binded === null) {
							throw new ProgramError('Binds not expanded');
						}

						strings.push.apply(strings, _toConsumableArray(_binded));
					} else {
						strings.push(f);
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return strings;
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			var childs = [];

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.fragments[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var f = _step3.value;

					if ((typeof f === 'undefined' ? 'undefined' : _typeof(f)) === 'object' && f !== null) {
						childs.push(f);
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return childs;
		}
	}]);

	return ComplexIdent;
}(Node);

module.exports = ComplexIdent;

},{"../../error/ProgramError":59,"../Node":71,"./BindingIdent":78,"./BindingIdentList":79,"./Ident":94}],89:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var DataSourceIdent = function (_Node) {
	_inherits(DataSourceIdent, _Node);

	function DataSourceIdent(name) {
		_classCallCheck(this, DataSourceIdent);

		var _this = _possibleConstructorReturn(this, (DataSourceIdent.__proto__ || Object.getPrototypeOf(DataSourceIdent)).call(this));

		_this.name = name;
		return _this;
	}

	_createClass(DataSourceIdent, [{
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}]);

	return DataSourceIdent;
}(Node);

module.exports = DataSourceIdent;

},{"../Node":71}],90:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Delete = function (_Node) {
	_inherits(Delete, _Node);

	function Delete() {
		_classCallCheck(this, Delete);

		var _this = _possibleConstructorReturn(this, (Delete.__proto__ || Object.getPrototypeOf(Delete)).call(this));

		_this.table = null;
		_this.joins = [];
		_this.where = null;
		return _this;
	}

	_createClass(Delete, [{
		key: 'join',
		value: function join(_join) {
			this.joins.push(_join);
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			return this.joins.concat([this.table, this.where].filter(function (o) {
				return o !== null;
			}));
		}
	}]);

	return Delete;
}(Node);

module.exports = Delete;

},{"../Node":71}],91:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var ExpressionsList = function (_Node) {
	_inherits(ExpressionsList, _Node);

	function ExpressionsList(values) {
		_classCallCheck(this, ExpressionsList);

		var _this = _possibleConstructorReturn(this, (ExpressionsList.__proto__ || Object.getPrototypeOf(ExpressionsList)).call(this));

		_this.values = values;
		return _this;
	}

	_createClass(ExpressionsList, [{
		key: 'push',
		value: function push(value) {
			this.values.push(value);
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			return this.values;
		}
	}]);

	return ExpressionsList;
}(Node);

module.exports = ExpressionsList;

},{"../Node":71}],92:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComplexIdent = require('./ComplexIdent');

var FunctionIdent = function (_ComplexIdent) {
	_inherits(FunctionIdent, _ComplexIdent);

	function FunctionIdent(complexIdent) {
		_classCallCheck(this, FunctionIdent);

		var _this = _possibleConstructorReturn(this, (FunctionIdent.__proto__ || Object.getPrototypeOf(FunctionIdent)).call(this, []));

		_this.fragments = complexIdent.fragments.slice(1);
		return _this;
	}

	return FunctionIdent;
}(ComplexIdent);

module.exports = FunctionIdent;

},{"./ComplexIdent":88}],93:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var GroupBy = function (_Node) {
	_inherits(GroupBy, _Node);

	function GroupBy(expression) {
		_classCallCheck(this, GroupBy);

		var _this = _possibleConstructorReturn(this, (GroupBy.__proto__ || Object.getPrototypeOf(GroupBy)).call(this));

		_this.expression = expression;
		return _this;
	}

	_createClass(GroupBy, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.expression];
		}
	}]);

	return GroupBy;
}(Node);

module.exports = GroupBy;

},{"../Node":71}],94:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');
var Quoter = require('../../Quoter');

var Ident = function (_Node) {
	_inherits(Ident, _Node);

	function Ident(name) {
		_classCallCheck(this, Ident);

		var _this = _possibleConstructorReturn(this, (Ident.__proto__ || Object.getPrototypeOf(Ident)).call(this));

		_this.name = Ident._unquote(name);
		return _this;
	}

	_createClass(Ident, [{
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}], [{
		key: '_unquote',
		value: function _unquote(string) {
			return Quoter.unquoteOptionalQuotes(string, '`');
		}
	}]);

	return Ident;
}(Node);

module.exports = Ident;

},{"../../Quoter":40,"../Node":71}],95:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var InnerJoin = function (_Node) {
	_inherits(InnerJoin, _Node);

	function InnerJoin(table, expression) {
		_classCallCheck(this, InnerJoin);

		var _this = _possibleConstructorReturn(this, (InnerJoin.__proto__ || Object.getPrototypeOf(InnerJoin)).call(this));

		_this.table = table;
		_this.expression = expression;
		return _this;
	}

	_createClass(InnerJoin, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.table, this.expression];
		}
	}]);

	return InnerJoin;
}(Node);

module.exports = InnerJoin;

},{"../Node":71}],96:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Insert = function (_Node) {
	_inherits(Insert, _Node);

	function Insert() {
		var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		_classCallCheck(this, Insert);

		var _this = _possibleConstructorReturn(this, (Insert.__proto__ || Object.getPrototypeOf(Insert)).call(this));

		_this.rows = rows;
		return _this;
	}

	_createClass(Insert, [{
		key: 'push',
		value: function push(row) {
			this.rows.push(row);
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			return this.rows;
		}
	}]);

	return Insert;
}(Node);

module.exports = Insert;

},{"../Node":71}],97:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Interval = function (_Node) {
	_inherits(Interval, _Node);

	function Interval() {
		_classCallCheck(this, Interval);

		var _this = _possibleConstructorReturn(this, (Interval.__proto__ || Object.getPrototypeOf(Interval)).call(this));

		_this.deltas = [];
		return _this;
	}

	_createClass(Interval, [{
		key: 'add',
		value: function add(expression, unit) {
			this.deltas.push({ expression: expression, unit: unit });
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			var childs = [];

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.deltas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var d = _step.value;

					childs.push(d.expression);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return childs;
		}
	}]);

	return Interval;
}(Node);

Interval.UNIT_YEAR = 'year';
Interval.UNIT_MONTH = 'month';
Interval.UNIT_DAY = 'day';
Interval.UNIT_HOUR = 'hour';
Interval.UNIT_MINUTE = 'minute';
Interval.UNIT_SECOND = 'second';

module.exports = Interval;

},{"../Node":71}],98:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BinaryOperation = require('./BinaryOperation');

var IntervalOperation = function (_BinaryOperation) {
  _inherits(IntervalOperation, _BinaryOperation);

  function IntervalOperation() {
    _classCallCheck(this, IntervalOperation);

    return _possibleConstructorReturn(this, (IntervalOperation.__proto__ || Object.getPrototypeOf(IntervalOperation)).apply(this, arguments));
  }

  return IntervalOperation;
}(BinaryOperation);

module.exports = IntervalOperation;

},{"./BinaryOperation":77}],99:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var IsOperation = function (_Node) {
	_inherits(IsOperation, _Node);

	function IsOperation(left, exprected) {
		_classCallCheck(this, IsOperation);

		var _this = _possibleConstructorReturn(this, (IsOperation.__proto__ || Object.getPrototypeOf(IsOperation)).call(this));

		_this.left = left;
		_this.expected = exprected.toLowerCase();

		if (_this.expected === 'boolean') {
			_this.expected = 'bool';
		}
		return _this;
	}

	_createClass(IsOperation, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.left];
		}
	}]);

	return IsOperation;
}(Node);

module.exports = IsOperation;

},{"../Node":71}],100:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InnerJoin = require('./InnerJoin');

var LeftJoin = function (_InnerJoin) {
  _inherits(LeftJoin, _InnerJoin);

  function LeftJoin() {
    _classCallCheck(this, LeftJoin);

    return _possibleConstructorReturn(this, (LeftJoin.__proto__ || Object.getPrototypeOf(LeftJoin)).apply(this, arguments));
  }

  return LeftJoin;
}(InnerJoin);

module.exports = LeftJoin;

},{"./InnerJoin":95}],101:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BinaryOperation = require('./BinaryOperation');

var LikeOperation = function (_BinaryOperation) {
	_inherits(LikeOperation, _BinaryOperation);

	function LikeOperation(operator, left, right) {
		_classCallCheck(this, LikeOperation);

		var _this = _possibleConstructorReturn(this, (LikeOperation.__proto__ || Object.getPrototypeOf(LikeOperation)).call(this, operator, left, right));

		_this.caseSensitive = operator === 'LIKE';
		return _this;
	}

	return LikeOperation;
}(BinaryOperation);

module.exports = LikeOperation;

},{"./BinaryOperation":77}],102:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Limit = function (_Node) {
	_inherits(Limit, _Node);

	function Limit(count, offset) {
		_classCallCheck(this, Limit);

		var _this = _possibleConstructorReturn(this, (Limit.__proto__ || Object.getPrototypeOf(Limit)).call(this));

		_this.count = count === undefined ? null : count;
		_this.offset = offset === undefined ? null : offset;
		return _this;
	}

	_createClass(Limit, [{
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}]);

	return Limit;
}(Node);

module.exports = Limit;

},{"../Node":71}],103:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BinaryOperation = require('./BinaryOperation');

var LogicalOperation = function (_BinaryOperation) {
  _inherits(LogicalOperation, _BinaryOperation);

  function LogicalOperation() {
    _classCallCheck(this, LogicalOperation);

    return _possibleConstructorReturn(this, (LogicalOperation.__proto__ || Object.getPrototypeOf(LogicalOperation)).apply(this, arguments));
  }

  return LogicalOperation;
}(BinaryOperation);

module.exports = LogicalOperation;

},{"./BinaryOperation":77}],104:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Map = function (_Node) {
	_inherits(Map, _Node);

	function Map(map) {
		_classCallCheck(this, Map);

		var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this));

		_this.map = map;
		return _this;
	}

	_createClass(Map, [{
		key: 'childNodes',
		value: function childNodes() {
			var values = [];

			for (var k in this.map) {
				values.push(this.map[k]);
			}

			return values;
		}
	}]);

	return Map;
}(Node);

module.exports = Map;

},{"../Node":71}],105:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Null = function (_Node) {
	_inherits(Null, _Node);

	function Null() {
		_classCallCheck(this, Null);

		var _this = _possibleConstructorReturn(this, (Null.__proto__ || Object.getPrototypeOf(Null)).call(this));

		_this.value = null;
		return _this;
	}

	_createClass(Null, [{
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}]);

	return Null;
}(Node);

module.exports = Null;

},{"../Node":71}],106:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Number = function (_Node) {
	_inherits(Number, _Node);

	function Number(number) {
		_classCallCheck(this, Number);

		var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this));

		_this.value = number - 0;
		return _this;
	}

	_createClass(Number, [{
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}]);

	return Number;
}(Node);

module.exports = Number;

},{"../Node":71}],107:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var OrderBy = function (_Node) {
	_inherits(OrderBy, _Node);

	function OrderBy(expression) {
		var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		var collation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		_classCallCheck(this, OrderBy);

		var _this = _possibleConstructorReturn(this, (OrderBy.__proto__ || Object.getPrototypeOf(OrderBy)).call(this));

		_this.expression = expression;
		_this.direction = direction;
		_this.collation = collation;
		return _this;
	}

	_createClass(OrderBy, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.expression];
		}
	}]);

	return OrderBy;
}(Node);

module.exports = OrderBy;

},{"../Node":71}],108:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BinaryOperation = require('./BinaryOperation');

var RegexpOperation = function (_BinaryOperation) {
	_inherits(RegexpOperation, _BinaryOperation);

	function RegexpOperation(operator, left, right) {
		_classCallCheck(this, RegexpOperation);

		return _possibleConstructorReturn(this, (RegexpOperation.__proto__ || Object.getPrototypeOf(RegexpOperation)).call(this, operator, left, right));
	}

	return RegexpOperation;
}(BinaryOperation);

module.exports = RegexpOperation;

},{"./BinaryOperation":77}],109:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');
var Limit = require('./Limit');

var Select = function (_Node) {
	_inherits(Select, _Node);

	function Select() {
		_classCallCheck(this, Select);

		var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this));

		_this.allColumns = false;
		_this.columns = [];
		_this.table = null;
		_this.joins = [];
		_this.where = null;
		_this.groups = [];
		_this.having = null;
		_this.orders = [];
		_this.limit = null;
		_this.distinct = false;
		return _this;
	}

	_createClass(Select, [{
		key: 'join',
		value: function join(_join) {
			this.joins.push(_join);
		}
	}, {
		key: 'setLimit',
		value: function setLimit(count, offset) {
			this.limit = new Limit(count, offset);
		}
	}, {
		key: 'groupBy',
		value: function groupBy(groups) {
			this.groups = groups;
		}
	}, {
		key: 'orderBy',
		value: function orderBy(orders) {
			this.orders = orders;
		}
	}, {
		key: 'childNodes',
		value: function childNodes() {
			return this.columns.concat(this.joins, this.groups, this.orders, [this.table, this.where, this.having, this.limit].filter(function (o) {
				return o !== null;
			}));
		}
	}]);

	return Select;
}(Node);

module.exports = Select;

},{"../Node":71,"./Limit":102}],110:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var StrictIn = function (_Node) {
	_inherits(StrictIn, _Node);

	function StrictIn(needle, haystack) {
		_classCallCheck(this, StrictIn);

		var _this = _possibleConstructorReturn(this, (StrictIn.__proto__ || Object.getPrototypeOf(StrictIn)).call(this));

		_this.needle = needle;
		_this.haystack = haystack;
		return _this;
	}

	_createClass(StrictIn, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.needle].concat(this.haystack);
		}
	}]);

	return StrictIn;
}(Node);

module.exports = StrictIn;

},{"../Node":71}],111:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');
var Quoter = require('../../Quoter');

var String = function (_Node) {
	_inherits(String, _Node);

	function String(string) {
		_classCallCheck(this, String);

		var _this = _possibleConstructorReturn(this, (String.__proto__ || Object.getPrototypeOf(String)).call(this));

		_this.value = Quoter.unquote(string);
		return _this;
	}

	_createClass(String, [{
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}]);

	return String;
}(Node);

module.exports = String;

},{"../../Quoter":40,"../Node":71}],112:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Table = function (_Node) {
	_inherits(Table, _Node);

	function Table(location) {
		var alias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		_classCallCheck(this, Table);

		var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this));

		_this.alias = alias;
		_this.location = location;
		return _this;
	}

	_createClass(Table, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.location];
		}
	}]);

	return Table;
}(Node);

module.exports = Table;

},{"../Node":71}],113:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var TableAlias = function (_Node) {
	_inherits(TableAlias, _Node);

	function TableAlias(ident) {
		_classCallCheck(this, TableAlias);

		var _this = _possibleConstructorReturn(this, (TableAlias.__proto__ || Object.getPrototypeOf(TableAlias)).call(this));

		_this.name = ident.name;
		return _this;
	}

	_createClass(TableAlias, [{
		key: 'childNodes',
		value: function childNodes() {
			return [];
		}
	}]);

	return TableAlias;
}(Node);

module.exports = TableAlias;

},{"../Node":71}],114:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComplexIdent = require('./ComplexIdent');

var TableLocation = function (_ComplexIdent) {
	_inherits(TableLocation, _ComplexIdent);

	function TableLocation(complexIdent) {
		_classCallCheck(this, TableLocation);

		var _this = _possibleConstructorReturn(this, (TableLocation.__proto__ || Object.getPrototypeOf(TableLocation)).call(this, []));

		var fragments = complexIdent.fragments.slice();
		var source = fragments.shift();

		if (source !== '@') {
			throw new Error('Invalid table location');
		}

		_this.fragments = fragments;
		return _this;
	}

	return TableLocation;
}(ComplexIdent);

module.exports = TableLocation;

},{"./ComplexIdent":88}],115:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnaryOperation = require('./UnaryOperation');

var UnaryArithmeticOperation = function (_UnaryOperation) {
  _inherits(UnaryArithmeticOperation, _UnaryOperation);

  function UnaryArithmeticOperation() {
    _classCallCheck(this, UnaryArithmeticOperation);

    return _possibleConstructorReturn(this, (UnaryArithmeticOperation.__proto__ || Object.getPrototypeOf(UnaryArithmeticOperation)).apply(this, arguments));
  }

  return UnaryArithmeticOperation;
}(UnaryOperation);

module.exports = UnaryArithmeticOperation;

},{"./UnaryOperation":117}],116:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnaryOperation = require('./UnaryOperation');

var UnaryLogicalOperation = function (_UnaryOperation) {
  _inherits(UnaryLogicalOperation, _UnaryOperation);

  function UnaryLogicalOperation() {
    _classCallCheck(this, UnaryLogicalOperation);

    return _possibleConstructorReturn(this, (UnaryLogicalOperation.__proto__ || Object.getPrototypeOf(UnaryLogicalOperation)).apply(this, arguments));
  }

  return UnaryLogicalOperation;
}(UnaryOperation);

module.exports = UnaryLogicalOperation;

},{"./UnaryOperation":117}],117:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var UnaryOperation = function (_Node) {
	_inherits(UnaryOperation, _Node);

	function UnaryOperation(operator, right) {
		_classCallCheck(this, UnaryOperation);

		var _this = _possibleConstructorReturn(this, (UnaryOperation.__proto__ || Object.getPrototypeOf(UnaryOperation)).call(this));

		_this.operator = operator;
		_this.right = right;
		return _this;
	}

	_createClass(UnaryOperation, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.right];
		}
	}]);

	return UnaryOperation;
}(Node);

module.exports = UnaryOperation;

},{"../Node":71}],118:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var UnstrictIn = function (_Node) {
	_inherits(UnstrictIn, _Node);

	function UnstrictIn(needle, haystack) {
		_classCallCheck(this, UnstrictIn);

		var _this = _possibleConstructorReturn(this, (UnstrictIn.__proto__ || Object.getPrototypeOf(UnstrictIn)).call(this));

		_this.needle = needle;
		_this.haystack = haystack;
		return _this;
	}

	_createClass(UnstrictIn, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.needle].concat(this.haystack);
		}
	}]);

	return UnstrictIn;
}(Node);

module.exports = UnstrictIn;

},{"../Node":71}],119:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var Update = function (_Node) {
	_inherits(Update, _Node);

	function Update() {
		_classCallCheck(this, Update);

		var _this = _possibleConstructorReturn(this, (Update.__proto__ || Object.getPrototypeOf(Update)).call(this));

		_this.sets = [];
		_this.where = null;
		return _this;
	}

	_createClass(Update, [{
		key: 'childNodes',
		value: function childNodes() {
			return this.sets.concat(this.where ? [this.where] : []);
		}
	}]);

	return Update;
}(Node);

module.exports = Update;

},{"../Node":71}],120:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = require('../Node');

var UpdateSet = function (_Node) {
	_inherits(UpdateSet, _Node);

	function UpdateSet(columnIdent, expression) {
		_classCallCheck(this, UpdateSet);

		var _this = _possibleConstructorReturn(this, (UpdateSet.__proto__ || Object.getPrototypeOf(UpdateSet)).call(this));

		_this.columnIdent = columnIdent;
		_this.expression = expression;
		return _this;
	}

	_createClass(UpdateSet, [{
		key: 'childNodes',
		value: function childNodes() {
			return [this.columnIdent, this.expression];
		}
	}]);

	return UpdateSet;
}(Node);

module.exports = UpdateSet;

},{"../Node":71}],121:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationFunctionSync = require('../../AggregationFunctionSync');
var DataType = require('../../DataType');

var AVG = function (_AggregationFunctionS) {
	_inherits(AVG, _AggregationFunctionS);

	function AVG() {
		_classCallCheck(this, AVG);

		return _possibleConstructorReturn(this, (AVG.__proto__ || Object.getPrototypeOf(AVG)).apply(this, arguments));
	}

	_createClass(AVG, [{
		key: 'init',
		value: function init() {
			this.sum = 0;
			this.count = 0;
		}
	}, {
		key: 'updateSync',
		value: function updateSync(args) {
			var v = parseFloat(args[0]);

			if (isNaN(v)) {
				return;
			}

			this.sum += v;
			this.count++;
		}
	}, {
		key: 'resultSync',
		value: function resultSync() {
			return this.count ? this.sum / this.count : null;
		}
	}, {
		key: 'deinit',
		value: function deinit() {
			this.sum = 0;
			this.count = 0;
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return AVG;
}(AggregationFunctionSync);

module.exports = AVG;

},{"../../AggregationFunctionSync":11,"../../DataType":25}],122:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationFunctionSync = require('../../AggregationFunctionSync');
var DataType = require('../../DataType');

var COUNT = function (_AggregationFunctionS) {
	_inherits(COUNT, _AggregationFunctionS);

	function COUNT() {
		_classCallCheck(this, COUNT);

		return _possibleConstructorReturn(this, (COUNT.__proto__ || Object.getPrototypeOf(COUNT)).apply(this, arguments));
	}

	_createClass(COUNT, [{
		key: 'init',
		value: function init() {
			this.count = 0;
		}
	}, {
		key: 'updateSync',
		value: function updateSync(args) {
			if (!args.length) {
				this.count++;

				return;
			}

			if (args[0] === undefined || args[0] === null) {
				return;
			}

			this.count++;
		}
	}, {
		key: 'resultSync',
		value: function resultSync() {
			return this.count;
		}
	}, {
		key: 'deinit',
		value: function deinit() {
			this.count = 0;
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return COUNT;
}(AggregationFunctionSync);

module.exports = COUNT;

},{"../../AggregationFunctionSync":11,"../../DataType":25}],123:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationFunctionAsync = require('../../AggregationFunctionAsync');
var DataType = require('../../DataType');
var Collator = require('../../Collator');
var SortWrapper = require('../../external/sort/SortWrapper');
var WcWrapper = require('../../external/WcWrapper');
var EventEmitter = require('events');

var ExternalUniqueCounter = function (_EventEmitter) {
	_inherits(ExternalUniqueCounter, _EventEmitter);

	function ExternalUniqueCounter(sortOptions) {
		_classCallCheck(this, ExternalUniqueCounter);

		var _this = _possibleConstructorReturn(this, (ExternalUniqueCounter.__proto__ || Object.getPrototypeOf(ExternalUniqueCounter)).call(this));

		var sort = new SortWrapper({
			unique: true,
			tmpDir: sortOptions.tmpDir,
			bufferSize: sortOptions.bufferSize
		});

		var wc = new WcWrapper();

		sort.stdout.pipe(wc.stdin);

		var linesCountString = '\n';

		wc.stdout.on('data', function (data) {
			linesCountString += data;
		});

		wc.stdout.once('end', function () {
			var count = parseInt(linesCountString, 10);

			_this.emit('end', count);
		});

		_this.sort = sort;
		return _this;
	}

	_createClass(ExternalUniqueCounter, [{
		key: 'pushMap',
		value: function pushMap(keysMap, cb) {
			var chunk = '';

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = keysMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 1),
					    key = _step$value[0];

					chunk += key + '\n';
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.sort.stdin.write(chunk, cb);
		}
	}, {
		key: 'pushEnd',
		value: function pushEnd(cb) {
			this.once('end', cb);
			this.sort.stdin.end();
		}
	}]);

	return ExternalUniqueCounter;
}(EventEmitter);

var COUNT_DISTINCT = function (_AggregationFunctionA) {
	_inherits(COUNT_DISTINCT, _AggregationFunctionA);

	function COUNT_DISTINCT() {
		var _ref;

		_classCallCheck(this, COUNT_DISTINCT);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this2 = _possibleConstructorReturn(this, (_ref = COUNT_DISTINCT.__proto__ || Object.getPrototypeOf(COUNT_DISTINCT)).call.apply(_ref, [this].concat(args)));

		_this2.externalUniqueCounter = null;
		_this2.keys = new Map();

		_this2.maxKeysInMemory = _this2.preparingContext.options.sortOptions.inMemoryBufferSize;
		_this2.forceInMemory = _this2.preparingContext.options.sortOptions.forceInMemory;
		return _this2;
	}

	_createClass(COUNT_DISTINCT, [{
		key: '_externalUniqueCounter',
		value: function _externalUniqueCounter() {
			if (!this.externalUniqueCounter) {
				this.externalUniqueCounter = new ExternalUniqueCounter(this.preparingContext.options.sortOptions);
			}

			return this.externalUniqueCounter;
		}
	}, {
		key: 'init',
		value: function init() {}
	}, {
		key: 'updateAsync',
		value: function updateAsync(args, done) {
			if (args[0] === undefined || args[0] === null) {
				done();

				return;
			}

			this.keys.set(Collator.generateGroupKey(DataType.MIXED, args[0]), 1);

			if (this.keys.size > this.maxKeysInMemory) {
				this._externalUniqueCounter().pushMap(this.keys, done);
				this.keys.clear();
			} else {
				done();
			}
		}
	}, {
		key: 'resultAsync',
		value: function resultAsync(done) {
			var _this3 = this;

			if (!this.externalUniqueCounter) {
				done(this.keys.size);

				return;
			}

			this._externalUniqueCounter().pushMap(this.keys, function () {
				_this3._externalUniqueCounter().pushEnd(done);
			});
		}
	}, {
		key: 'deinit',
		value: function deinit() {
			this.keys.clear();
			this.externalUniqueCounter = null;
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return COUNT_DISTINCT;
}(AggregationFunctionAsync);

module.exports = COUNT_DISTINCT;

},{"../../AggregationFunctionAsync":10,"../../Collator":17,"../../DataType":25,"../../external/WcWrapper":65,"../../external/sort/SortWrapper":67,"events":undefined}],124:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationFunctionSync = require('../../AggregationFunctionSync');
var DataType = require('../../DataType');

var MIN = function (_AggregationFunctionS) {
	_inherits(MIN, _AggregationFunctionS);

	function MIN() {
		_classCallCheck(this, MIN);

		var _this = _possibleConstructorReturn(this, (MIN.__proto__ || Object.getPrototypeOf(MIN)).call(this));

		_this.max = null;
		return _this;
	}

	_createClass(MIN, [{
		key: 'init',
		value: function init() {
			this.max = null;
		}
	}, {
		key: 'updateSync',
		value: function updateSync(args) {
			if (args[0] === undefined || args[0] === null) {
				return;
			}

			if (this.max === null) {
				this.max = args[0];
			} else {
				this.max = args[0] > this.max ? args[0] : this.max;
			}
		}
	}, {
		key: 'resultSync',
		value: function resultSync() {
			return this.max;
		}
	}, {
		key: 'deinit',
		value: function deinit() {
			this.max = null;
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.MIXED;
		}
	}]);

	return MIN;
}(AggregationFunctionSync);

module.exports = MIN;

},{"../../AggregationFunctionSync":11,"../../DataType":25}],125:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationFunctionSync = require('../../AggregationFunctionSync');
var DataType = require('../../DataType');

var MIN = function (_AggregationFunctionS) {
	_inherits(MIN, _AggregationFunctionS);

	function MIN() {
		_classCallCheck(this, MIN);

		return _possibleConstructorReturn(this, (MIN.__proto__ || Object.getPrototypeOf(MIN)).apply(this, arguments));
	}

	_createClass(MIN, [{
		key: 'init',
		value: function init() {
			this.min = null;
		}
	}, {
		key: 'updateSync',
		value: function updateSync(args) {
			if (args[0] === undefined || args[0] === null) {
				return;
			}

			if (this.min === null) {
				this.min = args[0];
			} else {
				this.min = args[0] < this.min ? args[0] : this.min;
			}
		}
	}, {
		key: 'resultSync',
		value: function resultSync() {
			return this.min;
		}
	}, {
		key: 'deinit',
		value: function deinit() {
			this.min = null;
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.MIXED;
		}
	}]);

	return MIN;
}(AggregationFunctionSync);

module.exports = MIN;

},{"../../AggregationFunctionSync":11,"../../DataType":25}],126:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationFunctionSync = require('../../AggregationFunctionSync');
var DataType = require('../../DataType');

var SUM = function (_AggregationFunctionS) {
	_inherits(SUM, _AggregationFunctionS);

	function SUM() {
		_classCallCheck(this, SUM);

		return _possibleConstructorReturn(this, (SUM.__proto__ || Object.getPrototypeOf(SUM)).apply(this, arguments));
	}

	_createClass(SUM, [{
		key: 'init',
		value: function init() {
			this.sum = 0;
		}
	}, {
		key: 'updateSync',
		value: function updateSync(args) {
			var v = parseFloat(args[0]);

			if (isNaN(v)) {
				return;
			}

			this.sum += v;
		}
	}, {
		key: 'resultSync',
		value: function resultSync() {
			return this.sum;
		}
	}, {
		key: 'deinit',
		value: function deinit() {
			this.sum = 0;
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return SUM;
}(AggregationFunctionSync);

module.exports = SUM;

},{"../../AggregationFunctionSync":11,"../../DataType":25}],127:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var CEIL = function (_BasicFunction) {
	_inherits(CEIL, _BasicFunction);

	function CEIL() {
		_classCallCheck(this, CEIL);

		return _possibleConstructorReturn(this, (CEIL.__proto__ || Object.getPrototypeOf(CEIL)).apply(this, arguments));
	}

	_createClass(CEIL, [{
		key: 'call',
		value: function call(args) {
			this.needArgumentsCount(args, 1);

			return Math.ceil(args[0]);
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return CEIL;
}(BasicFunction);

module.exports = CEIL;

},{"../../BasicFunction":15,"../../DataType":25}],128:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var COALESCE = function (_BasicFunction) {
	_inherits(COALESCE, _BasicFunction);

	function COALESCE() {
		_classCallCheck(this, COALESCE);

		return _possibleConstructorReturn(this, (COALESCE.__proto__ || Object.getPrototypeOf(COALESCE)).apply(this, arguments));
	}

	_createClass(COALESCE, [{
		key: 'call',
		value: function call(args) {
			this.needArgumentsCount(args, 1);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var arg = _step.value;

					if (arg !== null && arg !== undefined) {
						return arg;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return null;
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.MIXED;
		}
	}]);

	return COALESCE;
}(BasicFunction);

module.exports = COALESCE;

},{"../../BasicFunction":15,"../../DataType":25}],129:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var CONCAT = function (_BasicFunction) {
	_inherits(CONCAT, _BasicFunction);

	function CONCAT() {
		_classCallCheck(this, CONCAT);

		return _possibleConstructorReturn(this, (CONCAT.__proto__ || Object.getPrototypeOf(CONCAT)).apply(this, arguments));
	}

	_createClass(CONCAT, [{
		key: 'call',
		value: function call(args) {
			return args.join('');
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.STRING;
		}
	}]);

	return CONCAT;
}(BasicFunction);

module.exports = CONCAT;

},{"../../BasicFunction":15,"../../DataType":25}],130:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var DATE = function (_BasicFunction) {
	_inherits(DATE, _BasicFunction);

	function DATE() {
		_classCallCheck(this, DATE);

		return _possibleConstructorReturn(this, (DATE.__proto__ || Object.getPrototypeOf(DATE)).apply(this, arguments));
	}

	_createClass(DATE, [{
		key: 'call',
		value: function call(args) {
			var now = new Date();

			if (args.length) {
				if (typeof args[0] !== 'number' && typeof args[0] !== 'string') {
					return null;
				}

				now = new Date(args[0]);
			}

			if (isNaN(now.getTime())) {
				return null;
			}

			return now.getFullYear() + '-' + (100 + now.getMonth() + 1).toString().substr(1) + '-' + (100 + now.getDate()).toString().substr(1);
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.STRING;
		}
	}]);

	return DATE;
}(BasicFunction);

module.exports = DATE;

},{"../../BasicFunction":15,"../../DataType":25}],131:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var FLOOR = function (_BasicFunction) {
	_inherits(FLOOR, _BasicFunction);

	function FLOOR() {
		_classCallCheck(this, FLOOR);

		return _possibleConstructorReturn(this, (FLOOR.__proto__ || Object.getPrototypeOf(FLOOR)).apply(this, arguments));
	}

	_createClass(FLOOR, [{
		key: 'call',
		value: function call(args) {
			this.needArgumentsCount(args, 1);

			return Math.floor(args[0]);
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return FLOOR;
}(BasicFunction);

module.exports = FLOOR;

},{"../../BasicFunction":15,"../../DataType":25}],132:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var FROM_UNIXTIME = function (_BasicFunction) {
	_inherits(FROM_UNIXTIME, _BasicFunction);

	function FROM_UNIXTIME() {
		_classCallCheck(this, FROM_UNIXTIME);

		return _possibleConstructorReturn(this, (FROM_UNIXTIME.__proto__ || Object.getPrototypeOf(FROM_UNIXTIME)).apply(this, arguments));
	}

	_createClass(FROM_UNIXTIME, [{
		key: 'call',
		value: function call(args) {
			this.needArgumentsCount(args, 1);

			return new Date(parseInt(args[0], 0) * 1000);
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.DATE;
		}
	}]);

	return FROM_UNIXTIME;
}(BasicFunction);

module.exports = FROM_UNIXTIME;

},{"../../BasicFunction":15,"../../DataType":25}],133:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var IF = function (_BasicFunction) {
	_inherits(IF, _BasicFunction);

	function IF() {
		_classCallCheck(this, IF);

		return _possibleConstructorReturn(this, (IF.__proto__ || Object.getPrototypeOf(IF)).apply(this, arguments));
	}

	_createClass(IF, [{
		key: 'call',
		value: function call(args) {
			this.needArgumentsCount(args, 3);

			return args[0] ? args[1] : args[2];
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.MIXED;
		}
	}]);

	return IF;
}(BasicFunction);

module.exports = IF;

},{"../../BasicFunction":15,"../../DataType":25}],134:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var NOW = function (_BasicFunction) {
	_inherits(NOW, _BasicFunction);

	function NOW() {
		_classCallCheck(this, NOW);

		return _possibleConstructorReturn(this, (NOW.__proto__ || Object.getPrototypeOf(NOW)).apply(this, arguments));
	}

	_createClass(NOW, [{
		key: 'call',
		value: function call() {
			return new Date();
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.DATE;
		}
	}]);

	return NOW;
}(BasicFunction);

module.exports = NOW;

},{"../../BasicFunction":15,"../../DataType":25}],135:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var NUMBER = function (_BasicFunction) {
	_inherits(NUMBER, _BasicFunction);

	function NUMBER() {
		_classCallCheck(this, NUMBER);

		return _possibleConstructorReturn(this, (NUMBER.__proto__ || Object.getPrototypeOf(NUMBER)).apply(this, arguments));
	}

	_createClass(NUMBER, [{
		key: 'call',
		value: function call(args) {
			this.needArgumentsCount(args, 1);

			if (_typeof(args[0]) === 'object') {
				return null;
			}

			var v = parseFloat(args[0]);

			return isNaN(v) ? null : v;
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return NUMBER;
}(BasicFunction);

module.exports = NUMBER;

},{"../../BasicFunction":15,"../../DataType":25}],136:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var RAND = function (_BasicFunction) {
	_inherits(RAND, _BasicFunction);

	function RAND() {
		_classCallCheck(this, RAND);

		return _possibleConstructorReturn(this, (RAND.__proto__ || Object.getPrototypeOf(RAND)).apply(this, arguments));
	}

	_createClass(RAND, [{
		key: 'call',
		value: function call(args) {
			return Math.random();
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return RAND;
}(BasicFunction);

module.exports = RAND;

},{"../../BasicFunction":15,"../../DataType":25}],137:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var ROUND = function (_BasicFunction) {
	_inherits(ROUND, _BasicFunction);

	function ROUND() {
		_classCallCheck(this, ROUND);

		return _possibleConstructorReturn(this, (ROUND.__proto__ || Object.getPrototypeOf(ROUND)).apply(this, arguments));
	}

	_createClass(ROUND, [{
		key: 'call',
		value: function call(args) {
			this.needArgumentsCount(args, 1);

			return Math.round(args[0]);
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return ROUND;
}(BasicFunction);

module.exports = ROUND;

},{"../../BasicFunction":15,"../../DataType":25}],138:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');
var NumberUtils = require('../../NumberUtils');

var STRING = function (_BasicFunction) {
	_inherits(STRING, _BasicFunction);

	function STRING() {
		_classCallCheck(this, STRING);

		return _possibleConstructorReturn(this, (STRING.__proto__ || Object.getPrototypeOf(STRING)).apply(this, arguments));
	}

	_createClass(STRING, [{
		key: 'call',
		value: function call(args) {
			this.needArgumentsCount(args, 1);

			var value = args[0];

			/* eslint-disable indent, no-unreachable */
			switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
				case 'string':
					return value;
					break;
				case 'number':
					return NumberUtils.toDecString(value);
					break;
				case 'boolean':
					return value ? 'true' : 'false';
					break;
				case 'undefined':
					return '';
					break;
				default:
					if (value === null) {
						return 'null';
					}

					return '[object Object]';
					break;
			}
			/* eslint-enable indent, no-unreachable */
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.STRING;
		}
	}]);

	return STRING;
}(BasicFunction);

module.exports = STRING;

},{"../../BasicFunction":15,"../../DataType":25,"../../NumberUtils":34}],139:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicFunction = require('../../BasicFunction');
var DataType = require('../../DataType');

var UNIX_TIMESTAMP = function (_BasicFunction) {
	_inherits(UNIX_TIMESTAMP, _BasicFunction);

	function UNIX_TIMESTAMP() {
		_classCallCheck(this, UNIX_TIMESTAMP);

		return _possibleConstructorReturn(this, (UNIX_TIMESTAMP.__proto__ || Object.getPrototypeOf(UNIX_TIMESTAMP)).apply(this, arguments));
	}

	_createClass(UNIX_TIMESTAMP, [{
		key: 'call',
		value: function call(args) {
			var now = new Date();

			if (args.length) {
				now = new Date(args[0]);
			}

			return Math.floor(now.getTime() / 1000);
		}
	}], [{
		key: 'dataType',
		value: function dataType() {
			return DataType.NUMBER;
		}
	}]);

	return UNIX_TIMESTAMP;
}(BasicFunction);

module.exports = UNIX_TIMESTAMP;

},{"../../BasicFunction":15,"../../DataType":25}],140:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');

var Append = function (_JlTransform) {
	_inherits(Append, _JlTransform);

	function Append(rows) {
		_classCallCheck(this, Append);

		var _this = _possibleConstructorReturn(this, (Append.__proto__ || Object.getPrototypeOf(Append)).call(this, JlTransform.ARRAY_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));

		_this.tail = rows;
		return _this;
	}

	_createClass(Append, [{
		key: '_transform',
		value: function _transform(objects, charset, cb) {
			this.push(objects);

			cb();
		}
	}, {
		key: '_flush',
		value: function _flush(cb) {
			this.push(this.tail);

			cb();
		}
	}]);

	return Append;
}(JlTransform);

module.exports = Append;

},{"./JlTransform":146}],141:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');

var ChunkJoiner = function (_JlTransform) {
	_inherits(ChunkJoiner, _JlTransform);

	function ChunkJoiner() {
		var chunkMaxSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

		_classCallCheck(this, ChunkJoiner);

		var _this = _possibleConstructorReturn(this, (ChunkJoiner.__proto__ || Object.getPrototypeOf(ChunkJoiner)).call(this, JlTransform.OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));

		_this.chunkMaxSize = chunkMaxSize;
		_this.chunk = [];
		return _this;
	}

	_createClass(ChunkJoiner, [{
		key: '_transform',
		value: function _transform(object, charset, cb) {
			this.chunk.push(object);

			if (this.chunk.length >= this.chunkMaxSize) {
				this.push(this.chunk);
				this.chunk = [];
			}

			cb();
		}
	}, {
		key: '_flush',
		value: function _flush(cb) {
			this.push(this.chunk);
			this.chunk = [];

			cb();
		}
	}]);

	return ChunkJoiner;
}(JlTransform);

module.exports = ChunkJoiner;

},{"./JlTransform":146}],142:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');

var ChunkSplitter = function (_JlTransform) {
	_inherits(ChunkSplitter, _JlTransform);

	function ChunkSplitter() {
		_classCallCheck(this, ChunkSplitter);

		return _possibleConstructorReturn(this, (ChunkSplitter.__proto__ || Object.getPrototypeOf(ChunkSplitter)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.OBJECTS));
	}

	_createClass(ChunkSplitter, [{
		key: '_transform',
		value: function _transform(chunk, charset, cb) {
			for (var i = 0; i < chunk.length; i++) {
				this.push(chunk[i]);
			}

			cb();
		}
	}]);

	return ChunkSplitter;
}(JlTransform);

module.exports = ChunkSplitter;

},{"./JlTransform":146}],143:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');

var Filter = function (_JlTransform) {
	_inherits(Filter, _JlTransform);

	function Filter(filterCb) {
		_classCallCheck(this, Filter);

		var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));

		_this.filter = filterCb;
		return _this;
	}

	_createClass(Filter, [{
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			var result = [];

			for (var i = 0; i < chunk.length; i++) {
				if (this.filter(chunk[i])) {
					result.push(chunk[i]);
				}
			}

			if (result.length) {
				this.push(result);
			}

			cb();
		}
	}]);

	return Filter;
}(JlTransform);

module.exports = Filter;

},{"./JlTransform":146}],144:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');
var AsyncUtils = require('../AsyncUtils');
var Collator = require('../Collator');
var DataType = require('../DataType');

var Groupper = function (_JlTransform) {
	_inherits(Groupper, _JlTransform);

	function Groupper(groupKeyGenerator, aggregation) {
		_classCallCheck(this, Groupper);

		var _this = _possibleConstructorReturn(this, (Groupper.__proto__ || Object.getPrototypeOf(Groupper)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));

		_this.groupKeyGenerator = groupKeyGenerator;
		_this.aggregation = aggregation;

		_this.isFirstRow = true;

		_this.currentKey = null;
		_this.currentKeySerialized = ''; // _serializeKey() never returns ''
		_this.lastRow = null;
		return _this;
	}

	_createClass(Groupper, [{
		key: '_serializeKey',
		value: function _serializeKey(key) {
			return Collator.generateGroupKey(DataType.STRING, key);
		}
	}, {
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			var _this2 = this;

			AsyncUtils.eachSeriesHalfSync(chunk, function (row, done) {
				var key = _this2.groupKeyGenerator(row);
				var keySerialized = _this2._serializeKey(key);

				/* TODO можно предварительно сравнивать сами значения без сериализации */

				if (keySerialized === _this2.currentKeySerialized) {
					_this2.aggregation.update(row, done);

					return;
				}

				_this2.currentKey = key;
				_this2.currentKeySerialized = keySerialized;

				/* группа поменялась или же это первая группа */

				if (!_this2.isFirstRow) {
					_this2.aggregation.result(function (result) {
						_this2.push([result]);
						_this2.aggregation.deinit();

						_this2.aggregation.init();
						_this2.aggregation.update(row, done);
					});

					return;
				} else {
					_this2.isFirstRow = false;
				}

				_this2.aggregation.init();
				_this2.aggregation.update(row, done);
			}, cb);
		}
	}, {
		key: '_flush',
		value: function _flush(cb) {
			var _this3 = this;

			if (!this.isFirstRow) {
				this.aggregation.result(function (result) {
					_this3.push([result]);
					_this3.aggregation.deinit();

					cb();
				});
			} else {
				cb();
			}
		}
	}]);

	return Groupper;
}(JlTransform);

module.exports = Groupper;

},{"../AsyncUtils":12,"../Collator":17,"../DataType":25,"./JlTransform":146}],145:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PassThrough = require('stream').PassThrough;

var JlPassThrough = function (_PassThrough) {
	_inherits(JlPassThrough, _PassThrough);

	function JlPassThrough(inputType, outputType) {
		_classCallCheck(this, JlPassThrough);

		var _this = _possibleConstructorReturn(this, (JlPassThrough.__proto__ || Object.getPrototypeOf(JlPassThrough)).call(this, {
			objectMode: true,
			highWaterMark: 1
		}));

		_this.inputType = inputType;
		_this.outputType = outputType;
		return _this;
	}

	return JlPassThrough;
}(PassThrough);

module.exports = JlPassThrough;

},{"stream":undefined}],146:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transform = require('stream').Transform;

var JlTransform = function (_Transform) {
	_inherits(JlTransform, _Transform);

	function JlTransform(inputType, outputType) {
		_classCallCheck(this, JlTransform);

		var _this = _possibleConstructorReturn(this, (JlTransform.__proto__ || Object.getPrototypeOf(JlTransform)).call(this, {
			objectMode: true,
			highWaterMark: 1
		}));

		_this.inputType = inputType;
		_this.outputType = outputType;
		return _this;
	}

	return JlTransform;
}(Transform);

JlTransform.RAW = 'JlTransform.RAW';
JlTransform.ANY = 'JlTransform.ANY';
JlTransform.OBJECTS = 'JlTransform.OBJECTS';
JlTransform.ARRAYS_OF_OBJECTS = 'JlTransform.ARRAYS_OF_OBJECTS';

module.exports = JlTransform;

},{"stream":undefined}],147:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transform = require('stream').Transform;
var JlTransform = require('./JlTransform');

var JlTransformsChain = function (_Transform) {
	_inherits(JlTransformsChain, _Transform);

	function JlTransformsChain() {
		var streams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		_classCallCheck(this, JlTransformsChain);

		var _this = _possibleConstructorReturn(this, (JlTransformsChain.__proto__ || Object.getPrototypeOf(JlTransformsChain)).call(this, {
			objectMode: true,
			highWaterMark: 1
		}));

		_this.inputType = JlTransform.ANY;
		_this.outputType = JlTransform.ANY;

		_this.streams = [];
		_this.firstStream = null;
		_this.lastStream = null;

		if (streams) {
			_this.init(streams);
		}
		return _this;
	}

	_createClass(JlTransformsChain, [{
		key: 'init',
		value: function init(streams) {
			var _this2 = this;

			this.streams = streams;
			this.firstStream = streams[0];
			this.lastStream = streams[streams.length - 1];

			this.lastStream.on('end', function () {
				_this2.push(null);
			});

			// workaround for process.stdout, which has special handle of on('data')
			if (this.lastStream !== process.stdout) {
				this.lastStream.on('data', function (d) {
					if (!_this2.push(d)) {
						_this2.lastStream.pause();
					}
				});
			}

			for (var i = 0; i < streams.length - 1; i++) {
				if (streams[i].isTerminator || streams[i + 1].isTerminator) {
					continue;
				}

				streams[i].on('error', function (e) {
					_this2.emit('error', e);
				});

				streams[i].pipe(streams[i + 1]);
			}

			this.lastStream.on('error', function (e) {
				_this2.emit('error', e);
			});
		}
	}, {
		key: '_transform',
		value: function _transform(chunk, encoding, callback) {
			this.firstStream.write(chunk, encoding, callback);
		}
	}, {
		key: '_flush',
		value: function _flush(cb) {
			this.lastStream.once('end', cb);
			this.firstStream.end();
		}
	}, {
		key: '_read',
		value: function _read() {
			var _get2;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			(_get2 = _get(JlTransformsChain.prototype.__proto__ || Object.getPrototypeOf(JlTransformsChain.prototype), '_read', this)).call.apply(_get2, [this].concat(args));

			if (this.lastStream.isPaused()) {
				this.lastStream.resume();
			}
		}
	}]);

	return JlTransformsChain;
}(Transform);

module.exports = JlTransformsChain;

},{"./JlTransform":146,"stream":undefined}],148:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');
var Readable = require('stream').Readable;
var Join = require('../Join');
var EventEmitter = require('events');
var ReadWriteTmpFileStream = require('./ReadWriteTmpFileStream');
var DeepCloner = require('../DeepCloner');

var JsonParser = require('./JsonParser');
var LinesSplitter = require('./LinesSplitter');

var ProgramError = require('../error/ProgramError');
var NotSupported = require('../error/NotSupported');

var Collator = require('../Collator');
var DataType = require('../DataType');

var Joiner = function (_Readable) {
	_inherits(Joiner, _Readable);

	/**
  *
  * @param {Join} join
  */
	function Joiner(preparingContext, join, mainValueCb, mainStreamSorted, joiningValueCb, joiningStreamSorted) {
		_classCallCheck(this, Joiner);

		var _this = _possibleConstructorReturn(this, (Joiner.__proto__ || Object.getPrototypeOf(Joiner)).call(this, {
			objectMode: true,
			highWaterMark: 1
		}));

		_this.preparingContext = preparingContext;

		_this.inputType = JlTransform.ARRAYS_OF_OBJECTS;
		_this.outputType = JlTransform.ARRAYS_OF_OBJECTS;

		_this.join = join;

		_this.mainValueCb = mainValueCb;
		_this.joiningValueCb = joiningValueCb;

		_this.currentKey = undefined;
		_this.currentKeyMainRow = undefined;
		_this.currentKeyBuffer = new Joiner.KeyBuffer(preparingContext);

		_this.keyBufferFlusher = null;

		_this.mainBuffer = new Joiner.InputBuffer(mainStreamSorted);
		_this.joiningBuffer = new Joiner.InputBuffer(joiningStreamSorted);

		mainStreamSorted.on('error', function (err) {
			_this.emit('error', err);
		});

		joiningStreamSorted.on('error', function (err) {
			_this.emit('error', err);
		});
		return _this;
	}

	_createClass(Joiner, [{
		key: 'mainKey',
		value: function mainKey(row) {
			return Collator.generateGroupKey(DataType.STRING, this.mainValueCb(row));
		}
	}, {
		key: 'joiningKey',
		value: function joiningKey(row) {
			return Collator.generateGroupKey(DataType.STRING, this.joiningValueCb(row));
		}
	}, {
		key: 'popOutput',
		value: function popOutput(cb) {
			var _this2 = this;

			this.mainBuffer.head(function (mainRow) {
				var nextMainRow = function nextMainRow(cb) {
					_this2.mainBuffer.next();

					if (!_this2.currentKeyBuffer.isEmpty()) {
						_this2.startFlushKeyBuffer(cb);
					} else if (_this2.join.type === Join.LEFT) {
						cb([mainRow]);
					} else {
						_this2.readNextChunk(cb);
					}
				};

				if (!mainRow) {
					cb(null);

					return;
				}

				var mainKey = _this2.mainKey(mainRow);

				if (_this2.currentKeyMainRow !== mainRow) {
					_this2.currentKeyMainRow = mainRow;

					if (_this2.currentKey === mainKey) {
						nextMainRow(cb);

						return;
					}

					_this2.currentKey = mainKey;
					_this2.currentKeyBuffer.clear();
				}

				var continueJoining = function continueJoining(cb) {
					_this2.joiningBuffer.head(function (joiningRow) {
						if (!joiningRow) {
							nextMainRow(cb);

							return;
						}

						var joiningKey = _this2.joiningKey(joiningRow);

						if (mainKey === joiningKey) {
							_this2.currentKeyBuffer.push(joiningRow, function () {
								_this2.joiningBuffer.next();
								setImmediate(function () {
									return continueJoining(cb);
								});
							});
						} else if (mainKey < joiningKey) {

							nextMainRow(cb);
						} else {
							// mainKey > joiningKey
							_this2.joiningBuffer.next();

							setImmediate(function () {
								return continueJoining(cb);
							});
						}
					});
				};

				continueJoining(cb);
			});
		}
	}, {
		key: 'readNextChunk',
		value: function readNextChunk(cb) {
			var _this3 = this;

			setImmediate(function () {
				if (_this3.keyBufferFlusher) {
					_this3.flushKeyBufferChunk(cb);
				} else {
					_this3.popOutput(cb);
				}
			});
		}
	}, {
		key: '_read',
		value: function _read() {
			var _this4 = this;

			this.readNextChunk(function (rows) {
				_this4.push(rows);
			});
		}
	}, {
		key: 'startFlushKeyBuffer',
		value: function startFlushKeyBuffer(cb) {
			this.keyBufferFlusher = this.currentKeyBuffer.startFlush(this.currentKeyMainRow, this.join.joiningDataSourceName);

			this.flushKeyBufferChunk(cb);
		}
	}, {
		key: 'flushKeyBufferChunk',
		value: function flushKeyBufferChunk(cb) {
			var _this5 = this;

			this.keyBufferFlusher.readChunk(function (chunk) {
				if (chunk === null) {
					// буфер кончился, надо читать дальше
					_this5.keyBufferFlusher = null;
					_this5.readNextChunk(cb);

					return;
				}

				cb(chunk);
			});
		}
	}]);

	return Joiner;
}(Readable);

Joiner.InputBuffer = function (_EventEmitter) {
	_inherits(Joiner_InputBuffer, _EventEmitter);

	function Joiner_InputBuffer(readableStream) {
		var maxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;

		_classCallCheck(this, Joiner_InputBuffer);

		var _this6 = _possibleConstructorReturn(this, (Joiner_InputBuffer.__proto__ || Object.getPrototypeOf(Joiner_InputBuffer)).call(this));

		_this6.stream = readableStream;
		_this6.maxSize = maxSize;
		_this6.items = [];
		_this6.offset = 0;

		_this6.streamEnded = false;
		_this6.ended = false;

		_this6.itemHandler = null;

		_this6.stream.on('end', function () {
			_this6.streamEnded = true;

			if (_this6.itemHandler) {
				var itemHandler = _this6.itemHandler;

				_this6.itemHandler = null;

				_this6.head(itemHandler);
			}
		});

		_this6.stream.on('data', function (data) {
			if (_this6.isEmpty()) {
				_this6.offset = 0;
				_this6.items = data;
			}

			if (_this6.items.length > _this6.maxSize) {
				_this6.stream.pause();
			}

			if (_this6.itemHandler) {
				var itemHandler = _this6.itemHandler;

				_this6.itemHandler = null;

				_this6.head(itemHandler);
			}
		});
		return _this6;
	}

	_createClass(Joiner_InputBuffer, [{
		key: 'head',
		value: function head(cb) {
			if (this.isEmpty()) {
				if (this.streamEnded) {
					cb(null);
				} else {
					if (this.itemHandler) {
						throw new ProgramError('Only one item handle is allowed');
					}

					this.itemHandler = cb;
				}
			} else {
				cb(this.items[this.offset]);
			}
		}
	}, {
		key: 'next',
		value: function next() {
			var _this7 = this;

			if (this.offset + 1 > this.items.length) {
				throw new ProgramError('shift behind end');
			}

			this.offset++;

			if (this.isEmpty()) {
				if (this.streamEnded) {
					setImmediate(function () {
						_this7.emit('end');
					});
				} else {
					this.stream.resume();
				}
			}
		}
	}, {
		key: 'isEmpty',
		value: function isEmpty() {
			return this.offset >= this.items.length;
		}
	}, {
		key: 'isEnded',
		value: function isEnded() {
			return this.streamEnded && this.isEmpty();
		}
	}, {
		key: '_optimize',
		value: function _optimize() {
			this.items = this.items.slice(this.offset);
			this.offset = 0;
		}
	}]);

	return Joiner_InputBuffer;
}(EventEmitter);

Joiner.KeyBuffer = function () {
	function Joiner_KeyBuffer(preparingContext) {
		_classCallCheck(this, Joiner_KeyBuffer);

		if (!preparingContext) {
			throw new Error();
		}

		this.preparingContext = preparingContext;
		this.items = [];
		this.maxInMemorySize = preparingContext.options.joinOptions.maxKeysInMemory;
		this.forceInMemory = preparingContext.options.joinOptions.forceInMemory;

		this.fileStorage = null;
	}

	_createClass(Joiner_KeyBuffer, [{
		key: 'push',
		value: function push(item, cb) {
			if (this.fileStorage) {
				this._pushToFileStorage(item, cb);

				return;
			}

			this.items.push(item);

			if (!this.forceInMemory && this.items.length > this.maxInMemorySize) {
				this._convertToFileStorage(cb);
			} else {
				cb();
			}
		}
	}, {
		key: '_pushToFileStorage',
		value: function _pushToFileStorage(row, cb) {
			this.fileStorage.write(row, cb);
		}
	}, {
		key: '_convertToFileStorage',
		value: function _convertToFileStorage(cb) {
			var tmpdir = this.preparingContext.options.joinOptions.tmpDir || require('os').tmpdir();

			this.fileStorage = new Joiner.KeyBufferFileStorage(tmpdir, this.items);
			this.items = [];
			this.fileStorage.once('create', cb);
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.items = [];

			if (this.fileStorage) {
				this.fileStorage.closeSync();
				this.fileStorage = null;
			}
		}
	}, {
		key: 'isEmpty',
		value: function isEmpty() {
			return !(this.items.length || this.fileStorage);
		}
	}, {
		key: 'read',
		value: function read(lastOffset, cb) {
			if (this.fileStorage) {
				this._readFileStorage(lastOffset, cb);

				return;
			}

			throw new NotSupported();
		}
	}, {
		key: '_readFileStorage',
		value: function _readFileStorage(readable, cb) {
			var stream = readable;

			if (!stream) {
				stream = this.fileStorage.createReadStream();
				stream.on('end', function () {
					stream.ended = true;

					if (stream.endHandler) {
						stream.endHandler();
					}
				});
			}

			if (stream.ended) {
				cb(null, stream);
			} else {
				stream.endHandler = function () {
					stream.endHandler = null;
					cb(null, stream);
				};

				stream.once('data', function (rows) {
					stream.endHandler = null;
					cb(rows, stream);
				});
			}
		}
	}, {
		key: 'startFlush',
		value: function startFlush(mainRow, joiningSourceName) {
			if (this.fileStorage) {
				return new Joiner.KeyBufferFlusher_External(mainRow, joiningSourceName, this, 1000);
			}

			return new Joiner.KeyBufferFlusher_InMemory(mainRow, joiningSourceName, this.items, 1000);
		}
	}]);

	return Joiner_KeyBuffer;
}();

Joiner.KeyBufferFileStorage = function (_EventEmitter2) {
	_inherits(Joiner_KeyBufferFileStorage, _EventEmitter2);

	function Joiner_KeyBufferFileStorage(tmpdir, items) {
		_classCallCheck(this, Joiner_KeyBufferFileStorage);

		var _this8 = _possibleConstructorReturn(this, (Joiner_KeyBufferFileStorage.__proto__ || Object.getPrototypeOf(Joiner_KeyBufferFileStorage)).call(this));

		_this8.file = new ReadWriteTmpFileStream('join_', tmpdir);

		_this8.file.once('open', function () {
			_this8.file.write(items.map(JSON.stringify).join('\n') + '\n', function (err) {
				if (err) {
					throw err;
				}

				_this8.emit('create');
			});
		});
		return _this8;
	}

	_createClass(Joiner_KeyBufferFileStorage, [{
		key: 'write',
		value: function write(row, cb) {
			this.file.write(JSON.stringify(row) + '\n', cb);
		}
	}, {
		key: 'createReadStream',
		value: function createReadStream() {
			return this.file.createReadStream().pipe(new LinesSplitter()).pipe(new JsonParser());
		}
	}, {
		key: 'closeSync',
		value: function closeSync() {
			this.file.closeSync();
		}
	}]);

	return Joiner_KeyBufferFileStorage;
}(EventEmitter);

Joiner.KeyBufferFlusher_InMemory = function () {
	function Joiner_KeyBufferFlusher_InMemory(mainRow, joiningSourceName, items, chunkSize) {
		_classCallCheck(this, Joiner_KeyBufferFlusher_InMemory);

		this.mainRow = mainRow;
		this.joiningSourceName = joiningSourceName;
		this.items = items;
		this.offset = 0;
		this.chunkSize = chunkSize;
	}

	_createClass(Joiner_KeyBufferFlusher_InMemory, [{
		key: 'readChunk',
		value: function readChunk(cb) {
			var chunk = [];

			for (; this.offset < this.items.length; this.offset++) {
				var joiningRow = this.items[this.offset];

				chunk.push(this.mergeRows(this.mainRow, joiningRow));

				if (chunk.length >= this.chunkSize) {
					break;
				}
			}

			if (!chunk.length) {
				cb(null);

				return;
			}

			cb(chunk);
		}
	}, {
		key: 'mergeRows',
		value: function mergeRows(mainRow, joiningRow) {
			var merged = DeepCloner.clone(mainRow);

			merged.sources[this.joiningSourceName] = joiningRow.sources[this.joiningSourceName];

			return merged;
		}
	}]);

	return Joiner_KeyBufferFlusher_InMemory;
}();

Joiner.KeyBufferFlusher_External = function () {
	function Joiner_KeyBufferFlusher(mainRow, joiningSourceName, keyBuffer, chunkSize) {
		_classCallCheck(this, Joiner_KeyBufferFlusher);

		this.mainRow = mainRow;
		this.joiningSourceName = joiningSourceName;
		this.keyBuffer = keyBuffer;
		this.chunkSize = chunkSize;

		this.lastOffset = null;
	}

	_createClass(Joiner_KeyBufferFlusher, [{
		key: 'readChunk',
		value: function readChunk(cb) {
			var _this9 = this;

			var chunk = [];

			var popNext = function popNext() {
				_this9.keyBuffer.read(_this9.lastOffset, function (joiningRows, offset) {
					_this9.lastOffset = offset;

					if (!joiningRows) {
						if (chunk.length) {
							cb(chunk);
						} else {
							cb(null);
						}

						return;
					}

					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = joiningRows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var joiningRow = _step.value;

							chunk.push(_this9.mergeRows(_this9.mainRow, joiningRow));
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					if (chunk.length >= _this9.chunkSize) {
						cb(chunk);

						return;
					}

					setImmediate(popNext);
				});
			};

			popNext();
		}
	}, {
		key: 'mergeRows',
		value: function mergeRows(mainRow, joiningRow) {
			var merged = DeepCloner.clone(mainRow);

			merged.sources[this.joiningSourceName] = joiningRow.sources[this.joiningSourceName];

			return merged;
		}
	}]);

	return Joiner_KeyBufferFlusher;
}();

module.exports = Joiner;

},{"../Collator":17,"../DataType":25,"../DeepCloner":26,"../Join":32,"../error/NotSupported":58,"../error/ProgramError":59,"./JlTransform":146,"./JsonParser":149,"./LinesSplitter":153,"./ReadWriteTmpFileStream":156,"events":undefined,"os":undefined,"stream":undefined}],149:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');
var JsonParsingError = require('../error/JsonParsingError');

var JsonParser = function (_JlTransform) {
	_inherits(JsonParser, _JlTransform);

	function JsonParser() {
		_classCallCheck(this, JsonParser);

		return _possibleConstructorReturn(this, (JsonParser.__proto__ || Object.getPrototypeOf(JsonParser)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));
	}

	_createClass(JsonParser, [{
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			var parsed = [];

			for (var i = 0; i < chunk.length; i++) {
				var json = chunk[i];

				try {
					parsed.push(JSON.parse(' ' + json));
				} catch (e) {
					if (/^\s+$/.test(json)) {
						continue;
					}

					this.emit('error', new JsonParsingError(e.message, chunk[i]));
				}
			}

			if (parsed.length) {
				this.push(parsed);
			}

			cb();
		}
	}]);

	return JsonParser;
}(JlTransform);

module.exports = JsonParser;

},{"../error/JsonParsingError":56,"./JlTransform":146}],150:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');
var JsonBorderExplorer = require('../json/JsonBorderExplorer');

var JsonSplitter = function (_JlTransform) {
	_inherits(JsonSplitter, _JlTransform);

	function JsonSplitter() {
		_classCallCheck(this, JsonSplitter);

		var _this = _possibleConstructorReturn(this, (JsonSplitter.__proto__ || Object.getPrototypeOf(JsonSplitter)).call(this, JlTransform.RAW, JlTransform.ARRAYS_OF_OBJECTS));

		_this.head = [];
		_this.explorer = new JsonBorderExplorer();
		return _this;
	}

	_createClass(JsonSplitter, [{
		key: '_transform',
		value: function _transform(buf, enc, cb) {
			var off = 0;
			var lastOff = 0;

			var jsons = [];

			while ((off = this.explorer.write(buf, off)) !== -1) {
				if (this.head.length) {
					// нашли конец объекта, который начался в прошлых чанках
					this.head.push(buf.slice(0, off));

					jsons.push([Buffer.concat(this.head).toString()]);

					this.head = [];
					lastOff = off;

					continue;
				}

				var json = buf.toString('utf8', lastOff, off);

				jsons.push(json);

				lastOff = off;
			}

			this.head.push(buf.slice(lastOff));

			if (jsons.length) {
				this.push(jsons);
			}

			cb();
		}
	}, {
		key: '_flush',
		value: function _flush(cb) {
			var off = this.explorer.end();

			if (off === -1) {
				cb();

				return;
			}

			if (this.head.length) {
				this.push([Buffer.concat(this.head).toString()]);
				this.head = [];
			}

			cb();
		}
	}]);

	return JsonSplitter;
}(JlTransform);

module.exports = JsonSplitter;

},{"../json/JsonBorderExplorer":68,"./JlTransform":146}],151:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');

var JsonStringifier = function (_JlTransform) {
	_inherits(JsonStringifier, _JlTransform);

	function JsonStringifier() {
		_classCallCheck(this, JsonStringifier);

		return _possibleConstructorReturn(this, (JsonStringifier.__proto__ || Object.getPrototypeOf(JsonStringifier)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));
	}

	_createClass(JsonStringifier, [{
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			var jsons = [];

			for (var i = 0; i < chunk.length; i++) {
				jsons.push(JSON.stringify(chunk[i]));
			}

			this.push(jsons);

			cb();
		}
	}]);

	return JsonStringifier;
}(JlTransform);

module.exports = JsonStringifier;

},{"./JlTransform":146}],152:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');

var LinesJoiner = function (_JlTransform) {
	_inherits(LinesJoiner, _JlTransform);

	function LinesJoiner() {
		_classCallCheck(this, LinesJoiner);

		var _this = _possibleConstructorReturn(this, (LinesJoiner.__proto__ || Object.getPrototypeOf(LinesJoiner)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.RAW));

		_this.glue = '\n';
		return _this;
	}

	_createClass(LinesJoiner, [{
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			this.push(chunk.join(this.glue) + this.glue);

			cb();
		}
	}]);

	return LinesJoiner;
}(JlTransform);

module.exports = LinesJoiner;

},{"./JlTransform":146}],153:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');

var LinesSplitter = function (_JlTransform) {
	_inherits(LinesSplitter, _JlTransform);

	function LinesSplitter() {
		_classCallCheck(this, LinesSplitter);

		var _this = _possibleConstructorReturn(this, (LinesSplitter.__proto__ || Object.getPrototypeOf(LinesSplitter)).call(this, JlTransform.RAW, JlTransform.ARRAYS_OF_OBJECTS));

		_this.ending = '\n';
		_this.endingCode = 0x0a;

		_this.tail = Buffer.alloc(0);
		return _this;
	}

	_createClass(LinesSplitter, [{
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			var lastLineBreakPos = chunk.lastIndexOf(this.endingCode);

			if (lastLineBreakPos === -1) {
				if (this.tail.length) {
					this.tail = Buffer.concat([this.tail, chunk]);
				} else {
					this.tail = chunk;
				}

				cb();

				return;
			}

			var chunkWoTail = chunk.slice(0, lastLineBreakPos);
			var body = Buffer.concat([this.tail, chunkWoTail]).toString();

			this.tail = chunk.slice(lastLineBreakPos + 1);

			var lines = body.split(this.ending);

			var bucket = [];

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var line = _step.value;

					if (line.length) {
						bucket.push(line);
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (bucket.length) {
				this.push(bucket);
			}

			cb();
		}
	}, {
		key: '_flush',
		value: function _flush(cb) {
			if (this.tail.length) {
				this.push([this.tail]);
				this.tail = '';
			}

			cb();
		}
	}]);

	return LinesSplitter;
}(JlTransform);

module.exports = LinesSplitter;

},{"./JlTransform":146}],154:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');

var Mutator = function (_JlTransform) {
	_inherits(Mutator, _JlTransform);

	function Mutator(func) {
		_classCallCheck(this, Mutator);

		var _this = _possibleConstructorReturn(this, (Mutator.__proto__ || Object.getPrototypeOf(Mutator)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));

		_this.func = func;
		return _this;
	}

	_createClass(Mutator, [{
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			var result = [];

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = chunk[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var row = _step.value;

					result.push(this.func(row));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.push(result);

			cb();
		}
	}]);

	return Mutator;
}(JlTransform);

module.exports = Mutator;

},{"./JlTransform":146}],155:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');
var PropertiesPicker = require('../PropertiesPicker');
var DataRow = require('../DataRow');
var DeepCloner = require('../DeepCloner');

var PropertiesPickerTransformer = function (_JlTransform) {
	_inherits(PropertiesPickerTransformer, _JlTransform);

	function PropertiesPickerTransformer(paths) {
		var makeClone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var updateIfCb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		_classCallCheck(this, PropertiesPickerTransformer);

		var _this = _possibleConstructorReturn(this, (PropertiesPickerTransformer.__proto__ || Object.getPrototypeOf(PropertiesPickerTransformer)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));

		_this.propertiesPicker = new PropertiesPicker(paths);
		_this.makeClone = !!makeClone;
		_this.updateIfCb = updateIfCb;
		return _this;
	}

	_createClass(PropertiesPickerTransformer, [{
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			var result = [];

			for (var i = 0; i < chunk.length; i++) {
				var row = chunk[i];

				if (this.updateIfCb && !this.updateIfCb(row)) {
					result.push(row);
					continue;
				}

				if (this.makeClone) {
					var dest = DeepCloner.clone(row);

					this.propertiesPicker.mergeProperties(row, dest.sources);

					result.push(dest);
				} else {
					var _dest = new DataRow(null);

					_dest.sources = this.propertiesPicker.sliceProperties(row);

					result.push(_dest);
				}
			}

			this.push(result);

			cb();
		}
	}]);

	return PropertiesPickerTransformer;
}(JlTransform);

module.exports = PropertiesPickerTransformer;

},{"../DataRow":20,"../DeepCloner":26,"../PropertiesPicker":37,"./JlTransform":146}],156:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var os = require('os');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var EventEmitter = require('events');

var ReadWriteTmpFileStream = function (_EventEmitter) {
	_inherits(ReadWriteTmpFileStream, _EventEmitter);

	function ReadWriteTmpFileStream() {
		var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'node_tmp_';
		var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : os.tmpdir();

		_classCallCheck(this, ReadWriteTmpFileStream);

		var _this = _possibleConstructorReturn(this, (ReadWriteTmpFileStream.__proto__ || Object.getPrototypeOf(ReadWriteTmpFileStream)).call(this));

		var p = ReadWriteTmpFileStream.generateTmpPath(dir, prefix);

		_this.fd = null;

		fs.open(p, 'wx+', 0, function (err, fd) {
			if (err) {
				_this.emit('error', err);

				return;
			}

			fs.unlink(p, function (err) {
				if (err) {
					_this.emit('error', err);

					return;
				}

				_this.fd = fd;

				_this.emit('open', _this.fd);
			});
		});
		return _this;
	}

	_createClass(ReadWriteTmpFileStream, [{
		key: 'write',
		value: function write(buffer, cb) {
			var _this2 = this;

			fs.write(this.fd, buffer, function (err) {
				if (cb) {
					cb(err);
				} else if (err) {
					_this2.emit('error', err);
				}
			});
		}
	}, {
		key: 'createReadStream',
		value: function createReadStream() {
			return fs.createReadStream('/nonexistent', {
				fd: this.fd,
				start: 0,
				autoClose: false
			});
		}
	}, {
		key: 'closeSync',
		value: function closeSync() {
			fs.closeSync(this.fd);
			this.fd = null;
		}
	}], [{
		key: 'generateTmpPath',
		value: function generateTmpPath(dir, prefix) {
			var name = prefix + crypto.randomBytes(16).toString('hex');
			var p = path.join(dir, name);

			return p;
		}
	}]);

	return ReadWriteTmpFileStream;
}(EventEmitter);

module.exports = ReadWriteTmpFileStream;

},{"crypto":undefined,"events":undefined,"fs":undefined,"os":undefined,"path":undefined}],157:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SorterInMemory = require('./SorterInMemory');
var SorterExternal = require('./SorterExternal');
var JlTransform = require('./JlTransform');

var Sorter = function (_JlTransform) {
	_inherits(Sorter, _JlTransform);

	/**
  * @param {Order[]} orders
  * @param {SortOptions} options
  */
	function Sorter(orders, options) {
		_classCallCheck(this, Sorter);

		var _this = _possibleConstructorReturn(this, (Sorter.__proto__ || Object.getPrototypeOf(Sorter)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));

		_this.orders = orders;
		_this.options = options;

		_this.inMemory = new SorterInMemory(orders, options);
		_this.external = null;

		_this.flushCb = null;

		_this.stream = null;

		_this._handleStream(_this.inMemory);
		return _this;
	}

	_createClass(Sorter, [{
		key: '_handleStream',
		value: function _handleStream(stream) {
			this.stream = stream;
			stream.on('data', this._onStreamData.bind(this));
			stream.on('end', this._onStreamEnd.bind(this));
		}
	}, {
		key: '_onStreamData',
		value: function _onStreamData(data) {
			var flushed = this.push(data);

			if (!flushed) {
				this.stream.pause();
			}
		}
	}, {
		key: '_onStreamEnd',
		value: function _onStreamEnd() {
			this.flushCb();
		}
	}, {
		key: '_convertToExternal',
		value: function _convertToExternal(cb) {
			var external = new SorterExternal(this.orders, this.options);
			var inMemoryBuffer = this.inMemory.buffer();

			this.inMemory.clear();
			this._handleStream(external);
			this.inMemory = null;
			this.external = external;

			external.write(inMemoryBuffer, null, cb);
		}
	}, {
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			if (this.inMemory) {
				this.inMemory.write(chunk);

				if (!this.options.forceInMemory && this.inMemory.bufferSize() > this.options.inMemoryBufferSize) {
					this._convertToExternal(cb);
				} else {
					cb();
				}
			} else {
				this.external.write(chunk, encoding, cb);
			}
		}
	}, {
		key: '_flush',
		value: function _flush(cb) {
			if (this.inMemory) {
				this.inMemory.end();
			} else {
				this.external.end();
			}

			this.flushCb = cb;
		}
	}, {
		key: '_read',
		value: function _read() {
			var _get2;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			(_get2 = _get(Sorter.prototype.__proto__ || Object.getPrototypeOf(Sorter.prototype), '_read', this)).call.apply(_get2, [this].concat(args));

			if (this.stream.isPaused()) {
				this.stream.resume();
			}
		}
	}]);

	return Sorter;
}(JlTransform);

module.exports = Sorter;

},{"./JlTransform":146,"./SorterExternal":158,"./SorterInMemory":159}],158:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransformsChain = require('./JlTransformsChain');
var Order = require('../Order');
var SortWrapper = require('../external/sort/SortWrapper');
var CutWrapper = require('../external/CutWrapper');
var SortInputTransform = require('../external/sort/SortInputTransform');
var LinesSplitter = require('./LinesSplitter');
var JsonParser = require('./JsonParser');
var Terminator = require('./Terminator');
var DataType = require('../DataType');

var ProgramError = require('../error/ProgramError');

var SorterExternal = function (_JlTransformsChain) {
	_inherits(SorterExternal, _JlTransformsChain);

	/**
  * @param {Order[]} orders
  * @param {SortOptions} options
  */
	function SorterExternal(orders, options) {
		_classCallCheck(this, SorterExternal);

		if (!orders.length) {
			throw new ProgramError('Empty orders');
		}

		var _this = _possibleConstructorReturn(this, (SorterExternal.__proto__ || Object.getPrototypeOf(SorterExternal)).call(this));

		_this.orders = orders;

		var preparedSortInput = new SortInputTransform(orders);

		var combinedOptions = options.clone();

		combinedOptions.separator = preparedSortInput.columnSeparator;
		combinedOptions.keys = _this.keysDefinition(orders);

		var sort = new SortWrapper(combinedOptions);
		var cut = new CutWrapper(preparedSortInput.columnSeparator, orders.length + 1 + '-');

		sort.stdout.pipe(cut.stdin);

		_this.init([preparedSortInput, sort.stdin, new Terminator(), cut.stdout, new LinesSplitter(), new JsonParser()]);
		return _this;
	}

	_createClass(SorterExternal, [{
		key: 'keysDefinition',
		value: function keysDefinition(orders) {
			var keys = [];

			for (var i in orders) {
				var order = orders[i];
				var dataType = order.dataType;

				var sn = parseInt(i, 10) + 1;
				var def = sn + ',' + sn;

				if (order.direction === Order.DIRECTION_DESC) {
					def += 'r';
				}

				if (dataType === DataType.NUMBER) {
					def += 'n';
				}

				keys.push(def);
			}

			return keys;
		}
	}]);

	return SorterExternal;
}(JlTransformsChain);

module.exports = SorterExternal;

},{"../DataType":25,"../Order":35,"../error/ProgramError":59,"../external/CutWrapper":64,"../external/sort/SortInputTransform":66,"../external/sort/SortWrapper":67,"./JlTransformsChain":147,"./JsonParser":149,"./LinesSplitter":153,"./Terminator":160}],159:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JlTransform = require('./JlTransform');
var Order = require('../Order');
var Collator = require('../Collator');

var ProgramError = require('../error/ProgramError');

/**
 * Тупейший алгоритм сортировки: сохраняем всё в памятьЮ а потом сортируем
 * TODO Переделать на нормальную схему
 */

var SorterInMemory = function (_JlTransform) {
	_inherits(SorterInMemory, _JlTransform);

	function SorterInMemory(orders) {
		_classCallCheck(this, SorterInMemory);

		if (!orders.length) {
			throw new ProgramError('Empty orders');
		}

		var _this = _possibleConstructorReturn(this, (SorterInMemory.__proto__ || Object.getPrototypeOf(SorterInMemory)).call(this, JlTransform.ARRAYS_OF_OBJECTS, JlTransform.ARRAYS_OF_OBJECTS));

		_this.orders = orders;
		_this.objects = [];
		return _this;
	}

	_createClass(SorterInMemory, [{
		key: 'bufferSize',
		value: function bufferSize() {
			return this.objects.length;
		}
	}, {
		key: 'buffer',
		value: function buffer() {
			return this.objects;
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.objects = [];
		}
	}, {
		key: '_transform',
		value: function _transform(chunk, encoding, cb) {
			for (var i = 0; i < chunk.length; i++) {
				this.objects.push(chunk[i]);
			}

			cb();
		}
	}, {
		key: '_flush',
		value: function _flush(cb) {
			this.objects.sort(this.sortingFunction());

			this.push(this.objects);
			this.objects = [];

			cb();
		}
	}, {
		key: 'sortingFunction',
		value: function sortingFunction() {
			var _this2 = this;

			var compare = function compare(row1, row2) {
				for (var i = 0; i < _this2.orders.length; i++) {
					var order = _this2.orders[i];
					var direction = order.direction === Order.DIRECTION_DESC ? -1 : 1;

					var key1 = order.valueFunction(row1);
					var key2 = order.valueFunction(row2);

					var diff = Collator.compareSortKeys(order.dataType, key1, key2);

					if (diff) {
						return direction * diff;
					}
				}

				return 0;
			};

			return compare;
		}
	}]);

	return SorterInMemory;
}(JlTransform);

module.exports = SorterInMemory;

},{"../Collator":17,"../Order":35,"../error/ProgramError":59,"./JlTransform":146}],160:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Writable = require('stream').Writable;

var Terminator = function (_Writable) {
	_inherits(Terminator, _Writable);

	function Terminator() {
		_classCallCheck(this, Terminator);

		var _this = _possibleConstructorReturn(this, (Terminator.__proto__ || Object.getPrototypeOf(Terminator)).call(this, {
			objectMode: true
		}));

		_this.isTerminator = true;
		return _this;
	}

	_createClass(Terminator, [{
		key: '_write',
		value: function _write(chunk, charset, cb) {
			cb();
		}
	}]);

	return Terminator;
}(Writable);

module.exports = Terminator;

},{"stream":undefined}],161:[function(require,module,exports){
"use strict";

// Generated by ToffeeScript 1.4.0
(function () {
  var Getopt,
      ParsedOption,
      __hasProp = {}.hasOwnProperty,
      __matches = null;

  ParsedOption = function () {

    function ParsedOption(argv, options) {
      this.argv = argv;
      this.options = options;
    }

    ParsedOption.prototype.empty = function () {
      var k, v, _ref;
      if (this.argv.length) {
        return false;
      }
      _ref = this.options;
      for (k in _ref) {
        if (!__hasProp.call(_ref, k)) continue;
        v = _ref[k];
        return false;
      }
      return true;
    };

    return ParsedOption;
  }();

  Getopt = function () {

    Getopt.HAS_ARGUMENT = true;

    Getopt.NO_ARGUMENT = false;

    Getopt.MULTI_SUPPORTED = true;

    Getopt.SINGLE_ONLY = false;

    Getopt.VERSION = '0.2.3';

    function Getopt(options) {
      var comment, definition, has_argument, long_name, multi_supported, name, option, optional, short_name, _i, _len, _ref;
      this.options = options;
      this.short_options = {};
      this.long_options = {};
      this.long_names = [];
      this.events = {};
      this.event_names = [];
      this.errorFunc = function (e) {
        console.info(e.message);
        return process.exit(1);
      };
      if (process.argv[1]) {
        this.help = "Usage: node " + process.argv[1].match(/(?:.*[\/\\])?(.*)$/)[1] + "\n\n[[OPTIONS]]\n";
      } else {
        this.help = "[[OPTIONS]]";
      }
      _ref = this.options;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        short_name = option[0], definition = option[1], comment = option[2];
        if (comment == null) {
          comment = '';
        }
        if (definition == null) {
          definition = '';
        }
        if (short_name == null) {
          short_name = '';
        }
        __matches = definition.match(/^([\w\-]*)/);
        long_name = __matches[1];
        has_argument = definition.indexOf('=') !== -1;
        multi_supported = definition.indexOf('+') !== -1;
        optional = /\[=.*?\]/.test(definition);
        long_name = long_name.trim();
        short_name = short_name.trim();
        if (optional && short_name) {
          throw new Error('optional argument can only work with long option');
        }
        if (!long_name) {
          long_name = short_name;
        }
        name = long_name;
        if (long_name === '') {
          throw new Error("empty option found. the last option name is " + this.long_names.slice(-1));
        }
        if (this.long_options[long_name] == null) {
          this.long_names.push(long_name);
          this.long_options[long_name] = {
            name: name,
            short_name: short_name,
            long_name: long_name,
            has_argument: has_argument,
            multi_supported: multi_supported,
            comment: comment,
            optional: optional,
            definition: definition
          };
        } else {
          throw new Error("option " + long_name + " redefined.");
        }
        if (short_name !== '') {
          if (short_name.length !== 1) {
            throw new Error('short option must be single characters');
          }
          this.short_options[short_name] = this.long_options[long_name];
        }
      }
      this;
    }

    Getopt.prototype.on = function (name, cb) {
      this.events[name] = cb;
      this.event_names.push(name);
      return this;
    };

    Getopt.prototype.emit = function (name, cb) {
      if (this.events[name]) {
        return this.events[name].call(this, this.parsedOption.argv, this.parsedOption.options);
      } else {
        throw new Error("Getopt trigger '" + name + "' is not found");
      }
    };

    Getopt.prototype.trigger_events_ = function () {
      var name, options, _i, _len, _ref;
      options = this.parsedOption.options;
      _ref = this.event_names;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        if (options[name] != null) {
          this.emit(name);
        }
      }
      return this;
    };

    Getopt.prototype.save_option_ = function (options, option, argv) {
      var name, names, value, _i, _len, _ref;
      if (option.has_argument) {
        if (argv.length === 0) {
          throw new Error("option " + option.long_name + " need argument");
        }
        value = argv.shift();
      } else {
        value = true;
      }
      names = [option.name];
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        if (option.multi_supported) {
          if ((_ref = options[name]) == null) {
            options[name] = [];
          }
          options[name].push(value);
        } else {
          options[name] = value;
        }
      }
      return this;
    };

    Getopt.prototype.parse = function (argv) {
      var arg, i, long_name, option, rt_argv, rt_options, short_name, short_names, value, _i, _len;
      try {
        argv = argv.slice(0);
        rt_options = {};
        rt_argv = [];
        while ((arg = argv.shift()) != null) {
          if (__matches = arg.match(/^-(\w[\w\-]*)/)) {
            short_names = __matches[1];
            for (i = _i = 0, _len = short_names.length; _i < _len; i = ++_i) {
              short_name = short_names[i];
              option = this.short_options[short_name];
              if (!option) {
                throw new Error("invalid option " + short_name);
              }
              if (option.has_argument) {
                if (i < arg.length - 2) {
                  argv.unshift(arg.slice(i + 2));
                }
                this.save_option_(rt_options, option, argv);
                break;
              } else {
                this.save_option_(rt_options, option, argv);
              }
            }
          } else if (__matches = arg.match(/^--(\w[\w\-]*)((?:=.*)?)$/)) {
            long_name = __matches[1];
            value = __matches[2];
            option = this.long_options[long_name];
            if (!option) {
              throw new Error("invalid option " + long_name);
            }
            if (value !== '') {
              value = value.slice(1);
              argv.unshift(value);
            } else if (option.optional) {
              argv.unshift('');
            }
            this.save_option_(rt_options, option, argv);
          } else if (arg === '--') {
            rt_argv = rt_argv.concat(argv);
            break;
          } else {
            rt_argv.push(arg);
          }
        }
      } catch (e) {
        this.errorFunc(e);
      }
      this.parsedOption = new ParsedOption(rt_argv, rt_options);
      this.trigger_events_();
      return this.parsedOption;
    };

    Getopt.prototype.parse_system = function () {
      return this.parse(process.argv.slice(2));
    };

    Getopt.prototype.parseSystem = function () {
      return this.parse_system();
    };

    Getopt.prototype.setHelp = function (help) {
      this.help = help;
      return this;
    };

    Getopt.prototype.getHelp = function () {
      var comment, definition, long_name, opt, option, options, short_name, strs, ws, _i, _len, _ref;
      ws = [];
      options = [];
      _ref = this.long_names;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        long_name = _ref[_i];
        option = this.long_options[long_name];
        short_name = option.short_name, long_name = option.long_name, comment = option.comment, definition = option.definition;
        if (short_name && short_name === long_name) {
          opt = "-" + short_name;
        } else if (short_name) {
          opt = "-" + short_name + ", --" + definition;
        } else {
          opt = "    --" + definition;
        }
        ws[0] = Math.max(ws[0] >> 0, opt.length);
        options.push([opt, comment]);
      }
      strs = function () {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = options.length; _j < _len1; _j++) {
          option = options[_j];
          opt = option[0], comment = option[1];
          while (opt.length < ws[0]) {
            opt += ' ';
          }
          _results.push("  " + opt + "  " + comment);
        }
        return _results;
      }();
      return this.help.replace('[[OPTIONS]]', strs.join("\n"));
    };

    Getopt.prototype.showHelp = function () {
      console.info(this.getHelp());
      return this;
    };

    Getopt.prototype.bindHelp = function (help) {
      if (help) {
        this.setHelp(help);
      }
      this.on('help', function () {
        this.showHelp();
        return process.exit(0);
      });
      return this;
    };

    Getopt.prototype.getVersion = function () {
      return Getopt.VERSION;
    };

    Getopt.prototype.error = function (errorFunc) {
      this.errorFunc = errorFunc;
      return this;
    };

    Getopt.getVersion = function () {
      return this.VERSION;
    };

    Getopt.create = function (options) {
      return new Getopt(options);
    };

    return Getopt;
  }();

  module.exports = Getopt;
}).call(undefined);

},{}],162:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":163}],163:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
}(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
(typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined);

},{}],164:[function(require,module,exports){
module.exports={
  "name": "jl-sql",
  "version": "1.2.1",
  "bin": "./bin/jl-sql",
  "keywords": [
    "sql",
    "stream",
    "cli"
  ],
  "author": "avz@nologin.ru",
  "contributors": [],
  "dependencies": {
    "jl-sql-api": "^2.6.1",
    "node-getopt": "0.2.3",
    "semver": "^5.3.0"
  },
  "devDependencies": {
    "babel-cli": "^6.22.2",
    "babel-plugin-transform-builtin-extend": "^1.1.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-preset-es2015": "^6.22.0",
    "babelify": "^7.3.0",
    "browserify": "^14.0.0",
    "eslint": "^3.10.2",
    "eslint-plugin-mocha": "^4.7.0"
  },
  "scripts": {
    "test": "eslint . && sh ./test/all.sh",
    "build": "browserify --node -o transpiled/main-node4-transpilled.js -t [ babelify --global ] src/main-node4.js"
  },
  "engines": {
    "node": ">=4"
  }
}

},{}],165:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events');
var Getopt = require('node-getopt/lib/getopt.js');
var CliError = require('./CliError');

var Options = require('./Options');
var Runner = require('./Runner');

var Cli = function (_EventEmitter) {
	_inherits(Cli, _EventEmitter);

	function Cli(argv, stdin, stdout, stderr) {
		_classCallCheck(this, Cli);

		var _this = _possibleConstructorReturn(this, (Cli.__proto__ || Object.getPrototypeOf(Cli)).call(this));

		_this.argv = argv;
		_this.stdin = stdin;
		_this.stdout = stdout;
		_this.stderr = stderr;

		_this.getopt = new Getopt([['h', 'help', 'show this help'], ['I', 'ignore-json-error', 'ignore broken JSON'], ['v', 'verbose', 'display additional information'], ['S', 'sort-external-buffer-size=SIZE', 'use SIZE bytes for `sort` memory buffer'], ['B', 'sort-in-memory-buffer-length=ROWS', 'save up to ROWS rows for in-memory sort'], ['T', 'temporary-directory=DIR', 'use DIR for temporaries, not $TMPDIR or /tmp'], ['b', 'bind=BIND=VALUE+', 'bind valiable'], ['', 'version', 'show version information']]);

		_this.getopt.setHelp('Usage: jl-sql [OPTIONS] SQL\n' + 'OPTIONS:\n' + '[[OPTIONS]]\n' + '\n' + 'Version: ' + _this.versionString() + '\n\n' + 'See full documentation at https://github.com/avz/jl-sql\n');

		_this.getopt.error(_this.onArgumentError.bind(_this));
		return _this;
	}

	_createClass(Cli, [{
		key: 'parseOptions',
		value: function parseOptions() {
			var getopt = this.getopt.parse(this.argv.slice(1));

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

			var options = new Options(getopt.argv[0]);

			if (getopt.options['ignore-json-error']) {
				options.ignoreJsonErrors = true;
			}

			if (getopt.options.verbose) {
				options.verbose = true;
			}

			if (getopt.options['temporary-directory']) {
				options.tmpDir = getopt.options['temporary-directory'];
			}

			options.sortOptions = {};

			if (getopt.options['sort-external-buffer-size']) {
				options.sortOptions.bufferSize = parseInt(getopt.options['sort-external-buffer-size']);
			}

			if (getopt.options['sort-in-memory-buffer-length']) {
				options.sortOptions.inMemoryBufferSize = parseInt(getopt.options['sort-in-memory-buffer-length']);
			} else {
				options.sortOptions.inMemoryBufferSize = 10000;
			}

			if (getopt.options.bind) {
				options.binds = this.parseBinds(getopt.options.bind);
			}

			return options;
		}
	}, {
		key: 'parseBinds',
		value: function parseBinds(binds) {
			var map = {};

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = binds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var def = _step.value;

					var m = def.match(/^(::?)(.*?)=(.*)$/);

					if (!m) {
						this.throwArgumentError('wrong bind definition: ' + def);
					}

					var name = m[2];
					var value = m[3];
					var isArray = m[1] === '::';

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
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return map;
		}
	}, {
		key: 'run',
		value: function run() {
			var _this2 = this;

			var options = this.parseOptions();

			var runner = new Runner(options);

			runner.on('error', function (err) {
				_this2.emit('error', err);
			});

			runner.on('warning', function (warn) {
				_this2.emit('warning', warn);
			});

			runner.run(this.stdin, this.stdout, this.stderr);
		}
	}, {
		key: 'throwUsage',
		value: function throwUsage() {
			var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 255;

			this.throwArgumentError(null);
		}
	}, {
		key: 'versionString',
		value: function versionString() {
			var myVersion = require('../package').version;
			var apiVersion = require('jl-sql-api').version || 'X.X.X';

			return 'jl-sql v' + myVersion + ' (jl-sql-api v' + apiVersion + ')';
		}
	}, {
		key: 'throwVersion',
		value: function throwVersion() {
			throw new CliError(this.versionString() + '\n', 0);
		}
	}, {
		key: 'getUsage',
		value: function getUsage() {
			return this.getopt.getHelp();
		}
	}, {
		key: 'throwArgumentError',
		value: function throwArgumentError() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			var m = '';

			if (message !== null) {
				m += 'ERROR: ' + message + '\n\n';
			}

			m += this.getUsage();

			throw new CliError(m, 255);
		}
	}, {
		key: 'throwRuntimeError',
		value: function throwRuntimeError(message) {
			throw new CliError(message, 1);
		}
	}, {
		key: 'onArgumentError',
		value: function onArgumentError(err) {
			this.throwArgumentError(err.message);
		}
	}]);

	return Cli;
}(EventEmitter);

module.exports = Cli;

},{"../package":164,"./CliError":166,"./Options":168,"./Runner":169,"events":undefined,"jl-sql-api":2,"node-getopt/lib/getopt.js":161}],166:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

var CliError = function (_extendableBuiltin2) {
	_inherits(CliError, _extendableBuiltin2);

	function CliError(message) {
		var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 254;

		_classCallCheck(this, CliError);

		var _this = _possibleConstructorReturn(this, (CliError.__proto__ || Object.getPrototypeOf(CliError)).call(this, message));

		_this.code = code;
		return _this;
	}

	return CliError;
}(_extendableBuiltin(Error));

module.exports = CliError;

},{}],167:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');
var fs = require('fs');
var DataSourceResolver = require('jl-sql-api').DataSourceResolver;

var DataSourceFileResolver = function (_DataSourceResolver) {
	_inherits(DataSourceFileResolver, _DataSourceResolver);

	function DataSourceFileResolver() {
		_classCallCheck(this, DataSourceFileResolver);

		return _possibleConstructorReturn(this, (DataSourceFileResolver.__proto__ || Object.getPrototypeOf(DataSourceFileResolver)).apply(this, arguments));
	}

	_createClass(DataSourceFileResolver, [{
		key: 'resolve',
		value: function resolve(location) {
			if (location.length !== 1) {
				return null;
			}

			return fs.createReadStream(location[0]);
		}
	}, {
		key: 'extractAlias',
		value: function extractAlias(location) {
			if (location.length !== 1) {
				return null;
			}

			return path.parse(location[0]).name;
		}
	}]);

	return DataSourceFileResolver;
}(DataSourceResolver);

module.exports = DataSourceFileResolver;

},{"fs":undefined,"jl-sql-api":2,"path":undefined}],168:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Options = function Options(sql) {
	_classCallCheck(this, Options);

	this.ignoreJsonErrors = false;
	this.verbose = false;
	this.sql = sql;
};

module.exports = Options;

},{}],169:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('util');
var JlSqlApi = require('jl-sql-api');
var EventEmitter = require('events');
var DataSourceFileResolver = require('./DataSourceFileResolver');

var Runner = function (_EventEmitter) {
	_inherits(Runner, _EventEmitter);

	function Runner(options) {
		_classCallCheck(this, Runner);

		var _this = _possibleConstructorReturn(this, (Runner.__proto__ || Object.getPrototypeOf(Runner)).call(this));

		_this.binds = options.binds || {};

		var combinedOptions = JSON.parse(JSON.stringify(options));

		delete combinedOptions.binds;

		combinedOptions.dataSourceResolvers = [new DataSourceFileResolver()];
		if (!combinedOptions.sortOptions) {
			combinedOptions.sortOptions = {};
		}

		_this.options = combinedOptions;

		_this.api = new JlSqlApi({
			sortOptions: combinedOptions.sortOptions,
			tmpDir: combinedOptions.tmpDir,
			dataSourceResolvers: combinedOptions.dataSourceResolvers
		});
		return _this;
	}

	_createClass(Runner, [{
		key: 'run',
		value: function run(stdin, stdout, stderr) {
			var _this2 = this;

			try {
				var query = this.api.query(this.options.sql);

				for (var bindName in this.binds) {
					var bindValue = this.binds[bindName];

					if (bindValue instanceof Array) {
						query.bind('::' + bindName, bindValue);
					} else {
						query.bind(':' + bindName, bindValue);
					}
				}

				var select = void 0;

				/* eslint-disable newline-after-var */
				if (query.select.ast.table) {
					// quore has FROM statement

					select = query.fromEmptyStream().toJsonStream(stdout);
				} else {
					select = query.fromJsonStream(stdin).toJsonStream(stdout);
				}
				/* eslint-enable newline-after-var */

				if (this.options.verbose) {
					var explain = this.api.explain(select);

					stderr.write(util.inspect(explain, { depth: 20 }) + '\n');
				}

				select.on('error', function (err) {
					_this2._errorHandler(err);
				});
			} catch (err) {
				this._errorHandler(err);
			}
		}
	}, {
		key: '_errorHandler',
		value: function _errorHandler(err) {
			if (this.options.ignoreJsonErrors && err instanceof JlSqlApi.exceptions.JsonParsingError) {
				this.emit('warning', new Error(err.message + ': JSON.parse(' + JSON.stringify(err.json) + ')'));

				return;
			}

			this.emit('error', err);
		}
	}]);

	return Runner;
}(EventEmitter);

module.exports = Runner;

},{"./DataSourceFileResolver":167,"events":undefined,"jl-sql-api":2,"util":undefined}],170:[function(require,module,exports){
'use strict';

if (!Buffer.from) {
	Buffer.from = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return new (Function.prototype.bind.apply(Buffer, [null].concat(args)))();
	};
}

if (!Buffer.alloc) {
	Buffer.alloc = function (size) {
		return new Buffer(size);
	};
}

require('./main.js');

},{"./main.js":171}],171:[function(require,module,exports){
'use strict';

/* eslint-disable no-process-exit */

var util = require('util');
var Cli = require('./Cli');
var CliError = require('./CliError');
var cli = new Cli(process.argv.slice(1), process.stdin, process.stdout, process.stderr);

cli.on('error', function (err) {
	var message = err.message || err.stack;

	process.stderr.write(err.name + ': ' + message + '\n');
	process.exit(1);
});

cli.on('warning', function (err) {
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

},{"./Cli":165,"./CliError":166,"util":undefined}]},{},[170]);
