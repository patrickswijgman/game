import { COLOR_DIM } from "consts.js";
import { newMapRoom } from "entities/map/map-room.js";
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
      const node = getGridValue(session.map.rooms, x, y);

      if (node.type) {
        newMapRoom(scene, getX(x, session.map), getY(y), node);
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
      const node = getGridValue(session.map.rooms, x, y);

      if (node.type) {
        for (const child of node.children) {
          const color = isDungeonRoomVisited(session.map, node.x, node.y) && isNextDungeonRoom(session.map, child.x, child.y) ? "white" : COLOR_DIM;
          drawLine(getX(node.x, session.map), getY(node.y), getX(child.x, session.map), getY(child.y), color);
        }

        if (node === getCurrentDungeonRoom(session.map)) {
          const tweenY = tween(0, 5, 500, "easeInOutSine", getElapsedTime());
          drawSprite("ui_map_current", getX(node.x, session.map) - 8, getY(node.y) - 20 - tweenY);
        }
      }
    }
  }
}

function getX(x: number, map: DungeonMap) {
  return getWidth() / 2 - Math.floor(map.width / 2) * 64 + x * 64;
}

function getY(y: number) {
  return 32 + y * 32;
}
