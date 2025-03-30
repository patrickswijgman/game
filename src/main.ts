import { updateAttackAnimation } from "@/anims/attack.js";
import { updateBreathAnimation } from "@/anims/breath.js";
import { updateCombatTextAnimation } from "@/anims/combat-text.js";
import { updateItemIdleAnimation, updateItemPickupAnimation } from "@/anims/item.js";
import { updateStaggerAnimation } from "@/anims/stagger.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { updateWindAnimation } from "@/anims/wind.js";
import { loadAssets } from "@/core/assets.js";
import { clearDestroyedEntities, getDestroyedEntities, getEntities, getEntity, removeEntity, sortEntities } from "@/core/entities.js";
import { AnimationId, destroyIfDead, destroyIfExpired, renderEntity, renderEntityStatus, Type, updateAnimation, updateCollisions, updatePhysics, zeroEntity } from "@/core/entity.js";
import { renderHud } from "@/core/ui.js";
import { defeat, getBodies, getEnemiesGroup, getPlayer, getWorldState, removeFromWorld, renderDefeat, renderLevelUp, renderTimeSurvived, setupWorld, updateEnemySpawner, updateTimeSurvived, WorldStateId } from "@/core/world.js";
import { onAttackDestroy, updateAttack } from "@/entities/attack.js";
import { onEnemyDestroy, updateEnemy } from "@/entities/enemy.js";
import { updatePlayer } from "@/entities/player.js";
import { renderUpgrade, updateUpgrade } from "@/entities/upgrade.js";
import { updateExperienceOrb } from "@/entities/xp-orb.js";
import { applyCameraTransform, drawRectInstance, drawText, getFramePerSecond, getHeight, getWidth, InputCode, isInputPressed, isRectangleValid, resetTransform, run, scaleTransform, setAlpha, translateTransform, updateCamera } from "ridder";

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

    const player = getPlayer();
    const isAlive = player.isPlayer && player.stats.health;

    if (!isAlive) {
      defeat();
    }

    const state = getWorldState();

    switch (state) {
      case WorldStateId.NORMAL:
        updateTimeSurvived();
        updateEnemySpawner();
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
              case Type.ATTACK:
                updateAttack(e);
                break;
              case Type.XP_ORB:
                updateExperienceOrb(e);
                break;
            }

            updatePhysics(e);
            updateCollisions(e);

            switch (updateAnimation(e)) {
              case AnimationId.ATTACK:
                updateAttackAnimation(e);
                break;
              case AnimationId.STAGGER:
                updateStaggerAnimation(e);
                break;
              case AnimationId.BREATH:
                updateBreathAnimation(e);
                break;
              case AnimationId.WALK:
                updateWalkAnimation(e);
                break;
              case AnimationId.WIND:
                updateWindAnimation(e);
                break;
              case AnimationId.ITEM_IDLE:
                updateItemIdleAnimation(e);
                break;
              case AnimationId.ITEM_PICKUP:
                updateItemPickupAnimation(e);
                break;
              case AnimationId.COMBAT_TEXT:
                updateCombatTextAnimation(e);
                break;
            }
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

    if (isAlive) {
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

    switch (state) {
      case WorldStateId.NORMAL:
        {
          for (const id of getEnemiesGroup()) {
            const e = getEntity(id);
            renderEntityStatus(e);
          }
          renderTimeSurvived();
          renderHud();
        }
        break;

      case WorldStateId.CHOOSE_UPGRADE:
        renderTimeSurvived();
        renderHud();
        renderLevelUp();
        break;

      case WorldStateId.DEFEAT:
        renderDefeat();
        break;
    }

    if (isDebugging) {
      debugHitboxes();
      debugBodies();
      resetTransform();
      scaleTransform(0.5, 0.5);
      debugFps();
      translateTransform(0, 11);
    }

    drawVersion();
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

function drawVersion() {
  resetTransform();
  translateTransform(getWidth() - 2, getHeight() - 2);
  scaleTransform(0.5, 0.5);
  setAlpha(0.3);
  drawText(__VERSION__, 0, 0, "white", "right", "bottom");
  setAlpha(1);
}
