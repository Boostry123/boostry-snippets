import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["snippets/**/*.test.{ts,tsx}"],
    environment: "node",
    passWithNoTests: true,
  },
});
