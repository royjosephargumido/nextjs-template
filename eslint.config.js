import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import reactCompiler from "eslint-plugin-react-compiler";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  eslint.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    ignores: ["**/**/node_modules", "**/**/.next", "**/**/public", "components/ui", "env.js"],
  },
  {
    plugins: {
      "unused-imports": unusedImports,
      "react-compiler": reactCompiler,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },

    rules: {
      "react-compiler/react-compiler": "error",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  },
);
