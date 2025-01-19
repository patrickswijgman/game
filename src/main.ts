import { game } from "@/data/game.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { renderCard } from "@/entities/ui/card.js";
import { EntityType } from "@/enums/entity.js";
import { SceneId, SceneStateId } from "@/enums/scene.js";
import { onWorldSceneStateEnter, onWorldSceneStateExit, onWorldSceneStateUpdate, renderWorldScene, setupWorldScene } from "@/scenes/world.js";
import { loadAssets } from "@/usecases/assets.js";
import { applyEntityAnimationTransform, applyEntityTransform, renderEntityShadow, renderEntitySprite, updatePhysics } from "@/usecases/entity.js";
import { getScene, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { cleanupDestroyedEntities, getEntity, sortEntitiesOnDepth, updateSceneState } from "@/usecases/scene.js";
import { drawText, getFramePerSecond, InputCode, isInputPressed, resetTransform, run, updateCamera } from "ridder";

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

    switch (scene.id) {
      case SceneId.WORLD:
        updateSceneState(scene, onWorldSceneStateEnter, onWorldSceneStateUpdate, onWorldSceneStateExit);
        break;
    }

    for (const id of scene.update) {
      const e = getEntity(scene, id);

      if (scene.stateId === SceneStateId.NONE) {
        switch (e.type) {
          case EntityType.PLAYER:
            updatePlayer(e);
            break;
          case EntityType.TREE:
            updateTree(e);
            break;
        }
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
      applyEntityAnimationTransform(e);
      renderEntitySprite(e);

      switch (e.type) {
        case EntityType.CARD:
          renderCard(e);
          break;
      }
    }

    if (isDebugging) {
    }

    resetTransform();
    drawText(getFramePerSecond().toString(), 1, 1, "lime");
  },
});
