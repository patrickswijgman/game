import { loadAssets } from "assets.js";
import { COLOR_HEALTH, COLOR_MANA, COLOR_STAMINA, HEIGHT, WIDTH } from "consts.js";
import { renderDebugInfo } from "debug.js";
import { updateMeleeAttack } from "entities/actions/melee-attack.js";
import { updatePlayer } from "entities/player.js";
import { renderEntity, renderShadow, updateHitbox, updatePhysics } from "entity.js";
import { getCurrentScene, switchScene, transitionToNextScene } from "game.js";
import { InputCode, isInputPressed, resetTransform, run, setAlpha, setBackgroundColor, setCameraSmoothing, setFont, updateCamera } from "ridder";
import { cleanupDestroyedEntities, destroyEntity, getEntity, getPlayer, sortEntitiesOnDepth } from "scene.js";
import { loadMainScene } from "scenes/main.js";
import { drawBar } from "ui/bar.js";

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
      updateHitbox(e);
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

    const player = getPlayer(scene);
    if (player) {
      resetTransform();
      drawBar(10, 10, player.stats.health, player.stats.healthMax, COLOR_HEALTH, player.stats.healthMax, 10);
      drawBar(10, 25, player.stats.stamina, player.stats.staminaMax, COLOR_STAMINA, player.stats.staminaMax, 10);
      drawBar(10, 40, player.stats.mana, player.stats.manaMax, COLOR_MANA, player.stats.manaMax, 10);
    }

    renderDebugInfo(scene);
  },
});
