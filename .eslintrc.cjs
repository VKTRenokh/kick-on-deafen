module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'dist',
    'commitlint.config.mjs',
    'rollup.config.js',
    'jest.config.ts',
    'tests/*',
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type':
      'off',
    '@typescript-eslint/explicit-module-boundary-types':
      'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'off',
          methods: 'explicit',
          parameterProperties: 'explicit',
          properties: 'explicit',
        },
      },
    ],
    'max-len': [
      'error',
      {
        code: 60,
        ignoreComments: true,
        tabWidth: 2,
      },
    ],
    'max-lines-per-function': ['error', 50],
    'no-param-reassign': 1,
    'no-plusplus': 0,
    'no-unused-vars': 0,
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['!', '?', ' //', 'todo', '*'],
      },
    ],
    'block-spacing': ['warn', 'always'],
  },
}
