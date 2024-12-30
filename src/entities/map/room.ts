import { Entity, newEntity, setSprites } from "entity.js";
import { getSession, switchScene } from "game.js";
import { DungeonMapNode, isNextDungeonRoom, visitDungeonRoom } from "map.js";
import { copyVector, doesRectangleContain, getMousePosition, InputCode, isInputPressed, setRectangle } from "ridder";
import { Scene } from "scene.js";
import { newCombatRoomScene } from "scenes/rooms/combat.js";

export function newMapRoom(scene: Scene, x: number, y: number, node: DungeonMapNode) {
  const e = newEntity(scene, "map_room", x, y);

  switch (node.type) {
    case "start":
      setSprites(e, "ui_map_start", 8, 8);
      break;
    case "boss":
      setSprites(e, "ui_map_boss", 8, 8);
      break;
    case "combat":
      setSprites(e, "ui_map_combat", 8, 8);
      break;
  }

  copyVector(e.node, node);
  setRectangle(e.hitarea, x - 8, y - 8, 16, 16);

  return e;
}

export function updateMapRoom(e: Entity) {
  const session = getSession();
  const mouse = getMousePosition();

  e.isOutlineVisible = false;
  e.isOutlinePrimaryVisible = true;

  if (isNextDungeonRoom(session.map, e.node.x, e.node.y) && doesRectangleContain(e.hitarea, mouse.x, mouse.y)) {
    e.isOutlineVisible = true;
    e.isOutlinePrimaryVisible = false;

    if (isInputPressed(InputCode.MOUSE_LEFT, true)) {
      const node = visitDungeonRoom(session.map, e.node.x, e.node.y);

      let scene: Scene;

      switch (node.type) {
        case "combat":
        case "boss":
          scene = newCombatRoomScene();
          break;
      }

      switchScene(scene.id);
    }
  }
}
