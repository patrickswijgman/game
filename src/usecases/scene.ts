import { TILE_SIZE } from "@/consts.js";
import { Entity, zeroEntity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { SceneId } from "@/enums/scene.js";
import { getScene } from "@/usecases/game.js";
import { copyRectangle, remove, setRectangle } from "ridder";

export function setupScene(id: SceneId, w: number, h: number) {
  const scene = getScene(id);
  scene.camera.smoothing = 0.1;
  scene.camera.shakeReduction = 0.1;
  setRectangle(scene.bounds, 0, 0, w * TILE_SIZE, h * TILE_SIZE);
  copyRectangle(scene.camera.bounds, scene.bounds);
  return scene;
}

export function nextEntity(scene: Scene) {
  const id = scene.entities.findIndex((e) => !e.isAllocated);

  if (id === -1) {
    throw new Error("Out of entities :(");
  }

  const e = scene.entities[id];
  e.isAllocated = true;
  e.id = id;
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
