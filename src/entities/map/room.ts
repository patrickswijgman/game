import { Entity, newEntity, setSprites } from "entity.js";
import { game, switchScene } from "game.js";
import { DungeonRoom, isNextDungeonRoom, visitDungeonRoom } from "map.js";
import { copyVector, doesRectangleContain, getMousePosition, InputCode, isInputPressed, setRectangle } from "ridder";
import { Scene } from "scene.js";
import { newBonfireRoomScene } from "scenes/rooms/bonfire.js";
import { newCombatRoomScene } from "scenes/rooms/combat.js";

export function newMapRoom(scene: Scene, x: number, y: number, room: DungeonRoom) {
  const e = newEntity(scene, "map_room", x, y);

  switch (room.type) {
    case "start":
      setSprites(e, "map_start", 8, 8);
      break;
    case "boss":
      setSprites(e, "map_boss", 8, 8);
      break;
    case "combat":
      setSprites(e, "map_combat", 8, 8);
      break;
    case "bonfire":
      setSprites(e, "map_bonfire", 8, 8);
      break;
  }

  copyVector(e.roomCoordinates, room);
  setRectangle(e.hitarea, x - 8, y - 8, 16, 16);

  return e;
}

export function updateMapRoom(e: Entity) {
  const mouse = getMousePosition();

  e.isOutlineVisible = false;
  e.isOutlinePrimaryVisible = true;

  if (isNextDungeonRoom(game.session.map, e.roomCoordinates.x, e.roomCoordinates.y) && doesRectangleContain(e.hitarea, mouse.x, mouse.y)) {
    e.isOutlineVisible = true;
    e.isOutlinePrimaryVisible = false;

    if (isInputPressed(InputCode.MOUSE_LEFT, true)) {
      const room = visitDungeonRoom(game.session.map, e.roomCoordinates.x, e.roomCoordinates.y);

      let scene: Scene;

      switch (room.type) {
        case "combat":
          scene = newCombatRoomScene(room.y);
          break;
        case "bonfire":
          scene = newBonfireRoomScene(room.y);
          break;
      }

      switchScene(scene.id);
    }
  }
}
