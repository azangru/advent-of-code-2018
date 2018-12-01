module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
  },
  "env": {
    "node": true,
    "es6": true,
    "jest/globals": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-console": 0,
    "semi": 1,
    "eqeqeq": 1,
    "object-curly-spacing": [1, "always"],
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used" }],
    "jest/no-focused-tests": "warn",
    "jest/no-identical-title": "error",
    "jest/valid-expect": "error"
  },
  "plugins": [
    "jest"
  ]
};
