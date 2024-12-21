import { loadAssets } from "assets.js";
import { renderDebugInfo } from "debug.js";
import { renderEntity, updateEntity } from "entity.js";
import { getCurrentScene, switchScene } from "game.js";
import { newPlayer, updatePlayer } from "player.js";
import { run } from "ridder";
import { cleanupDestroyedEntities, depthSortEntities, getEntity, newScene } from "scene.js";
import { Type } from "type.js";

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    newScene((scene) => {
      newPlayer(scene);
      return "main";
    });

    switchScene("main");
  },

  update: () => {
    const scene = getCurrentScene();

    cleanupDestroyedEntities(scene);

    for (const id of scene.active) {
      const e = getEntity(scene, id);

      switch (e.type) {
        case Type.PLAYER:
          updatePlayer(scene, e);
          break;
      }

      updateEntity(e);
    }
  },

  render: () => {
    const scene = getCurrentScene();

    depthSortEntities(scene);

    for (const id of scene.visible) {
      const e = getEntity(scene, id);

      switch (e.type) {
        default:
          renderEntity(e);
          break;
      }
    }

    renderDebugInfo();
  },
});
