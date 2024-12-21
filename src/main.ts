import { loadAssets } from "assets.js";
import { renderDebugInfo } from "debug.js";
import { renderEntity, updateEntityPhysics, updateEntityState } from "entity.js";
import { getCurrentScene, switchScene } from "game.js";
import { getPlayerStateMachine, newPlayer } from "player.js";
import { run } from "ridder";
import { cleanupDestroyedEntities, sortEntitiesOnDepth, getEntity, newScene } from "scene.js";
import { addStateMachine } from "state-machine.js";
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

    addStateMachine(Type.PLAYER, getPlayerStateMachine());

    switchScene("main");
  },

  update: () => {
    const scene = getCurrentScene();

    cleanupDestroyedEntities(scene);

    for (const id of scene.active) {
      const e = getEntity(scene, id);
      updateEntityState(e, scene);
      updateEntityPhysics(e);
    }
  },

  render: () => {
    const scene = getCurrentScene();

    sortEntitiesOnDepth(scene);

    for (const id of scene.visible) {
      const e = getEntity(scene, id);

      switch (e.type) {
        default:
          renderEntity(e);
          break;
      }
    }

    renderDebugInfo(scene);
  },
});
