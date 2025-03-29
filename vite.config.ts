import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(`${process.env.npm_package_version} (${process.env.GITHUB_SHA ?? "dev"})`),
  },
  plugins: [tsconfigPaths()],
});
