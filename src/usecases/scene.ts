import { zeroEntity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { getVectorDistance, remove, resetTimer, tickTimer } from "ridder";

export function nextEntity(scene: Scene) {
  let id = scene.entityId;
  let e = scene.entities[id];

  if (e.isAllocated) {
    id = scene.entities.findIndex((e) => !e.isAllocated);
    if (id === -1) {
      throw new Error("Out of entities :(");
    }

    e = scene.entities[id];
    scene.entityId = id + 1;
  }

  e.id = id;
  e.sceneId = scene.id;
  e.isAllocated = true;

  scene.all.push(e.id);
  scene.active.push(e.id);

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
      remove(scene.allies, id);
      remove(scene.enemies, id);
      zeroEntity(scene.entities[id]);
    }
    scene.destroyed.length = 0;
  }
}

export function revaluateActiveEntities(scene: Scene) {
  if (tickTimer(scene.activeTimer, 1000)) {
    setActiveEntities(scene);
    resetTimer(scene.activeTimer);
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
