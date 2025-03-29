import { execSync } from "child_process";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(`${process.env.npm_package_version} (${commitHash})`),
  },
  plugins: [tsconfigPaths()],
});
