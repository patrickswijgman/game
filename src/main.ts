import { loadAssets } from "assets.js";
import { renderDebugInfo } from "debug.js";
import { renderEntity, updateEntityPhysics, updateEntityStateMachine } from "entity.js";
import { getCurrentScene, switchScene } from "game.js";
import { getPlayerStateMachine } from "player.js";
import { run, setCameraBounds, setCameraSmoothing, updateCamera } from "ridder";
import { cleanupDestroyedEntities, getEntity, getPlayer, sortEntitiesOnDepth } from "scene.js";
import { addMainScene } from "scenes/main.js";
import { addStateMachine } from "states.js";
import { Type } from "type.js";

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    addStateMachine(Type.PLAYER, getPlayerStateMachine());

    addMainScene();

    setCameraSmoothing(0.05);

    switchScene("main");
  },

  update: () => {
    const scene = getCurrentScene();

    setCameraBounds(scene.bounds);

    cleanupDestroyedEntities(scene);

    for (const id of scene.active) {
      const e = getEntity(scene, id);
      updateEntityStateMachine(e, scene);
      updateEntityPhysics(e);
    }

    const player = getPlayer(scene);

    if (player) {
      updateCamera(player.pos.x, player.pos.y);
    }
  },

  render: () => {
    const scene = getCurrentScene();

    sortEntitiesOnDepth(scene);

    for (const id of scene.visible) {
      const e = getEntity(scene, id);
      renderEntity(e);
    }

    renderDebugInfo(scene);
  },
});
