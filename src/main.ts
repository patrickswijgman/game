import { loadAssets, TextureId } from "@/assets.js";
import { EntityType } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { updatePlayer } from "@/entities/player.js";
import { addEntity, renderEntity, updatePhysics } from "@/usecases/entity.js";
import { getScene, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { addScene, cleanupDestroyedEntities, getEntity, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { applyCameraTransform, drawText, drawTexture, getFramePerSecond, InputCode, isInputPressed, random, resetTransform, run, scaleTransform, updateCamera } from "ridder";

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    const scene = addScene(480, 270, TextureId.GRASS);

    addEntity(EntityType.PLAYER, scene.id, 240, 135);

    for (let i = 0; i < 100; i++) {
      addEntity(EntityType.TREE_PINE, scene.id, random(0, 480), random(0, 270));
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
