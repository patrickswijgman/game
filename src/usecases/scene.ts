import { TILE_SIZE } from "@/consts.js";
import { Entity, zeroEntity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { addTree } from "@/entities/tree.js";
import { SpriteId } from "@/enums/assets.js";
import { TileId } from "@/enums/tile.js";
import { nextScene } from "@/usecases/game.js";
import { applyCameraTransform, copyRectangle, drawSprite, getGridHeight, getGridValue, getGridWidth, grid, isGridValid, remove, resetTransform, roll, setRectangle } from "ridder";

export function addScene(w: number, h: number) {
  const scene = nextScene();
  scene.camera.smoothing = 0.1;
  scene.camera.shakeReduction = 0.1;
  scene.tiles = grid(w, h, () => TileId.NONE);
  setRectangle(scene.bounds, 0, 0, w * TILE_SIZE, h * TILE_SIZE);
  copyRectangle(scene.camera.bounds, scene.bounds);
  return scene;
}

export function nextEntity(scene: Scene) {
  const id = scene.entities.findIndex((e) => !e.isAssigned);

  if (id === -1) {
    throw new Error("Out of entities :(");
  }

  const e = scene.entities[id];
  e.id = id;
  e.isAssigned = true;
  e.sceneId = scene.id;
  scene.update.push(e.id);
  scene.render.push(e.id);
  return e;
}

export function getEntity(scene: Scene, id: number) {
  return scene.entities[id];
}

export function destroyEntity(scene: Scene, e: Entity) {
  scene.destroyed.push(e.id);
}

export function sortEntitiesOnDepth(scene: Scene) {
  scene.render.sort((idA, idB) => {
    const a = scene.entities[idA];
    const b = scene.entities[idB];

    if (a.isOverlay) {
      return 1;
    }
    if (b.isOverlay) {
      return -1;
    }

    return a.position.y - b.position.y;
  });
}

export function cleanupDestroyedEntities(scene: Scene) {
  if (scene.destroyed.length) {
    for (const id of scene.destroyed) {
      remove(scene.update, id);
      remove(scene.render, id);
      zeroEntity(scene.entities[id]);
    }
    scene.destroyed.length = 0;
  }
}

export function populateTiles(scene: Scene) {
  if (isGridValid(scene.tiles)) {
    const w = getGridWidth(scene.tiles);
    const h = getGridHeight(scene.tiles);
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const tile = getGridValue(scene.tiles, x, y);
        const worldX = x * TILE_SIZE;
        const worldY = y * TILE_SIZE;
        const centerX = worldX + TILE_SIZE / 2;
        const centerY = worldY + TILE_SIZE / 2;
        switch (tile) {
          case TileId.FOREST:
            if (roll(0.8)) {
              addTree(scene.id, centerX, centerY + 4);
            }
            break;
        }
      }
    }
  }
}

export function renderTiles(scene: Scene) {
  if (isGridValid(scene.tiles)) {
    resetTransform();
    applyCameraTransform(scene.camera);
    const w = getGridWidth(scene.tiles);
    const h = getGridHeight(scene.tiles);
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const tile = getGridValue(scene.tiles, x, y);
        const worldX = x * TILE_SIZE;
        const worldY = y * TILE_SIZE;
        switch (tile) {
          case TileId.FOREST:
            drawSprite(SpriteId.TILE_GRASS, worldX, worldY);
            break;
        }
      }
    }
  }
}
