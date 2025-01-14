import { loadAssets, TextureId } from "@/assets.js";
import { updatePlayer } from "@/entities/player.js";
import { EntityType, renderEntity, updatePhysics } from "@/entity.js";
import { addEntity } from "@/factory.js";
import { game, getScene, SceneId, switchScene, transitionToNextScene } from "@/game.js";
import { cleanupDestroyedEntities, getEntity, sortEntitiesOnDepth } from "@/scene.js";
import { applyCameraTransform, drawText, drawTexture, getFramePerSecond, InputCode, isInputPressed, random, resetTransform, run, scaleTransform, updateCamera } from "ridder";

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    const scene = getScene(SceneId.TEST);
    scene.backgroundId = TextureId.GRASS;
    scene.camera.smoothing = 0.1;

    addEntity(EntityType.PLAYER, scene.id, 20, 20);

    for (let i = 0; i < 100; i++) {
      addEntity(EntityType.TREE_PINE, scene.id, random(0, 320), random(0, 180));
    }

    switchScene(scene.id);

    console.log(game);
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }

    transitionToNextScene();

    const scene = getScene(game.sceneId);

    for (const id of scene.update) {
      const e = getEntity(scene, id);

      switch (e.type) {
        case EntityType.PLAYER:
          updatePlayer(e);
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

    if (scene.backgroundId) {
      applyCameraTransform(scene.camera);
      drawTexture(scene.backgroundId, 0, 0);
    }

    for (const id of scene.render) {
      const e = getEntity(scene, id);
      renderEntity(e, scene);
    }

    resetTransform();
    scaleTransform(0.5, 0.5);
    drawText(getFramePerSecond().toString(), 1, 1, "lime");
  },
});
