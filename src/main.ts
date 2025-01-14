import { loadAssets, TextureId } from "@/assets.js";
import { newPlayer, updatePlayer } from "@/entities/player.js";
import { newPineTree } from "@/entities/tree-pine.js";
import { EntityType, renderEntity, updatePhysics } from "@/entity.js";
import { addScene, game, getScene } from "@/game.js";
import { getEntity, sortEntitiesOnDepth } from "@/scene.js";
import { applyCameraTransform, drawTexture, run } from "ridder";

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    const scene = addScene();
    scene.backgroundId = TextureId.GRASS;

    newPlayer(scene, 20, 20);
    newPineTree(scene, 50, 50);

    console.log(game);
  },

  update: () => {
    const scene = getScene(game.sceneId);

    for (const id of scene.update) {
      const e = getEntity(scene, id);

      switch (e.type) {
        case EntityType.PLAYER:
          updatePlayer(e);
          break;
      }

      updatePhysics(e);
    }
  },

  render: () => {
    const scene = getScene(game.sceneId);

    if (scene.backgroundId) {
      applyCameraTransform(scene.camera);
      drawTexture(scene.backgroundId, 0, 0);
    }

    sortEntitiesOnDepth(scene);

    for (const id of scene.render) {
      const e = getEntity(scene, id);

      renderEntity(e, scene);
    }
  },
});
