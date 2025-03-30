import { updateAttackAnimation } from "@/anims/attack.js";
import { updateBreathAnimation } from "@/anims/breath.js";
import { updateCombatTextAnimation } from "@/anims/combat-text.js";
import { updateItemIdleAnimation, updateItemPickupAnimation } from "@/anims/item.js";
import { updateStaggerAnimation } from "@/anims/stagger.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { updateWindAnimation } from "@/anims/wind.js";
import { COLOR_GRASS } from "@/consts.js";
import { loadAssets } from "@/core/assets.js";
import { AnimationId, destroyIfDead, destroyIfExpired, InteractionId, renderEntity, renderEntityStatus, Type, updateAnimation, updateCollisions, updateInteraction, updatePhysics, zeroEntity } from "@/core/entity.js";
import { addBody, addUpgradeToPool, clearDestroyedEntities, confirmUpgradeChoice, defeat, GameStateId, getBodies, getDestroyedEntities, getEntities, getEntity, getPlayer, getWidgets, isGameState, isInInnerBounds, isPlayerAlive, removeEntity, setBounds, setGameState, sortEntities, transitionGameState, updateEnemySpawner, updateTime } from "@/core/game.js";
import { UpgradeId } from "@/core/upgrades.js";
import { onAttackDestroy, updateAttack } from "@/entities/attack.js";
import { onEnemyDestroy, updateEnemy } from "@/entities/enemy.js";
import { addPlayer, updatePlayer } from "@/entities/player.js";
import { addTree } from "@/entities/tree.js";
import { updateExperienceOrb } from "@/entities/xp-orb.js";
import { renderBackdropWidget } from "@/widgets/backdrop.js";
import { renderDefeatWidget } from "@/widgets/defeat.js";
import { addHealthWidget, renderHealthWidget } from "@/widgets/health.js";
import { addTimeWidget, updateTimeWidget } from "@/widgets/time.js";
import { renderUpgradeWidget } from "@/widgets/upgrade.js";
import { applyCameraTransform, drawRectInstance, drawText, getFramePerSecond, getHeight, getWidth, InputCode, isInputPressed, isRectangleValid, random, rect, resetTransform, run, scaleTransform, setAlpha, setBackgroundColor, setCameraBounds, setCameraPosition, setCameraSmoothing, translateTransform, updateCamera } from "ridder";

let isDebugging = false;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();
    const w = 400;
    const h = 300;

    setBounds(w, h);
    setBackgroundColor(COLOR_GRASS);
    setCameraSmoothing(0.1);
    setCameraBounds(0, 0, w, h);
    setCameraPosition(w / 2, h / 2);

    addBody(rect(0, 0, w, 40));
    addBody(rect(0, 0, 40, h));
    addBody(rect(w - 40, 0, 40, h));
    addBody(rect(0, h - 40, w, 40));

    addUpgradeToPool(UpgradeId.HEALTH, 2);
    addUpgradeToPool(UpgradeId.DAMAGE, 4);
    addUpgradeToPool(UpgradeId.RANGE, 2);
    addUpgradeToPool(UpgradeId.CRIT_CHANCE, 3);
    addUpgradeToPool(UpgradeId.PICKUP_RANGE, 2);
    addUpgradeToPool(UpgradeId.MOVEMENT_SPEED, 2);

    addPlayer(w / 2, h / 2);

    for (let i = -4; i <= w; i += 12) {
      for (let j = -4; j <= h; j += 12) {
        const x = i + random(4, 8);
        const y = j + random(4, 8);
        if (!isInInnerBounds(x, y)) {
          addTree(x, y);
        }
      }
    }

    addHealthWidget(10, 10);
    addTimeWidget(getWidth() - 10, 10);

    setGameState(GameStateId.NORMAL);
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }
    if (isInputPressed(InputCode.KEY_H)) {
      isDebugging = !isDebugging;
    }

    transitionGameState();

    if (!isPlayerAlive()) {
      defeat();
    }

    if (isGameState(GameStateId.NORMAL)) {
      updateTime();
      updateEnemySpawner();
    }

    sortEntities(sortEntitiesOnDepth);

    for (const id of getEntities()) {
      const e = getEntity(id);

      if (isGameState(GameStateId.NORMAL)) {
        if (destroyIfExpired(e) || destroyIfDead(e)) {
          continue;
        }

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

      resetTransform();
      applyCameraTransform();
      renderEntity(e);

      if (e.isEnemy) {
        renderEntityStatus(e);
      }
    }

    for (const id of getWidgets()) {
      const e = getEntity(id);

      switch (updateInteraction(e, false)) {
        case InteractionId.CONFIRM_UPGRADE:
          confirmUpgradeChoice(e.upgradeId);
          break;
      }

      switch (e.type) {
        case Type.UI_TIME:
          updateTimeWidget(e);
          break;
      }

      resetTransform();
      renderEntity(e);

      switch (e.type) {
        case Type.UI_BACKDROP:
          renderBackdropWidget();
          break;
        case Type.UI_HEALTH:
          renderHealthWidget();
          break;
        case Type.UI_UPGRADE:
          renderUpgradeWidget(e);
          break;
        case Type.UI_DEFEAT:
          renderDefeatWidget();
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
      zeroEntity(e);
    }

    clearDestroyedEntities();

    if (isDebugging) {
      debugHitboxes();
      debugBodies();
      resetTransform();
      scaleTransform(0.5, 0.5);
      debugFps();
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
