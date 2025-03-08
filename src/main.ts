import { Type } from "@/consts/entity.js";
import { FONT_HEIGHT } from "@/consts/render.js";
import { entities } from "@/data/entities.js";
import { zeroEntity } from "@/data/entity.js";
import { world } from "@/data/world.js";
import { updateAttack } from "@/entities/attack.js";
import { updateCombatText } from "@/entities/combat-text.js";
import { updateMeleeEnemy } from "@/entities/enemy-melee.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { loadAssets } from "@/usecases/assets.js";
import { debugBodies, debugEntities, debugFps, debugHitboxes } from "@/usecases/debug.js";
import { destroyIfDead, destroyIfExpired, getEntity, renderEntity, renderEntityStatus, updateCollisions, updatePhysics } from "@/usecases/entity.js";
import { renderHud } from "@/usecases/hud.js";
import { setupWorld, updateWorld } from "@/usecases/world.js";
import { InputCode, isInputPressed, remove, resetTransform, run, scaleTransform, translateTransform, updateCamera } from "ridder";

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

    updateWorld();

    for (const id of entities.update) {
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
        case Type.COMBAT_TEXT:
          updateCombatText(e);
          break;
      }

      updatePhysics(e);
      updateCollisions(e);
    }

    const player = getEntity(world.playerId);
    if (player.isPlayer) {
      updateCamera(world.camera, player.position.x, player.position.y);
    }

    cleanupDestroyedEntities();
    sortEntitiesOnDepth();
  },

  render: () => {
    for (const id of entities.render) {
      const e = getEntity(id);
      renderEntity(e);
    }

    for (const id of entities.enemies) {
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
      translateTransform(0, FONT_HEIGHT);
      debugEntities();
    }
  },
});

function sortEntitiesOnDepth() {
  entities.render.sort((idA, idB) => {
    const a = entities.table[idA];
    const b = entities.table[idB];
    return a.position.y + a.depth - b.position.y + b.depth;
  });
}

function cleanupDestroyedEntities() {
  if (entities.destroyed.length) {
    for (const id of entities.destroyed) {
      const e = getEntity(id);
      remove(entities.update, id);
      remove(entities.render, id);
      remove(entities.allies, id);
      remove(entities.enemies, id);
      remove(world.bodies, e.body);
      zeroEntity(e);
    }
    entities.destroyed.length = 0;
  }
}
