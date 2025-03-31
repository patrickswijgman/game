import { makeEntity, Type } from "@/core/entity.js";
import { addToWidgetsGroup } from "@/core/game.js";

export function addWidget(type: Type, x: number, y: number) {
  const e = makeEntity(type, x, y);

  addToWidgetsGroup(e.id);

  return e;
}
