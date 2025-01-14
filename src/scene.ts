import { zero } from "@/engine/mem.js";
import { Table, table } from "@/engine/table.js";
import { Entity, newEntity } from "@/entity.js";
import { camera, Camera, remove } from "ridder";

export type Scene = {
  // Memory allocation
  id: number;
  isAssigned: boolean;

  // Tables
  entities: Table<Entity>;

  // Table support lists
  update: Array<number>;
  render: Array<number>;
  destroyed: Array<number>;

  // World
  camera: Camera;
  backgroundId: string;
};

export function newScene(): Scene {
  return {
    // Memory allocation
    id: 0,
    isAssigned: false,

    // Tables
    entities: table(1024, newEntity),

    // Table support lists
    update: [],
    render: [],
    destroyed: [],

    // World
    camera: camera(),
    backgroundId: "",
  };
}

export function addEntity(scene: Scene) {
  const idx = scene.entities.findIndex((e) => !e.isAssigned);

  if (idx === -1) {
    throw new Error("Out of entities :(");
  }

  const e = scene.entities[idx];

  e.id = idx;
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
