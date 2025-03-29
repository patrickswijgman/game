import { loadAssets } from "@/core/assets.js";
import { clearDestroyedEntities, getDestroyedEntities, getEntities, getEntity, removeEntity, sortEntities } from "@/core/entities.js";
import { destroyIfDead, destroyIfExpired, renderEntity, renderEntityStatus, Type, updateCollisions, updatePhysics, zeroEntity } from "@/core/entity.js";
import { renderHud } from "@/core/ui.js";
import { getBodies, getEnemiesGroup, getPlayer, getWorldState, isPlayerAlive, removeFromWorld, setupWorld, spawnEnemies, WorldStateId } from "@/core/world.js";
import { onAttackDestroy, updateAttack } from "@/entities/attack.js";
import { updateCombatText } from "@/entities/combat-text.js";
import { onEnemyDestroy, updateEnemy } from "@/entities/enemy.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { renderUpgrade, updateUpgrade } from "@/entities/upgrade.js";
import { updateExperienceOrb } from "@/entities/xp-orb.js";
import { applyCameraTransform, drawRectInstance, drawText, getFramePerSecond, InputCode, isInputPressed, isRectangleValid, resetTransform, run, scaleTransform, translateTransform, updateCamera } from "ridder";

let isDebugging = false;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();
    setupWorld();
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }
    if (isInputPressed(InputCode.KEY_H)) {
      isDebugging = !isDebugging;
    }

    const state = getWorldState();

    switch (state) {
      case WorldStateId.NORMAL:
        spawnEnemies();
        break;
    }

    sortEntities(sortEntitiesOnDepth);

    for (const id of getEntities()) {
      const e = getEntity(id);

      if (destroyIfExpired(e) || destroyIfDead(e)) {
        continue;
      }

      switch (state) {
        case WorldStateId.NORMAL:
          {
            switch (e.type) {
              case Type.PLAYER:
                updatePlayer(e);
                break;
              case Type.ENEMY:
                updateEnemy(e);
                break;
              case Type.TREE:
                updateTree(e);
                break;
              case Type.ATTACK:
                updateAttack(e);
                break;
              case Type.XP_ORB:
                updateExperienceOrb(e);
                break;
              case Type.COMBAT_TEXT:
                updateCombatText(e);
                break;
            }

            updatePhysics(e);
            updateCollisions(e);
          }
          break;

        case WorldStateId.CHOOSE_UPGRADE:
          {
            switch (e.type) {
              case Type.UI_UPGRADE:
                updateUpgrade(e);
                break;
            }
          }
          break;
      }

      renderEntity(e);

      switch (e.type) {
        case Type.UI_UPGRADE:
          renderUpgrade(e);
          break;
      }
    }

    if (isPlayerAlive()) {
      const player = getPlayer();
      updateCamera(player.position.x, player.position.y);
    }

    for (const id of getDestroyedEntities()) {
      const e = getEntity(id);
      if (e.isEnemy) {
        onEnemyDestroy(e);
      }
      if (e.isAttack) {
        onAttackDestroy(e);
      }
      removeEntity(id);
      removeFromWorld(id);
      zeroEntity(e);
    }

    clearDestroyedEntities();

    for (const id of getEnemiesGroup()) {
      const e = getEntity(id);
      renderEntityStatus(e);
    }

    renderHud();

    if (isDebugging) {
      debugHitboxes();
      debugBodies();
      resetTransform();
      scaleTransform(0.5, 0.5);
      debugFps();
      translateTransform(0, 11);
    }
  },
});

function sortEntitiesOnDepth(idA: number, idB: number): number {
  const a = getEntity(idA);
  const b = getEntity(idB);
  return a.position.y + a.depth - b.position.y + b.depth;
}

function debugHitboxes() {
  resetTransform();
  applyCameraTransform();
  for (const id of getEntities()) {
    const e = getEntity(id);
    if (isRectangleValid(e.hitbox)) {
      drawRectInstance(e.hitbox, "yellow", false);
    }
  }
}

function debugBodies() {
  resetTransform();
  applyCameraTransform();
  for (const body of getBodies()) {
    if (isRectangleValid(body)) {
      drawRectInstance(body, "red", false);
    }
  }
}

function debugFps() {
  drawText(`FPS: ${getFramePerSecond()}`, 1, 1, "lime");
}
