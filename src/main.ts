import { updateAttackAnimation } from "@/anims/attack.js";
import { updateBreathAnimation } from "@/anims/breath.js";
import { updateCombatTextAnimation } from "@/anims/combat-text.js";
import { updateItemIdleAnimation, updateItemPickupAnimation } from "@/anims/item.js";
import { updateStaggerAnimation } from "@/anims/stagger.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { updateWindAnimation } from "@/anims/wind.js";
import { COLOR_GRASS } from "@/consts.js";
import { loadAssets } from "@/core/assets.js";
import { AnimationId, applyEntityTransform, destroyIfDead, destroyIfExpired, drawEnemyStatus, InteractionId, Type, updateAnimation, updateCollisions, updateInteraction, updatePhysics, zeroEntity } from "@/core/entity.js";
import { addBody, addUpgradeToPool, clearDestroyedEntities, confirmUpgradeChoice, defeat, GameStateId, getDestroyedEntities, getEntity, getObjectsGroup, getPlayer, getWidgetsGroup, isInInnerBounds, isPlayerAlive, removeEntity, setBounds, setGameState, sortObjectsGroup, transitionGameState, updateEnemySpawner, updateTime } from "@/core/game.js";
import { UpgradeId } from "@/core/upgrades.js";
import { onAttackDestroy, renderAttack, updateAttack } from "@/entities/attack.js";
import { renderCombatText } from "@/entities/combat-text.js";
import { renderMeleeEnemy } from "@/entities/enemy-melee.js";
import { onEnemyDestroy, updateEnemy } from "@/entities/enemy.js";
import { addPlayer, renderPlayer, updatePlayer } from "@/entities/player.js";
import { addTree, renderTree } from "@/entities/tree.js";
import { renderExperienceOrb, updateExperienceOrb } from "@/entities/xp-orb.js";
import { renderBackdropWidget } from "@/widgets/backdrop.js";
import { renderDefeatWidget } from "@/widgets/defeat.js";
import { addFpsWidget, renderFpsWidget } from "@/widgets/fps.js";
import { addHealthWidget, renderHealthWidget } from "@/widgets/health.js";
import { renderLevelupWidget } from "@/widgets/levelup.js";
import { addTimeWidget, renderTimeWidget } from "@/widgets/time.js";
import { renderUpgradeWidget } from "@/widgets/upgrade.js";
import { addVersionWidget, renderVersionWidget } from "@/widgets/version.js";
import { addExperienceWidget, renderExperienceWidget } from "@/widgets/xp.js";
import { applyCameraTransform, getHeight, getWidth, InputCode, isInputPressed, random, rect, resetTransform, run, setBackgroundColor, setCameraBounds, setCameraPosition, setCameraSmoothing, updateCamera } from "ridder";

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

    // TODO move position to widget
    addHealthWidget(10, 10);
    addExperienceWidget(0, 0);
    addTimeWidget(getWidth() - 10, 10);
    addFpsWidget(2, 2);
    addVersionWidget(getWidth() - 2, getHeight() - 2);

    setGameState(GameStateId.NORMAL);
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }

    const state = transitionGameState();

    if (state === GameStateId.NORMAL) {
      if (isPlayerAlive()) {
        updateTime();
        updateEnemySpawner();
      } else {
        defeat();
      }
    }

    sortObjectsGroup(sortEntitiesOnDepth);

    for (const id of getObjectsGroup()) {
      const e = getEntity(id);

      if (state === GameStateId.NORMAL) {
        if (destroyIfExpired(e) || destroyIfDead(e)) {
          continue;
        }

        switch (e.type) {
          case Type.PLAYER:
            updatePlayer(e);
            break;
          case Type.ENEMY_MELEE:
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
      applyEntityTransform(e);

      switch (e.type) {
        case Type.PLAYER:
          renderPlayer(e);
          break;
        case Type.ENEMY_MELEE:
          renderMeleeEnemy(e);
          break;
        case Type.TREE:
          renderTree(e);
          break;
        case Type.ATTACK:
          renderAttack(e);
          break;
        case Type.XP_ORB:
          renderExperienceOrb(e);
          break;
        case Type.COMBAT_TEXT:
          renderCombatText(e);
          break;
      }

      if (e.isEnemy) {
        drawEnemyStatus(e);
      }
    }

    for (const id of getWidgetsGroup()) {
      const e = getEntity(id);

      switch (updateInteraction(e, false)) {
        case InteractionId.CONFIRM_UPGRADE:
          confirmUpgradeChoice(e.upgradeId);
          break;
      }

      resetTransform();
      applyEntityTransform(e);

      switch (e.type) {
        case Type.WIDGET_BACKDROP:
          renderBackdropWidget();
          break;
        case Type.WIDGET_HEALTH:
          renderHealthWidget();
          break;
        case Type.WIDGET_XP:
          renderExperienceWidget();
          break;
        case Type.WIDGET_UPGRADE:
          renderUpgradeWidget(e);
          break;
        case Type.WIDGET_LEVEL_UP:
          renderLevelupWidget();
          break;
        case Type.WIDGET_DEFEAT:
          renderDefeatWidget();
          break;
        case Type.WIDGET_TIME:
          renderTimeWidget();
          break;
        case Type.WIDGET_FPS:
          renderFpsWidget();
          break;
        case Type.WIDGET_DEBUG:
          renderDefeatWidget();
          break;
        case Type.WIDGET_VERSION:
          renderVersionWidget();
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
  },
});

function sortEntitiesOnDepth(idA: number, idB: number): number {
  const a = getEntity(idA);
  const b = getEntity(idB);
  return a.position.y + a.depth - b.position.y + b.depth;
}
