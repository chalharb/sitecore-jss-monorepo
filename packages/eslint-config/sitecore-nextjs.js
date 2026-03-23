import { globalIgnores } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import yml from "eslint-plugin-yml";
import { nextJsConfig } from "./next.js";

/**
 * A custom ESLint configuration for Sitecore Next.js applications.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const sitecoreNextJsConfig = [
  ...nextJsConfig,
  prettierPlugin,
  ...yml.configs["flat/recommended"],
  globalIgnores([".generated/**/*", "**/*.d.ts", "**/*.js"]),
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "@next/next/no-img-element": "off",
      "jsx-a11y/alt-text": ["warn", { elements: ["img"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { caughtErrorsIgnorePattern: "." },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "jsx-quotes": ["error", "prefer-double"],
    },
  },
];
