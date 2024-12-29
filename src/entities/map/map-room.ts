import { newEntity } from "entity.js";
import { DungeonMapNode } from "map.js";
import { Scene } from "scene.js";

export function newMapRoom(scene: Scene, x: number, y: number, node: DungeonMapNode) {
  const e = newEntity(scene, "map_room", x, y);

  switch (node.type) {
    case "start":
      e.spriteId = "ui_map_start";
      break;
    case "boss":
      e.spriteId = "ui_map_boss";
      break;
    default:
      e.spriteId = "ui_map_room";
      break;
  }

  e.pivot.x = 8;
  e.pivot.y = 8;

  return e;
}
