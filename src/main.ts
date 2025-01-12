import { loadAssets } from "assets.js";
import { HEIGHT, WIDTH } from "consts.js";
import { renderDebugInfo } from "debug.js";
import { drawEnemyStatus } from "enemy.js";
import { updateArrow } from "entities/actions/arrow.js";
import { updateBite } from "entities/actions/bite.js";
import { updateMeleeAttack } from "entities/actions/melee-attack.js";
import { updateRangedAttack } from "entities/actions/ranged-attack.js";
import { updateCombatText } from "entities/combat/text.js";
import { updateQuickMeleeEnemy } from "entities/enemies/melee-quick.js";
import { updateMeleeEnemy } from "entities/enemies/melee.js";
import { updateRangedEnemy } from "entities/enemies/ranged.js";
import { updatePlayer } from "entities/player.js";
import { updateTree } from "entities/tree.js";
import { clickBuildTab, renderBuildTab } from "entities/ui/build-tab.js";
import { updateExperienceOrb } from "entities/xp-orb.js";
import { renderEntity, renderEntityTransform, renderShadow, updateAvoidance, updateCenter, updateCollisions, updateConditions, updateFlash, updateHitbox, updateHovered, updatePhysics } from "entity.js";
import { getCurrentScene, switchScene, transitionToNextScene } from "game.js";
import { drawTexture, InputCode, isInputPressed, resetTransform, run, setAlpha, tickTimer, updateCamera } from "ridder";
import { cleanupDestroyedEntities, destroyEntity, getEntity, getPlayer, sortEntitiesOnDepth } from "scene.js";
import { renderBuildScene, updateBuildScene } from "scenes/build.js";
import { updateCombatScene } from "scenes/combat.js";
import { newMenuScene, renderMenuScene, updateMenuScene } from "scenes/menu.js";
import { drawStatus } from "ui/status.js";

let isDebugging = false;

run({
  width: WIDTH,
  height: HEIGHT,

  setup: async () => {
    await loadAssets();

    const scene = newMenuScene();

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

    for (const id of scene.update) {
      const e = getEntity(scene, id);

      if (e.sheet.stats.healthMax && e.sheet.stats.health === 0) {
        destroyEntity(scene, e);
        continue;
      }

      if (e.lifetime && tickTimer(e.lifeTimer, e.lifetime)) {
        destroyEntity(scene, e);
        continue;
      }

      updateHovered(e);

      if (e.isHovered && isInputPressed(InputCode.MOUSE_LEFT, true)) {
        switch (e.type) {
          case "build_tab":
            clickBuildTab(e, scene);
            break;
        }
      }

      updateConditions(e);

      switch (e.type) {
        case "player":
          updatePlayer(e, scene);
          break;
        case "enemy_melee":
          updateMeleeEnemy(e, scene);
          break;
        case "enemy_melee_quick":
          updateQuickMeleeEnemy(e, scene);
          break;
        case "enemy_ranged":
          updateRangedEnemy(e, scene);
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
        case "melee_attack":
          updateMeleeAttack(e, scene);
          break;
        case "ranged_attack":
          updateRangedAttack(e, scene);
          break;
        case "arrow":
          updateArrow(e, scene);
          break;
        case "bite":
          updateBite(e, scene);
          break;
      }

      updateAvoidance(e, scene);
      updatePhysics(e);
      updateCollisions(e, scene);
      updateHitbox(e);
      updateCenter(e);
      updateFlash(e);

      if (e.isPlayer) {
        updateCamera(scene.camera, e.position.x, e.position.y);
      }
    }

    switch (scene.type) {
      case "menu":
        updateMenuScene(scene);
        break;
      case "build":
        updateBuildScene(scene);
        break;
      case "combat":
        updateCombatScene(scene);
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
      case "menu":
        renderMenuScene(scene);
        break;
      case "build":
        renderBuildScene(scene);
        break;
    }

    sortEntitiesOnDepth(scene);

    setAlpha(0.4);
    for (const id of scene.render) {
      const e = getEntity(scene, id);
      renderShadow(e, scene);
    }
    setAlpha(1);

    for (const id of scene.render) {
      const e = getEntity(scene, id);

      if (e.isVisible) {
        renderEntityTransform(e, scene);

        switch (e.type) {
          case "build_tab":
            renderBuildTab(e, scene);
            break;
        }

        renderEntity(e, scene);

        if (e.isEnemy && e.sheet.stats.health < e.sheet.stats.healthMax) {
          drawEnemyStatus(e, scene);
        }
      }
    }

    const player = getPlayer(scene);
    if (player) {
      drawStatus(player);
    }

    if (isDebugging) {
      renderDebugInfo(scene);
    }
  },
});
