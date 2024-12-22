import { loadAssets } from "assets.js";
import { HEIGHT, WIDTH } from "consts.js";
import { renderDebugInfo } from "debug.js";
import { addPlayerStateMachine } from "entities/player.js";
import { renderEntity, updateEntityPhysics, updateEntityStateMachine } from "entity.js";
import { getCurrentScene, switchScene } from "game.js";
import { InputCode, isInputPressed, run, setBackgroundColor, setCameraBounds, setCameraSmoothing, setFont, updateCamera } from "ridder";
import { cleanupDestroyedEntities, getEntity, getPlayer, sortEntitiesOnDepth } from "scene.js";
import { addMainScene } from "scenes/main.js";

run({
  width: WIDTH,
  height: HEIGHT,

  setup: async () => {
    await loadAssets();

    addPlayerStateMachine();

    addMainScene();

    setFont("default");
    setBackgroundColor("steelblue");
    setCameraSmoothing(0.05);

    switchScene("main");
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
      return;
    }

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
