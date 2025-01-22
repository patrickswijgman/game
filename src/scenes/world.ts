import { Entity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { addCard } from "@/entities/card.js";
import { TextureId } from "@/enums/assets.js";
import { InteractionId } from "@/enums/interaction.js";
import { SceneId, SceneStateId } from "@/enums/scene.js";
import { drawCard, initDeck, updateDeck } from "@/usecases/deck.js";
import { getScene } from "@/usecases/game.js";
import { loadMapFloorTexture, populateMap } from "@/usecases/map.js";
import { destroyEntity, getEntity, setSceneState } from "@/usecases/scene.js";
import { updateSheet } from "@/usecases/sheet.js";
import { applyCameraTransform, copyRectangle, drawTexture, getHeight, getWidth, pick, resetTransform, setRectangle } from "ridder";

export function setupWorldScene() {
  const scene = getScene(SceneId.WORLD);

  const [width, height] = loadMapFloorTexture();

  setRectangle(scene.bounds, 0, 0, width, height);

  scene.camera.smoothing = 0.1;
  scene.camera.shakeReduction = 0.1;
  copyRectangle(scene.camera.bounds, scene.bounds);

  populateMap(scene.id);
  setSceneState(scene, SceneStateId.INIT_COMBAT);

  scene.enemyId = scene.entities.find((e) => e.isEnemy).id;

  return scene;
}

export function onWorldSceneStateEnter(scene: Scene) {
  switch (scene.stateId) {
    case SceneStateId.INIT_COMBAT:
      {
        const player = getEntity(scene, scene.playerId);
        updateSheet(player.sheet);
        updateDeck(player.sheet.deck);
        initDeck(player.sheet.deck);
        const enemy = getEntity(scene, scene.enemyId);
        updateSheet(enemy.sheet);
        updateDeck(enemy.sheet.deck);
        initDeck(enemy.sheet.deck);
        setSceneState(scene, SceneStateId.ENEMY_PICK_CARD);
      }
      break;

    case SceneStateId.ENEMY_PICK_CARD:
      {
        const enemy = getEntity(scene, scene.enemyId);
        drawCard(enemy.sheet.deck, 3);
        const cardId = pick(enemy.sheet.deck.hand);
        const x = getWidth() - 40;
        const y = getHeight() / 2 - 10;
        const e = addCard(scene.id, x, y, cardId, InteractionId.NONE);
        scene.enemyChosenCardEntityId = e.id;
        scene.enemyChosenCardId = cardId;
        setSceneState(scene, SceneStateId.PLAYER_PICK_CARD);
      }
      break;

    case SceneStateId.PLAYER_PICK_CARD:
      {
        const player = getEntity(scene, scene.playerId);
        drawCard(player.sheet.deck, 3);
        for (let i = 0; i < player.sheet.deck.hand.length; i++) {
          const cardId = player.sheet.deck.hand[i];
          const x = getWidth() / 2 + i * 24 - Math.floor(player.sheet.deck.hand.length / 2) * 24;
          const y = getHeight() - 40;
          const e = addCard(scene.id, x, y, cardId, InteractionId.PLAYER_PICK_CARD);
          scene.playerHandCardEntityIds.push(e.id);
        }
      }
      break;
  }
}

export function onWorldSceneStateUpdate(scene: Scene) {}

export function onWorldSceneStateExit(scene: Scene) {
  switch (scene.stateId) {
    case SceneStateId.PLAYER_PICK_CARD:
      {
        for (const id of scene.playerHandCardEntityIds) {
          destroyEntity(scene, id);
        }
        scene.playerHandCardEntityIds.length = 0;
      }
      break;
  }
}

export function doPlayerPickCardInteraction(scene: Scene, e: Entity) {
  scene.playerChosenCardId = e.cardId;
  setSceneState(scene, SceneStateId.RESOLVE_CARDS);
}

export function renderWorldScene(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  drawTexture(TextureId.FLOOR, 0, 0);
}
