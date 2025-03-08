import { MAX_ENTITIES } from "@/consts/entity.js";
import { Entity, newEntity } from "@/data/entity.js";
import { table, Table } from "ridder";

export type Entities = {
  nextId: number;
  table: Table<Entity>;
  update: Array<number>;
  render: Array<number>;
  allies: Array<number>;
  enemies: Array<number>;
  destroyed: Array<number>;
};

export const entities: Entities = {
  nextId: 0,
  table: table(MAX_ENTITIES, newEntity),
  update: [],
  render: [],
  allies: [],
  enemies: [],
  destroyed: [],
};
