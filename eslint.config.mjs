import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended", "prettier"), {
    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "no-console": "off",
        "no-unused-vars": "warn",
        semi: ["warn", "always"],
        "prefer-const": ["error"]
    },
    ignores: ["node_modules", ".husky", "public", ".editorconfig", ".prettier.json"]
}];