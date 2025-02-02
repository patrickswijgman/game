import { zeroEntity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { getVectorDistance, remove } from "ridder";

export function nextEntity(scene: Scene) {
  const id = scene.entities.findIndex((e) => !e.isAllocated);

  if (id === -1) {
    throw new Error("Out of entities :(");
  }

  const e = scene.entities[id];
  e.isAllocated = true;
  e.id = id;
  e.sceneId = scene.id;
  scene.all.push(e.id);
  return e;
}

export function getEntity(scene: Scene, id: number) {
  return scene.entities[id];
}

export function sortEntitiesOnDepth(scene: Scene, list: Array<number>) {
  list.sort((idA, idB) => {
    const a = scene.entities[idA];
    const b = scene.entities[idB];
    return a.position.y + a.depth - b.position.y + b.depth;
  });
}

export function cleanupDestroyedEntities(scene: Scene) {
  if (scene.destroyed.length) {
    for (const id of scene.destroyed) {
      remove(scene.all, id);
      remove(scene.active, id);
      zeroEntity(scene.entities[id]);
    }
    scene.destroyed.length = 0;
  }
}

export function setActiveEntities(scene: Scene) {
  scene.active.length = 0;

  const player = getEntity(scene, scene.playerId);
  if (!player.isPlayer) {
    scene.active.push(...scene.all);
    return;
  }

  for (const id of scene.all) {
    const e = getEntity(scene, id);
    if (getVectorDistance(e.position, player.position) < 500) {
      scene.active.push(id);
    }
  }
}
