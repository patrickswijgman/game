import { loadAssets } from "assets.js";
import { COLOR_HEALTH, COLOR_MANA, COLOR_STAMINA, HEIGHT, WIDTH } from "consts.js";
import { renderDebugInfo } from "debug.js";
import { updateMeleeAttack } from "entities/actions/melee-attack.js";
import { updateCombatText } from "entities/combat/text.js";
import { updateMapRoom } from "entities/map/room.js";
import { updatePlayer } from "entities/player.js";
import { renderEntity, renderShadow, updateAvoidance, updateFlash, updateHitbox, updatePhysics } from "entity.js";
import { getCurrentScene, switchScene, transitionToNextScene } from "game.js";
import { applyCameraTransform, drawTexture, InputCode, isInputPressed, resetTransform, run, scaleTransform, setAlpha, setFont, tickTimer, translateTransform, updateCamera } from "ridder";
import { cleanupDestroyedEntities, destroyEntity, getEntity, getPlayer, sortEntitiesOnDepth } from "scene.js";
import { newMapScene, renderMapScene } from "scenes/map.js";
import { updateCombatRoomScene } from "scenes/rooms/combat.js";
import { drawBar } from "ui/bar.js";

let isDebugging = false;

run({
  width: WIDTH,
  height: HEIGHT,

  setup: async () => {
    await loadAssets();

    setFont("default");

    const scene = newMapScene();

    switchScene(scene.id);
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }

    if (isInputPressed(InputCode.KEY_H)) {
      isDebugging = !isDebugging;
    }

    if (isInputPressed(InputCode.KEY_M)) {
      switchScene("map");
    }

    transitionToNextScene();

    const scene = getCurrentScene();

    cleanupDestroyedEntities(scene);

    for (const id of scene.active) {
      const e = getEntity(scene, id);

      if (e.stats.health === 0) {
        destroyEntity(scene, e);
        continue;
      }

      if (e.lifetime && tickTimer(e.lifeTimer, e.lifetime)) {
        destroyEntity(scene, e);
        continue;
      }

      switch (e.type) {
        case "player":
          updatePlayer(e, scene);
          break;
        case "melee_attack":
          updateMeleeAttack(e, scene);
          break;
        case "combat_text":
          updateCombatText(e);
          break;
        case "map_room":
          updateMapRoom(e);
          break;
      }

      updateAvoidance(e, scene);
      updatePhysics(e);
      updateHitbox(e);
      updateFlash(e);

      if (e.isPlayer) {
        updateCamera(scene.camera, e.pos.x, e.pos.y);
      }
    }

    switch (scene.type) {
      case "room_combat":
        updateCombatRoomScene(scene);
        break;
    }
  },

  render: () => {
    const scene = getCurrentScene();

    if (scene.backgroundTextureId) {
      resetTransform();
      drawTexture(scene.backgroundTextureId, 0, 0);
    }

    switch (scene.type) {
      case "map":
        renderMapScene(scene);
        break;
    }

    sortEntitiesOnDepth(scene);

    setAlpha(0.4);
    for (const id of scene.visible) {
      const e = getEntity(scene, id);
      renderShadow(e, scene);
    }
    setAlpha(1);

    for (const id of scene.visible) {
      const e = getEntity(scene, id);
      renderEntity(e, scene);

      if (e.isEnemy && e.stats.health < e.stats.healthMax) {
        resetTransform();
        applyCameraTransform(scene.camera);
        translateTransform(e.pos.x, e.pos.y - e.height - 10);
        scaleTransform(0.5, 0.5);
        drawBar(-15, 0, e.stats.health, e.stats.healthMax, COLOR_HEALTH, 30, 8);
      }
    }

    const player = getPlayer(scene);
    if (player) {
      resetTransform();
      drawBar(10, 10, player.stats.health, player.stats.healthMax, COLOR_HEALTH, player.stats.healthMax, 10);
      drawBar(10, 25, player.stats.stamina, player.stats.staminaMax, COLOR_STAMINA, player.stats.staminaMax, 10);
      drawBar(10, 40, player.stats.mana, player.stats.manaMax, COLOR_MANA, player.stats.manaMax, 10);
    }

    if (isDebugging) {
      renderDebugInfo(scene);
    }
  },
});
