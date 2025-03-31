import { makeEntity, Type } from "@/core/entity.js";
import { addToObjectsGroup } from "@/core/game.js";

export function addEntity(type: Type, x: number, y: number) {
  const e = makeEntity(type, x, y);

  addToObjectsGroup(e.id);

  return e;
}
