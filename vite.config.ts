import childProcess from "node:child_process";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

export default defineConfig({
  base: "./",
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [watchAssets()],
});

function watchAssets(): Plugin {
  return {
    name: "watch-assets",

    configureServer(server) {
      const assetsPath = path.resolve("assets");

      server.watcher.add(assetsPath);

      server.watcher.on("change", (filePath) => {
        if (filePath.startsWith(assetsPath)) {
          childProcess.execSync("npm run gen", { stdio: "inherit" });
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}
