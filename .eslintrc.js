module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    '.nuxt/.eslint.globals.cjs'
  ],
  rules: {
    'keyword-spacing': ['error', { 'before': true }],
    'block-spacing': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-infix-ops': 'error',
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'import/namespace': 'off',
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'curly': ['error'],
    'space-before-function-paren': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'no-undef': ['error', { 'typeof': true }],
    'no-unused-vars': 'off',
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'import/no-named-as-default-member': 'off',
    'import/default': 'off',
    'no-console': 0,
    'prefer-const': ['error', { 'destructuring': 'all' }],
    'no-return-await': 0,
    'no-unused-expressions': 0,
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': ['error', { 'max': 2 }],
    'no-new': 0,
    'no-prototype-builtins': 0,
    'handle-callback-err': 0,
    'valid-typeof': 0,
    'dot-notation': 0,
    'quote-props': ['error', 'consistent'],

    // vue
    'vue/max-attributes-per-line': ['error', { 'singleline': { 'max': 1 }, 'multiline': { 'max': 1 } }],
    'vue/multiline-html-element-content-newline': ['error', { 'ignoreWhenEmpty': true, 'allowEmptyLines': false }],
    'vue/script-indent': ['error', 2, { 'baseIndent': 1, 'switchCase': 0, 'ignores': [] }],
    'vue/html-indent': ['error', 2, { 'attribute': 1, 'baseIndent': 1, 'closeBracket': 0, 'alignAttributesVertically': true, 'ignores': [] }],
    'vue/html-self-closing': ['error', { 'html': { 'void': 'never', 'normal': 'always', 'component': 'always' }, 'svg': 'always', 'math': 'always' }],
    'vue/html-closing-bracket-spacing': ['error', { 'selfClosingTag': 'always' }],
    'vue/html-closing-bracket-newline': ['error', { 'singleline': 'never', 'multiline': 'always', 'selfClosingTag': { 'singleline': 'never', 'multiline': 'always' } }],
    'vue/first-attribute-linebreak': ['error', { 'singleline': 'ignore', 'multiline': 'below' }],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/valid-v-for': 'off',
    'vue/no-mutating-props': 'off',
    'vue/require-prop-types': 0,
    'vue/require-default-prop': 0,
    'vue/no-v-html': 0,
    'vue/no-multiple-template-root': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/attributes-order': ['error', {
      'order': [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        ['UNIQUE', 'SLOT'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT'
      ],
      'alphabetical': false
    }],

    // nuxt
    'nuxt/no-cjs-in-config': 'off',

    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error', { 'before': false, 'after': true, 'overrides': { 'arrow': { 'before': true, 'after': true } } }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/comma-spacing': ['error', { 'before': false, 'after': true }]
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ],

  globals: {
    defineNitroPlugin: 'readonly'
  }
}
