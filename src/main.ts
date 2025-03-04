import { Type } from "@/consts/entity.js";
import { FONT_HEIGHT } from "@/consts/render.js";
import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";
import { updateAttack } from "@/entities/attack.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { onWorldSceneEnter, renderWorldScene, setupWorldScene, updateWorldScene } from "@/scenes/world.js";
import { loadAssets } from "@/usecases/assets.js";
import { debugEntities, debugFps, debugHitboxes } from "@/usecases/debug.js";
import { destroyIfDead, destroyIfExpired, renderEntity, renderEntityStatus, updatePhysics } from "@/usecases/entity.js";
import { getScene, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { renderHud } from "@/usecases/hud.js";
import { cleanupDestroyedEntities, getEntity, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { InputCode, isInputPressed, resetTransform, run, scaleTransform, translateTransform } from "ridder";

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

    if (transitionToNextScene()) {
      const scene = getScene(game.sceneId);

      switch (game.sceneId) {
        case SceneId.WORLD:
          onWorldSceneEnter(scene);
          break;
      }
    }

    const scene = getScene(game.sceneId);

    switch (scene.id) {
      case SceneId.WORLD:
        updateWorldScene(scene);
        break;
    }

    for (const id of scene.update) {
      const e = getEntity(scene, id);

      destroyIfExpired(e);
      destroyIfDead(e);

      if (e.isDestroyed) {
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
      renderEntity(e);
    }

    for (const id of scene.enemies) {
      const e = getEntity(scene, id);
      renderEntityStatus(e);
    }

    const player = getEntity(scene, scene.playerId);

    switch (scene.id) {
      case SceneId.WORLD:
        renderHud(player);
        break;
    }

    if (isDebugging) {
      debugHitboxes(scene);
      resetTransform();
      scaleTransform(0.5, 0.5);
      debugFps();
      translateTransform(0, FONT_HEIGHT);
      debugEntities(scene);
    }
  },
});
