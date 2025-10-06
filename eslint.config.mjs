import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      "packages/frontend/.next/**",
      "packages/frontend/out/**",
      "packages/frontend/build/**",
      "packages/frontend/next-env.d.ts",
    ],
  },
];

const config = defineConfig(
  eslintConfig,
);

export default config;
