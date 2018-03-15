module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    curly: 2,
    "dot-notation": 0,
    eqeqeq: 2,
    "guard-for-in": 0,
    indent: [
      'error',
      2, {
        SwitchCase: 1,
        CallExpression: {
          arguments: 1
        },
        FunctionExpression: {
          body: 1,
          parameters: 2
        }
      }
    ],
    "linebreak-style": 0,
    "new-cap": [
      2, {
        capIsNewExceptions: ['Ember.A']
      }
    ],
    "no-alert": 1,
    "no-caller": 2,
    "no-cond-assign": [
      2,
      "except-parens"
    ],
    "no-constant-condition": [
      2, {
        checkLoops: false
      }
    ],
    "no-console": [
      'error',
      {
        allow: ['error', 'info', 'warn']
      }
    ],
    "no-debugger": 0,
    "no-duplicate-case": 1,
    "no-dupe-keys": 1,
    "no-empty": 1,
    "no-eq-null": 2,
    "no-eval": 2,
    "no-lone-blocks": 1,
    "no-multi-spaces": 1,
    "no-new": 0,
    "no-plusplus": 0,
    "no-template-curly-in-string": 1,
    "no-undef": 2,
    "no-unexpected-multiline": 1,
    "no-unreachable": 1,
    "no-unused-vars": 2,
    semi: 2,
    strict: 0,
    "valid-typeof": 1,
    "wrap-iife": 0
  },
  overrides: [
    // node files
    {
      files: [
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
