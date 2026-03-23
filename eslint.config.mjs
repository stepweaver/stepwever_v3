import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "CallExpression[callee.object.name='document'][callee.property.name='querySelector'][arguments.0.value=/footer/i]",
          message:
            "Avoid document.querySelector('footer') for layout; use route-group layouts instead.",
        },
      ],
    },
  },
];

export default eslintConfig;
