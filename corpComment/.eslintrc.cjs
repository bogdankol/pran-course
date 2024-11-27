module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "prettier", "react"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ], 
    "prettier/prettier": [
      "error",
      {
        "htmlWhitespaceSensitivity": "ignore",
        "endOfLine": "auto",
        "semi": false
      }
    ],
    "react/jsx-tag-spacing": [
      "error",
      {
        "beforeSelfClosing": "always"
      }
    ],
    "linebreak-style": "off",
    "react/react-in-jsx-scope": "off",
    "semi": false
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
