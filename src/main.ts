import { Type } from "@/consts/entity.js";
import { clearDestroyedEntities, getDestroyedEntities, getEntities, getEntity, removeEntity, sortEntities } from "@/core/entities.js";
import { getEnemiesGroup, getPlayer, removeFromWorld, setupWorld, spawnEnemies } from "@/core/world.js";
import { zeroEntity } from "@/data/entity.js";
import { updateAttack } from "@/entities/attack.js";
import { updateCombatText } from "@/entities/combat-text.js";
import { updateMeleeEnemy } from "@/entities/enemy-melee.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { updateExperienceOrb } from "@/entities/xp-orb.js";
import { loadAssets } from "@/usecases/assets.js";
import { onAttackDestroy } from "@/usecases/attack.js";
import { debugBodies, debugFps, debugHitboxes } from "@/usecases/debug.js";
import { onEnemyDestroy } from "@/usecases/enemy.js";
import { destroyIfDead, destroyIfExpired, renderEntity, renderEntityStatus, updateCollisions, updatePhysics } from "@/usecases/entity.js";
import { renderHud } from "@/usecases/hud.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { InputCode, isInputPressed, resetTransform, run, scaleTransform, translateTransform, updateCamera } from "ridder";

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

    spawnEnemies();
    sortEntities(sortEntitiesOnDepth);

    for (const id of getEntities()) {
      const e = getEntity(id);

      if (destroyIfExpired(e) || destroyIfDead(e)) {
        continue;
      }

      switch (e.type) {
        case Type.PLAYER:
          updatePlayer(e);
          break;
        case Type.ENEMY_MELEE:
          updateMeleeEnemy(e);
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
      renderEntity(e);
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
