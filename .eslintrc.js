module.exports = {
	plugins: ["prettier"],
	extends: [
		"eslint:recommended",
		'plugin:react/recommended',
		"plugin:node/recommended",
		"plugin:prettier/recommended",
		"prettier"
	],
	rules: {
		'no-undef': 'off',
		'array-callback-return': 'off',
		'import/no-unresolved': 'off',
		'jsx-a11y/anchor-is-valid': 0,
		'no-shadow': 'off',
		'no-nested-ternary': 'off',
		"node/no-unsupported-features/es-syntax": "off",
		"prettier/prettier": "error",
		"node/no-missing-import": ["error", {
			"allowModules": [],
			"tryExtensions": [".js", ".json", ".node", ".jsx"]
		}]
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		sourceType: "module",
		requireConfigFile: false,
		babelOptions: {
			presets: ['@babel/preset-react'],
		},
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx'],
			},
		},
		"react": {
			"version": "detect"
		}
	},
};
