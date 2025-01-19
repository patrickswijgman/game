import { game } from "@/data/game.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { addCard, renderCard } from "@/entities/ui/card.js";
import { TextureId } from "@/enums/assets.js";
import { CardId } from "@/enums/card.js";
import { EntityType } from "@/enums/entity.js";
import { ItemId } from "@/enums/item.js";
import { SceneId } from "@/enums/scene.js";
import { loadAssets } from "@/usecases/assets.js";
import { drawCard, initDeck, updateDeck } from "@/usecases/deck.js";
import { applyEntityAnimationTransform, applyEntityTransform, renderEntityShadow, renderEntitySprite, updatePhysics } from "@/usecases/entity.js";
import { getScene, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { loadFloorTexture, populateTiles } from "@/usecases/map.js";
import { cleanupDestroyedEntities, getEntity, setupScene, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { updateSheet } from "@/usecases/sheet.js";
import { applyCameraTransform, drawText, drawTexture, getFramePerSecond, InputCode, isInputPressed, resetTransform, run, updateCamera } from "ridder";

let isDebugging = false;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    loadFloorTexture();

    const scene = setupScene(SceneId.WORLD, 64, 64);

    populateTiles(scene.id);

    game.sheet.weaponId = ItemId.LONGSWORD;
    updateSheet(game.sheet);
    updateDeck(game.sheet.deck);
    initDeck(game.sheet.deck);
    drawCard(game.sheet.deck, 3);

    addCard(scene.id, 16, 16, CardId.SLASH);

    switchScene(scene.id);

    const count = scene.entities.reduce((prev, e) => (e.isAllocated ? ++prev : prev), 0);
    console.log(game);
    console.log(count);
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

    applyCameraTransform(scene.camera);
    drawTexture(TextureId.FLOOR, 0, 0);

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
