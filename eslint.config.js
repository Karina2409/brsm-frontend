// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import prettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  // Игнорируем папки
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "*.js"],
  },

  // Базовые + TypeScript
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // Prettier в конце (важно!)
  prettier,

  // Angular TypeScript файлы
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@angular-eslint": angular,
    },
    rules: {
      ...angular.configs.recommended.rules,

      // Твои кастомные правила для селекторов
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],

      // Твои дополнительные правила
      "no-console": "error",
      "prefer-const": "error",
      "class-methods-use-this": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit", overrides: { constructors: "off" } },
      ],
      "@typescript-eslint/member-ordering": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },

  {
    files: ["**/*.html"],
    plugins: {
      "@angular-eslint/template": angularTemplate,
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
      ...angularTemplate.configs.accessibility.rules,
    },
  }
);
