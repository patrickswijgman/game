import { makeEntity, Type } from "@/core/entity.js";
import { addToEntities } from "@/core/game.js";

export function addEntity(type: Type, x: number, y: number) {
  const e = makeEntity(type, x, y);

  addToEntities(e.id);

  return e;
}
