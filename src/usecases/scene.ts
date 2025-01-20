import { zeroEntity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { remove } from "ridder";

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

export function destroyEntity(scene: Scene, id: number) {
  scene.destroyed.push(id);
}

type SceneStateLifecycleHook = (scene: Scene) => void;

export function updateSceneState(scene: Scene, onEnter: SceneStateLifecycleHook, onUpdate: SceneStateLifecycleHook, onExit: SceneStateLifecycleHook) {
  if (scene.stateNextId !== scene.stateId) {
    onExit(scene);
    scene.stateId = scene.stateNextId;
    onEnter(scene);
  }
  onUpdate(scene);
}

export function setSceneState(scene: Scene, stateId: number) {
  scene.stateNextId = stateId;
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
