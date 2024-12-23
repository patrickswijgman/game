import { loadAssets } from "assets.js";
import { HEIGHT, WIDTH } from "consts.js";
import { renderEntity, renderShadow, updatePhysics, updateState } from "data/entity.js";
import { getCurrentScene, switchScene } from "data/game.js";
import { cleanupDestroyedEntities, getEntity, getPlayer, sortEntitiesOnDepth } from "data/scene.js";
import { renderDebugInfo } from "debug.js";
import { loadLongswordItem } from "items/longsword.js";
import { InputCode, isInputPressed, run, setAlpha, setBackgroundColor, setCameraBounds, setCameraSmoothing, setFont, updateCamera } from "ridder";
import { loadMainScene } from "scenes/main.js";
import { loadPlayerStates } from "states/player.js";
import { loadStunnedState } from "states/stunned.js";

run({
  width: WIDTH,
  height: HEIGHT,

  setup: async () => {
    // ASSETS
    await loadAssets();

    // STATES
    loadStunnedState();
    loadPlayerStates();

    // ITEMS
    loadLongswordItem();

    // SCENES
    loadMainScene();

    // RENDER
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
      updateState(e, scene);
      updatePhysics(e);
    }

    const player = getPlayer(scene);

    if (player) {
      updateCamera(player.pos.x, player.pos.y);
    }
  },

  render: () => {
    const scene = getCurrentScene();

    sortEntitiesOnDepth(scene);

    setAlpha(0.4);
    for (const id of scene.visible) {
      const e = getEntity(scene, id);
      renderShadow(e);
    }
    setAlpha(1);

    for (const id of scene.visible) {
      const e = getEntity(scene, id);
      renderEntity(e);
    }

    renderDebugInfo(scene);
  },
});
