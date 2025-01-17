import { loadAssets } from "@/assets.js";
import { game } from "@/data/game.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { EntityType } from "@/enum/entity.js";
import { TileId } from "@/enum/tile.js";
import { addEntity, renderEntity, updatePhysics } from "@/usecases/entity.js";
import { getScene, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { addScene, cleanupDestroyedEntities, getEntity, populateTiles, renderTiles, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { drawText, getFramePerSecond, getGridHeight, getGridWidth, InputCode, isInputPressed, resetTransform, run, scaleTransform, setGridValue, updateCamera } from "ridder";

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    const scene = addScene(30, 20);

    const w = getGridWidth(scene.tiles);
    const h = getGridHeight(scene.tiles);
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        setGridValue(scene.tiles, x, y, TileId.GRASS);
      }
    }

    addEntity(EntityType.PLAYER, scene.id, scene.bounds.w / 2, scene.bounds.h / 2);

    populateTiles(scene);

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
        case EntityType.TREE:
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

    renderTiles(scene);

    for (const id of scene.render) {
      const e = getEntity(scene, id);
      renderEntity(e, scene);
    }

    resetTransform();
    scaleTransform(0.5, 0.5);
    drawText(getFramePerSecond().toString(), 1, 1, "lime");
  },
});
