import { MAX_ENTITIES } from "@/consts/global.js";
import { Entity, newEntity } from "@/data/entity.js";
import { clamp, remove, table, Table } from "ridder";

export type Entities = {
  data: Table<Entity>;
  active: Array<number>;
  destroyed: Array<number>;
  nextId: number;
};

const entities: Entities = {
  data: table(MAX_ENTITIES, newEntity),
  active: [],
  destroyed: [],
  nextId: 0,
};

export function nextEntity() {
  let id = entities.nextId;
  let e = entities.data[id];

  if (e.isAllocated) {
    id = entities.data.findIndex((e) => !e.isAllocated);
    if (id === -1) {
      throw new Error("Out of entities :(");
    }

    e = entities.data[id];
    entities.nextId = clamp(id + 1, 0, entities.data.length - 1);
  }

  e.id = id;
  e.isAllocated = true;

  entities.active.push(e.id);

  return e;
}

export function getEntity(id: number) {
  return entities.data[id];
}

export function removeEntity(id: number) {
  remove(entities.active, id);
}

export function destroyEntity(id: number) {
  const e = getEntity(id);
  e.isDestroyed = true;
  entities.destroyed.push(id);
}

export function getEntities(): Readonly<Array<number>> {
  return entities.active;
}

export function sortEntities(sort: (a: number, b: number) => number) {
  entities.active.sort(sort);
}

export function getDestroyedEntities(): Readonly<Array<number>> {
  return entities.destroyed;
}

export function clearDestroyedEntities() {
  entities.destroyed.length = 0;
}
