module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 9,
    },
    extends: [
        'standard',
    ],
    // add your custom rules here
    rules: {
        'no-console': 'off',
        'indent': 'off',
        'indent-legacy': [ 'error', 4 ],
        'semi': [ 'error', 'always' ],
        'comma-dangle': [ 'error', 'always-multiline' ],
        'space-before-function-paren': [ 'error', 'never' ],
        'space-in-parens': [ 'error', 'always' ],
        'no-multi-spaces': [
            'error', {
                exceptions: {
                    'VariableDeclarator': true,
                    'ImportDeclaration': true,
                },
            },
        ],
        'eol-last': 'off',
        'no-multiple-empty-lines': [ 'error', { 'max': 2, 'maxEOF': 1, 'maxBOF': 0 } ],
        'curly': [ 'error', 'multi-line' ],
        'template-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [
            'error',
            'always',
            { 'objectsInArrays': true, 'arraysInArrays': true },
        ],
    },
};
