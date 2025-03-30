import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  const version = process.env.npm_package_version;

  let hash = process.env.GITHUB_SHA;
  if (hash) {
    hash = hash.substring(0, 7);
  } else {
    hash = "dev";
  }

  return {
    define: {
      __VERSION__: JSON.stringify(`${version} (${hash})`),
    },
    plugins: [tsconfigPaths()],
  };
});
