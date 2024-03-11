module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "lib"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "testing-library"],
  overrides: [ { 
    files: ["./src/**/*.test.tsx"],
    extends: ["plugin:testing-library/react"],
    rules: {
      "testing-library/prefer-implicit-assert": "error",
      "testing-library/prefer-presence-queries": "error",
      "testing-library/prefer-user-event": "error"
    }
  }],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
