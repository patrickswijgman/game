import { Type } from "@/consts/entity.js";
import { FONT_HEIGHT } from "@/consts/render.js";
import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";
import { updateAttack } from "@/entities/attack.js";
import { updateMeleeEnemy } from "@/entities/enemy-melee.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { setupWorldScene, updateWorldScene } from "@/scenes/world.js";
import { loadAssets } from "@/usecases/assets.js";
import { debugBodies, debugEntities, debugFps, debugHitboxes } from "@/usecases/debug.js";
import { destroyIfDead, destroyIfExpired, renderEntity, renderEntityStatus, updateCollisions, updatePhysics } from "@/usecases/entity.js";
import { getScene, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { renderHud } from "@/usecases/hud.js";
import { cleanupDestroyedEntities, getEntity, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { InputCode, isInputPressed, resetTransform, run, scaleTransform, translateTransform, updateCamera } from "ridder";

let isDebugging = false;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    setupWorldScene();

    switchScene(SceneId.WORLD);
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }
    if (isInputPressed(InputCode.KEY_H)) {
      isDebugging = !isDebugging;
    }

    transitionToNextScene();

    const scene = getScene(game.sceneId);

    switch (scene.id) {
      case SceneId.WORLD:
        updateWorldScene(scene);
        break;
    }

    for (const id of scene.update) {
      const e = getEntity(scene, id);

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
      }

      updatePhysics(e);
      updateCollisions(e);
    }

    const player = getEntity(scene, scene.playerId);
    if (player.isPlayer) {
      updateCamera(scene.camera, player.position.x, player.position.y);
    }

    cleanupDestroyedEntities(scene);
    sortEntitiesOnDepth(scene);
  },

  render: () => {
    const scene = getScene(game.sceneId);

    for (const id of scene.render) {
      const e = getEntity(scene, id);
      renderEntity(e);
    }

    for (const id of scene.enemies) {
      const e = getEntity(scene, id);
      renderEntityStatus(e);
    }

    const player = getEntity(scene, scene.playerId);
    if (player.isPlayer) {
      renderHud(player);
    }

    if (isDebugging) {
      debugHitboxes(scene);
      debugBodies(scene);
      resetTransform();
      scaleTransform(0.5, 0.5);
      debugFps();
      translateTransform(0, FONT_HEIGHT);
      debugEntities(scene);
    }
  },
});
