import { game } from "@/data/game.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { SceneId } from "@/enums/scene.js";
import { Type } from "@/enums/type.js";
import { renderWorldScene, setupWorldScene } from "@/scenes/world.js";
import { loadAssets } from "@/usecases/assets.js";
import { debugHitboxes } from "@/usecases/debug.js";
import { applyEntityTransform, applyEntityTweenTransform, renderEntityOutline, renderEntityShadow, renderEntitySprite, updatePhysics } from "@/usecases/entity.js";
import { getScene, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { cleanupDestroyedEntities, destroyEntity, getEntity, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { drawText, getFramePerSecond, InputCode, isInputPressed, resetTransform, run, tickTimer, updateCamera } from "ridder";

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
        destroyEntity(scene, id);
        continue;
      }

      switch (e.type) {
        case Type.PLAYER:
          updatePlayer(e);
          break;
        case Type.TREE:
          updateTree(e);
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

      resetTransform();
      applyEntityTransform(e, scene);
      renderEntityShadow(e);
      applyEntityTweenTransform(e);
      renderEntitySprite(e);
      renderEntityOutline(e);
    }

    if (isDebugging) {
      debugHitboxes(scene);
    }

    resetTransform();
    drawText(getFramePerSecond().toString(), 1, 1, "lime");
  },
});
