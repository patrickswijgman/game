import { makeEntity, Type } from "@/core/entity.js";
import { addToWidgets } from "@/core/game.js";

export function addWidget(type: Type, x: number, y: number) {
  const e = makeEntity(type, x, y);

  addToWidgets(e.id);

  return e;
}
