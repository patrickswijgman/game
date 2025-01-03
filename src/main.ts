import { loadAssets } from "assets.js";
import { COLOR_HEALTH, COLOR_STAMINA, COLOR_STUN, HEIGHT, WIDTH } from "consts.js";
import { renderDebugInfo } from "debug.js";
import { updateMeleeAttack } from "entities/actions/melee-attack.js";
import { updateBonfire } from "entities/bonfire.js";
import { updateCombatText } from "entities/combat/text.js";
import { updateMeleeEnemy } from "entities/enemies/melee.js";
import { updatePlayer } from "entities/player.js";
import { updatePortal } from "entities/portal.js";
import { updateTree } from "entities/tree.js";
import { updateExperienceOrb } from "entities/xp-orb.js";
import { renderEntity, renderShadow, updateAvoidance, updateCenter, updateConditions, updateFlash, updateHitbox, updatePhysics } from "entity.js";
import { getCurrentScene, switchScene, transitionToNextScene } from "game.js";
import { updatePortalParticle } from "particles/portal.js";
import { applyCameraTransform, drawTexture, InputCode, isInputPressed, resetTransform, run, scaleTransform, setAlpha, setFont, tickTimer, translateTransform, updateCamera } from "ridder";
import { cleanupDestroyedEntities, destroyEntity, getEntity, getPlayer, sortEntitiesOnDepth } from "scene.js";
import { updateCombatRoomScene } from "scenes/rooms/combat.js";
import { newStartRoomScene } from "scenes/rooms/start.js";
import { drawBar } from "ui/bar.js";
import { drawExperience } from "ui/experience.js";

let isDebugging = false;

run({
  width: WIDTH,
  height: HEIGHT,

  setup: async () => {
    await loadAssets();

    setFont("default");

    const scene = newStartRoomScene();

    switchScene(scene.id);
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }

    if (isInputPressed(InputCode.KEY_H)) {
      isDebugging = !isDebugging;
    }

    transitionToNextScene();

    const scene = getCurrentScene();

    cleanupDestroyedEntities(scene);

    for (const id of scene.active) {
      const e = getEntity(scene, id);

      if (e.stats.healthMax && e.stats.health === 0) {
        destroyEntity(scene, e);
        continue;
      }

      if (e.lifetime && tickTimer(e.lifeTimer, e.lifetime)) {
        destroyEntity(scene, e);
        continue;
      }

      updateConditions(e);

      switch (e.type) {
        case "player":
          updatePlayer(e, scene);
          break;
        case "melee_attack":
          updateMeleeAttack(e, scene);
          break;
        case "enemy_melee":
          updateMeleeEnemy(e, scene);
          break;
        case "experience_orb":
          updateExperienceOrb(e, scene);
          break;
        case "combat_text":
          updateCombatText(e);
          break;
        case "tree":
          updateTree(e);
          break;
        case "portal":
          updatePortal(e, scene);
          break;
        case "bonfire":
          updateBonfire(e, scene);
          break;
        case "particle_portal":
          updatePortalParticle(e, scene);
          break;
      }

      updateAvoidance(e, scene);
      updatePhysics(e);
      updateHitbox(e);
      updateCenter(e);
      updateFlash(e);

      if (e.isPlayer) {
        updateCamera(scene.camera, e.position.x, e.position.y);
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
        translateTransform(e.position.x, e.position.y - e.height - 10);
        scaleTransform(0.5, 0.5);
        drawBar(-15, 0, e.stats.health, e.stats.healthMax, COLOR_HEALTH, 30, 8);
        drawBar(-15, 8, e.stats.stun, e.stats.stunMax, COLOR_STUN, 30, 6);
      }
    }

    const player = getPlayer(scene);
    if (player) {
      resetTransform();
      drawBar(10, 10, player.stats.health, player.stats.healthMax, COLOR_HEALTH, player.stats.healthMax, 10);
      drawBar(10, 25, player.stats.stamina, player.stats.staminaMax, COLOR_STAMINA, player.stats.staminaMax, 10);
      drawBar(10, 40, player.stats.stun, player.stats.stunMax, COLOR_STUN, player.stats.stunMax, 5);
      translateTransform(10, 50);
      drawExperience();
    }

    if (isDebugging) {
      renderDebugInfo(scene);
    }
  },
});
