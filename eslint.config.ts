import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,    
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "no-console": "warn",
      "no-debugger": "warn",
      "no-var": "error",
      "prefer-const": "warn",
      "no-empty-function": "off",
    }
  },
);