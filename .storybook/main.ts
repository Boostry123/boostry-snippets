import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../snippets/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs"],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      optimizeDeps: { include: ["react"] },
    });
  },
};

export default config;
