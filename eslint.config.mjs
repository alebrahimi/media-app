import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
// ✅ Import plugins using ESM import
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
   baseDirectory: __dirname,
});

const eslintConfig = [
   ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
   {
      plugins: {
         prettier: prettierPlugin,
      },
      rules: {
         'prettier/prettier': 'error',

         'import/extensions': 'off',
         'react/react-in-jsx-scope': 'off',
         'react/jsx-filename-extension': 'off',
         'no-underscore-dangle': 'off',
         'react/jsx-props-no-spreading': 'off',
         'no-use-before-define': 'off',
         'no-shadow': 'off',
         'no-unused-vars': [
            'error',
            {
               argsIgnorePattern: '^_',
            },
         ],
         'react/require-default-props': 'off',
         'import/prefer-default-export': 'off',
         'react/function-component-definition': 'off',
         'no-restricted-exports': 'off',
         'react/no-unstable-nested-components': 'off',
         'arrow-body-style': 'off',
         'prefer-arrow-callback': 'off',
         'no-async-promise-executor': 'off',
         'no-restricted-syntax': 'off',
         'no-await-in-loop': 'off',
         'no-plusplus': 'off',
         'one-var-declaration-per-line': 0,
         'new-cap': 0,
         'consistent-return': 0,
         'no-param-reassign': 0,
         'no-console': 1,
         indent: 'off',
         'comma-dangle': 0,
         'object-curly-newline': 'off',
         curly: ['error', 'multi-line'],
         'no-unused-expressions': 'warn',
         'import/no-named-as-default': 'warn',
         'import/no-dynamic-require': 0,
         'no-multiple-empty-lines': [
            'error',
            {
               max: 2,
               maxEOF: 1,
            },
         ],
         'eol-last': 1,
         'arrow-parens': 'off',
         'import/no-unresolved': [
            2,
            {
               commonjs: true,
            },
         ],
      },
   },
];

export default eslintConfig;
