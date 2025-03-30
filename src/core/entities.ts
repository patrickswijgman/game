import { MAX_ENTITIES } from "@/consts.js";
import { Entity, newEntity } from "@/core/entity.js";
import { clamp, table, Table } from "ridder";

export type Entities = {
  data: Table<Entity>;
  nextId: number;
};

const entities: Entities = {
  data: table(MAX_ENTITIES, newEntity),
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

  return e;
}

export function getEntity(id: number) {
  return entities.data[id];
}
