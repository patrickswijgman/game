import { Type } from "@/consts/entity.js";
import { zeroEntity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { updateAttack } from "@/entities/attack.js";
import { updateCombatText } from "@/entities/combat-text.js";
import { updateMeleeEnemy } from "@/entities/enemy-melee.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { updateExperienceOrb } from "@/entities/xp-orb.js";
import { loadAssets } from "@/usecases/assets.js";
import { onAttackDestroy } from "@/usecases/attack.js";
import { debugBodies, debugEntities, debugFps, debugHitboxes } from "@/usecases/debug.js";
import { onEnemyDestroy } from "@/usecases/enemy.js";
import { destroyIfDead, destroyIfExpired, getEntity, renderEntity, renderEntityStatus, updateCollisions, updatePhysics } from "@/usecases/entity.js";
import { setup } from "@/usecases/game.js";
import { renderHud } from "@/usecases/hud.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { getPlayer, spawnEnemies } from "@/usecases/world.js";
import { InputCode, isInputPressed, remove, resetTransform, run, scaleTransform, translateTransform, updateCamera } from "ridder";

let isDebugging = false;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();
    setup();
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }
    if (isInputPressed(InputCode.KEY_H)) {
      isDebugging = !isDebugging;
    }

    spawnEnemies();

    for (const id of game.update) {
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
    }

    if (isPlayerAlive()) {
      const player = getPlayer();
      updateCamera(game.camera, player.position.x, player.position.y);
    }

    for (const id of game.destroyed) {
      const e = getEntity(id);
      if (e.isEnemy) {
        onEnemyDestroy(e);
      }
      if (e.isAttack) {
        onAttackDestroy(e);
      }
    }

    cleanupDestroyedEntities();
    sortEntitiesOnDepth();
  },

  render: () => {
    for (const id of game.render) {
      const e = getEntity(id);
      renderEntity(e);
    }

    for (const id of game.enemies) {
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
      debugEntities();
    }
  },
});

function sortEntitiesOnDepth() {
  game.render.sort((idA, idB) => {
    const a = game.entities[idA];
    const b = game.entities[idB];
    return a.position.y + a.depth - b.position.y + b.depth;
  });
}

function cleanupDestroyedEntities() {
  if (game.destroyed.length) {
    for (const id of game.destroyed) {
      const e = getEntity(id);
      remove(game.update, id);
      remove(game.render, id);
      remove(game.allies, id);
      remove(game.enemies, id);
      remove(game.bodies, e.body);
      zeroEntity(e);
    }
    game.destroyed.length = 0;
  }
}
