module.exports = {
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single",
      { "avoidEscape": true }
    ],
    "semi": [
      "error",
      "always"
    ]
  },
  "overrides": [
    {
      "files": ["src/**/*.spec.js"],
      "env": {
        "mocha": true
      }
    }
  ]
};
