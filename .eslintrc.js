module.exports = {
	"env": {
		"es6": true,
		"node": true,
		"mocha": true
	},
	"extends": "eslint:recommended",
	"plugins": [
		"mocha"
	],
	"rules": {
		"mocha/no-exclusive-tests": "error",
		"accessor-pairs": "error",
		"array-bracket-spacing": [
			"error",
			"never"
		],
		"array-callback-return": "error",
		"arrow-body-style": "off",
		"arrow-parens": "off",
		"arrow-spacing": [
			"error",
			{
				"after": true,
				"before": true
			}
		],
		"block-scoped-var": "error",
		"block-spacing": ["error", "always"],
		"brace-style": "off",
		"callback-return": "off",
		"camelcase": "off",
		"class-methods-use-this": "off",
		"comma-dangle": "off",
		"comma-spacing": ["error", {"before": false, "after": true}],
		"comma-style": [
			"error",
			"last"
		],
		"complexity": "off",
		"computed-property-spacing": [
			"error",
			"never"
		],
		"consistent-return": "error",
		"consistent-this": ["error", "self"],
		"curly": "error",
		"default-case": "error",
		"dot-location": [
			"error",
			"property"
		],
		"dot-notation": "off",
		"eol-last": ["error", "always"],
		"eqeqeq": ["error", "always"],
		"func-call-spacing": "error",
		"func-name-matching": "off",
		"func-names": "off",
		"func-style": "off",
		"generator-star-spacing": "error",
		"global-require": "off",
		"guard-for-in": "off",
		"handle-callback-err": "error",
		"id-blacklist": "error",
		"id-length": "off",
		"id-match": "error",
		"indent": ["error", "tab", {"SwitchCase": 1}],
		"init-declarations": "off",
		"jsx-quotes": "error",
		"key-spacing": ["error", {"beforeColon": false, "afterColon": true}],
		"keyword-spacing": ["error", {"before": true, "after": true}],
		"line-comment-position": "off",
		"linebreak-style": [
			"error",
			"unix"
		],
		"lines-around-comment": "off",
		"lines-around-directive": "error",
		"max-depth": "error",
		"max-len": "off",
		"max-lines": "off",
		"max-nested-callbacks": "error",
		"max-params": "off",
		"max-statements": "off",
		"max-statements-per-line": "off",
		"multiline-ternary": "off",
		"new-parens": "off",
		"newline-after-var": ["error", "always"],
		"newline-before-return": "error",
		"newline-per-chained-call": "off",
		"no-alert": "error",
		"no-array-constructor": "error",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-catch-shadow": "error",
		"no-cond-assign": [
			"error",
			"except-parens"
		],
		"no-confusing-arrow": "error",
		"no-constant-condition": [
			"error",
			{
				"checkLoops": false
			}
		],
		"no-continue": "off",
		"no-div-regex": "error",
		"no-duplicate-imports": "error",
		"no-else-return": "off",
		"no-empty-function": "off",
		"no-eq-null": "error",
		"no-eval": "error",
		"no-extend-native": "error",
		"no-extra-bind": "error",
		"no-extra-label": "error",
		"no-extra-parens": "off",
		"no-floating-decimal": "error",
		"no-implicit-globals": "error",
		"no-implied-eval": "error",
		"no-inline-comments": "off",
		"no-invalid-this": "error",
		"no-iterator": "error",
		"no-label-var": "error",
		"no-labels": "error",
		"no-lone-blocks": "error",
		"no-lonely-if": "error",
		"no-loop-func": "off",
		"no-magic-numbers": "off",
		"no-mixed-operators": "error",
		"no-mixed-requires": "error",
		"no-multi-spaces": "error",
		"no-multi-str": "error",
		"no-multiple-empty-lines": "error",
		"no-native-reassign": "error",
		"no-negated-condition": "off",
		"no-negated-in-lhs": "error",
		"no-nested-ternary": "error",
		"no-new": "error",
		"no-new-func": "off",
		"no-new-object": "error",
		"no-new-require": "error",
		"no-new-wrappers": "error",
		"no-octal-escape": "error",
		"no-param-reassign": "error",
		"no-path-concat": "error",
		"no-plusplus": "off",
		"no-process-env": "error",
		"no-process-exit": "error",
		"no-proto": "error",
		"no-prototype-builtins": "off",
		"no-restricted-globals": "error",
		"no-restricted-imports": "error",
		"no-restricted-modules": "error",
		"no-restricted-properties": "error",
		"no-restricted-syntax": "error",
		"no-return-assign": "error",
		"no-return-await": "error",
		"no-script-url": "error",
		"no-self-compare": "error",
		"no-sequences": "error",
		"no-shadow": "off",
		"no-shadow-restricted-names": "error",
		"no-spaced-func": "error",
		"no-sync": "off",
		"no-tabs": "off",
		"no-template-curly-in-string": "error",
		"no-ternary": "off",
		"no-throw-literal": "error",
		"no-trailing-spaces": "error",
		"no-undef-init": "error",
		"no-undefined": "off",
		"no-underscore-dangle": "off",
		"no-unmodified-loop-condition": "error",
		"no-unneeded-ternary": "error",
		"no-unused-expressions": "error",
		"no-use-before-define": "error",
		"no-useless-call": "off",
		"no-useless-computed-key": "error",
		"no-useless-concat": "error",
		"no-useless-constructor": "off",
		"no-useless-escape": "error",
		"no-useless-rename": "error",
		"no-useless-return": "error",
		"no-var": "off",
		"no-void": "error",
		"no-warning-comments": "off",
		"no-whitespace-before-property": "error",
		"no-with": "error",
		"no-unused-vars": ["error", {"vars": "all", "args": "none"}],
		"object-curly-newline": "off",
		"object-curly-spacing": "off",
		"object-property-newline": [
			"error",
			{
				"allowMultiplePropertiesPerLine": true
			}
		],
		"object-shorthand": "off",
		"one-var": ["error", "never"],
		"one-var-declaration-per-line": "off",
		"operator-assignment": "off",
		"operator-linebreak": "off",
		"padded-blocks": "off",
		"prefer-arrow-callback": "off",
		"prefer-const": "error",
		"prefer-numeric-literals": "error",
		"prefer-reflect": "off",
		"prefer-rest-params": "error",
		"prefer-spread": "error",
		"prefer-template": "off",
		"quote-props": "off",
		"radix": ["error", "always"],
		"require-jsdoc": [
			"error",
			{
				"require": {
					"FunctionDeclaration": true,
					"MethodDefinition": true,
					"ArrowFunctionExpression": true
				}
			}
		],
		"rest-spread-spacing": [
			"error",
			"never"
		],
		"semi": ["error", "always"],
		"semi-spacing": "off",
		"sort-imports": "error",
		"sort-keys": "off",
		"sort-vars": "off",
		"space-before-blocks": "error",
		"space-before-function-paren": "off",
		"space-in-parens": [
			"error",
			"never"
		],
		"space-infix-ops": "error",
		"space-unary-ops": [
			"error",
			{
				"nonwords": false,
				"words": false
			}
		],
		"spaced-comment": "off",
		"strict": ["error", "global"],
		"symbol-description": "error",
		"template-curly-spacing": "error",
		"unicode-bom": [
			"error",
			"never"
		],
		"valid-jsdoc": [
			"error",
			{
				"requireReturnDescription": false,
				"requireParamDescription": false
			}
		],
		"vars-on-top": "off",
		"wrap-regex": "error",
		"yield-star-spacing": "error",
		"yoda": [
			"error",
			"never"
		]
	}
};
