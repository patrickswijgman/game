import { loadAssets } from "assets.js";
import { HEIGHT, WIDTH } from "consts.js";
import { renderDebugInfo } from "debug.js";
import { updateMeleeAttack } from "entities/melee-attack.js";
import { updatePlayer } from "entities/player.js";
import { renderEntity, renderShadow, updatePhysics } from "entity.js";
import { getCurrentScene, switchScene, transitionToNextScene } from "game.js";
import { InputCode, isInputPressed, run, setAlpha, setBackgroundColor, setCameraSmoothing, setFont, updateCamera } from "ridder";
import { cleanupDestroyedEntities, destroyEntity, getEntity, getPlayer, sortEntitiesOnDepth } from "scene.js";
import { loadMainScene } from "scenes/main.js";

run({
  width: WIDTH,
  height: HEIGHT,

  setup: async () => {
    await loadAssets();

    loadMainScene();

    setFont("default");
    setBackgroundColor("slategray");
    setCameraSmoothing(0.05);

    switchScene("main");
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }

    transitionToNextScene();

    const scene = getCurrentScene();

    cleanupDestroyedEntities(scene);

    for (const id of scene.active) {
      const e = getEntity(scene, id);

      if (e.stats.health <= 0) {
        destroyEntity(scene, e);
        return;
      }

      switch (e.type) {
        case "player":
          updatePlayer(e, scene);
          break;
        case "melee_attack":
          updateMeleeAttack(e, scene);
          break;
      }

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
