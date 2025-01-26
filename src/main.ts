import { COLOR_HEALTH } from "@/consts.js";
import { game } from "@/data/game.js";
import { updateAttack } from "@/entities/attack.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { SceneId } from "@/enums/scene.js";
import { Type } from "@/enums/type.js";
import { renderWorldScene, setupWorldScene } from "@/scenes/world.js";
import { loadAssets } from "@/usecases/assets.js";
import { debugHitboxes } from "@/usecases/debug.js";
import { destroyEntity, renderEntity, updatePhysics } from "@/usecases/entity.js";
import { getScene, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { cleanupDestroyedEntities, getEntity, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { drawBar } from "@/usecases/ui.js";
import { applyCameraTransform, drawText, getFramePerSecond, InputCode, isInputPressed, resetTransform, run, tickTimer, translateTransform, updateCamera } from "ridder";

let isDebugging = false;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    setupWorldScene();

    switchScene(SceneId.WORLD);

    console.log(game);
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

    for (const id of scene.update) {
      const e = getEntity(scene, id);

      if (e.lifeTime && tickTimer(e.lifeTimer, e.lifeTime)) {
        destroyEntity(e);
        continue;
      }

      if (e.sheet.stats.healthMax && e.sheet.stats.health === 0) {
        destroyEntity(e);
        continue;
      }

      switch (e.type) {
        case Type.PLAYER:
          updatePlayer(e);
          break;
        case Type.TREE:
          updateTree(e);
          break;
        case Type.ATTACK:
          updateAttack(e);
          break;
      }

      updatePhysics(e);

      if (e.isPlayer) {
        updateCamera(scene.camera, e.position.x, e.position.y);
      }
    }

    cleanupDestroyedEntities(scene);
    sortEntitiesOnDepth(scene);
  },

  render: () => {
    const scene = getScene(game.sceneId);

    switch (scene.id) {
      case SceneId.WORLD:
        renderWorldScene(scene);
        break;
    }

    for (const id of scene.render) {
      const e = getEntity(scene, id);
      renderEntity(e, scene);

      // if (e.isEnemy && e.sheet.stats.health < e.sheet.stats.healthMax) {
      if (e.isEnemy) {
        resetTransform();
        applyCameraTransform(scene.camera);
        translateTransform(e.position.x, e.position.y - e.hitbox.h - 5);
        drawBar(-5, 0, e.sheet.stats.health, e.sheet.stats.healthMax, COLOR_HEALTH, 10, 3);
      }
    }

    if (isDebugging) {
      debugHitboxes(scene);
    }

    const player = getEntity(scene, scene.playerId);
    if (player) {
      resetTransform();
      translateTransform(10, 10);
      drawBar(0, 0, player.sheet.stats.health, player.sheet.stats.healthMax, COLOR_HEALTH, player.sheet.stats.healthMax, 5);
    }

    resetTransform();
    drawText(getFramePerSecond().toString(), 1, 1, "lime");
  },
});
