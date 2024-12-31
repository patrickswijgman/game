import { COLOR_MAP_LINE, COLOR_MAP_LINE_DIM } from "consts.js";
import { newMapRoom } from "entities/map/room.js";
import { getSession } from "game.js";
import { DungeonMap, getCurrentDungeonRoom, isDungeonRoomVisited, isNextDungeonRoom } from "map.js";
import { drawLine, drawSprite, getElapsedTime, getGridHeight, getGridValue, getGridWidth, getWidth, resetTransform, tween } from "ridder";
import { newScene, Scene } from "scene.js";

export function newMapScene() {
  const scene = newScene("map", "map");

  scene.backgroundTextureId = "map_bg";

  const session = getSession();

  for (let y = 0; y < getGridHeight(session.map.rooms); y++) {
    for (let x = 0; x < getGridWidth(session.map.rooms); x++) {
      const room = getGridValue(session.map.rooms, x, y);

      if (room.type) {
        newMapRoom(scene, getX(x, session.map), getY(y), room);
      }
    }
  }

  return scene;
}

export function renderMapScene(scene: Scene) {
  const session = getSession();

  resetTransform();

  for (let y = 0; y < getGridHeight(session.map.rooms); y++) {
    for (let x = 0; x < getGridWidth(session.map.rooms); x++) {
      const room = getGridValue(session.map.rooms, x, y);

      if (room.type) {
        for (const child of room.children) {
          const color = isDungeonRoomVisited(session.map, room.x, room.y) && isNextDungeonRoom(session.map, child.x, child.y) ? COLOR_MAP_LINE : COLOR_MAP_LINE_DIM;
          drawLine(getX(room.x, session.map), getY(room.y), getX(child.x, session.map), getY(child.y), color);
        }

        if (room === getCurrentDungeonRoom(session.map)) {
          const tweenY = tween(0, 5, 500, "easeInOutSine", getElapsedTime());
          drawSprite("ui_map_current", getX(room.x, session.map) - 8, getY(room.y) - 20 - tweenY);
        }
      }
    }
  }
}

function getX(x: number, map: DungeonMap) {
  return getWidth() / 2 - Math.floor(map.width / 2) * 48 + x * 48;
}

function getY(y: number) {
  return 32 + y * 32;
}
