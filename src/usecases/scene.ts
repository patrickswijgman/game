import { TextureId } from "@/assets.js";
import { Entity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { nextScene } from "@/usecases/game.js";
import { copyRectangle, remove, setRectangle, zero } from "ridder";

export function addScene(w: number, h: number, bg: TextureId) {
  const scene = nextScene();
  scene.backgroundId = bg;
  scene.camera.smoothing = 0.1;
  scene.camera.shakeReduction = 0.1;
  setRectangle(scene.bounds, 0, 0, w, h);
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
    return a.position.y - b.position.y;
  });
}

export function cleanupDestroyedEntities(scene: Scene) {
  if (scene.destroyed.length) {
    for (const id of scene.destroyed) {
      remove(scene.update, id);
      remove(scene.render, id);
      zero(scene.entities[id]);
    }
    scene.destroyed.length = 0;
  }
}
