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
      "no-duplicate-imports": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.object.name='document'][callee.property.name='querySelector'][arguments.0.value=/footer/i]",
          message:
            "Avoid document.querySelector('footer') for layout; use route-group layouts instead.",
        },
        {
          selector:
            "CallExpression[callee.object.name='document'][callee.property.name='querySelectorAll'][arguments.0.value=/footer/i]",
          message:
            "Avoid document.querySelectorAll('footer') for layout; use route-group layouts instead.",
        },
        {
          selector:
            "AssignmentExpression[left.object.property.name='style'][left.property.name='display'][right.value='none']",
          message:
            "Avoid imperative display toggles for layout chrome; use route-group layouts instead.",
        },
      ],
    },
  },
  {
    files: ["app/api/**/route.js"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          paths: [
            {
              name: "@/lib/requestOrigin",
              message:
                "Prefer shared trust-boundary entry points (withProtectedRoute/buildProtectedOptionsResponse) over direct route-level origin checks unless documented.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
