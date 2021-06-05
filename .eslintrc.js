module.exports = {
	'env': {
		'browser': true,
		'commonjs': false,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': { 'jsx': true },
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'array-bracket-newline': [
			'error',
			'consistent'
		],
		'array-bracket-spacing': [
			'error',
			'never'
		],
		'array-element-newline': [
			'error',
			'always'
		],
		'arrow-body-style': [
			'error',
			'as-needed'
		],
		'arrow-parens': [
			'error',
			'as-needed'
		],
		'block-spacing': [
			'error',
			'always'
		],
		'brace-style': [
			'error',
			'1tbs'
		],
		'comma-dangle': [
			'error',
			'never'
		],
		'comma-spacing': [
			'error',
			{
				'after': true,
				'before': false
			}
		],
		'comma-style': [
			'error',
			'last'
		],
		'computed-property-spacing': [
			'error',
			'never'
		],
		'curly': [
			'error',
			'multi-line', // 'multi'
			'consistent'
		],
		'default-case-last': [
			'error'
		],
		'dot-location': [
			'error',
			'property'
		],
		'dot-notation': [
			'error'
		],
		'eqeqeq': [
			'error'
		],
		'func-call-spacing': [
			'error',
			'never'
		],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'off',
			'windows'
		],
		'max-depth': [
			'warn',
			{ 'max': 5 }
		],
		'max-len': [
			'warn',
			{
				'code': 150,
				'ignoreRegExpLiterals': true,
				'ignoreStrings': true,
				'ignoreTemplateLiterals': true,
				'ignoreTrailingComments': true,
				'ignoreUrls': true
			}
		],
		'max-lines': [
			'warn'
		],
		'max-statements-per-line': [
			'error'
		],
		'multiline-comment-style': 'off',
		'no-return-assign': [
			'error'
		],
		'no-template-curly-in-string': [
			'warn'
		],
		'no-trailing-spaces': [
			'error'
		],
		'no-underscore-dangle': [
			'error'
		],
		'no-unneeded-ternary': [
			'error'
		],
		'no-var': [
			'error'
		],
		'no-whitespace-before-property': [
			'error'
		],
		'object-curly-newline': [
			'error',
			{
				'minProperties': 2,
				'multiline': true
			}
		],
		'object-curly-spacing': [
			'error',
			'always'
		],
		'object-property-newline': [
			'error'
		],
		'operator-linebreak': [
			'error'
		],
		'prefer-arrow-callback': [
			'error'
		],
		'prefer-const': [
			'error',
			{
				'destructuring': 'all',
				'ignoreReadBeforeAssign': false
			}
		],
		'quotes': [
			'error',
			'single'
		],
		'react/react-in-jsx-scope': 'off',
		'rest-spread-spacing': [
			'error',
			'never'
		],
		'semi': [
			'error',
			'always'
		],
		'sort-keys': [
			'error',
			'asc',
			{ 'natural': true }
		],
		'space-in-parens': [
			'error',
			'never'
		],
		'spaced-comment': [
			'error',
			'always'
		]
	}
};