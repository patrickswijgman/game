import { COLOR_BG, COLOR_MAP_LINE, COLOR_MAP_LINE_DIM } from "consts.js";
import { newMapRoom } from "entities/map/room.js";
import { game } from "game.js";
import { DungeonMap, getCurrentDungeonRoom, isDungeonRoomVisited, isNextDungeonRoom } from "map.js";
import { drawLine, drawSprite, drawText, getElapsedTime, getGridHeight, getGridValue, getGridWidth, getWidth, resetTransform, scaleTransform, translateTransform, tween } from "ridder";
import { newScene, Scene } from "scene.js";

export function newMapScene() {
  const scene = newScene("map");

  scene.backgroundTextureId = "map_bg";

  const { map } = game.session;

  for (let y = 0; y < getGridHeight(map.rooms); y++) {
    for (let x = 0; x < getGridWidth(map.rooms); x++) {
      const room = getGridValue(map.rooms, x, y);

      if (room.type) {
        newMapRoom(scene, getX(x, map), getY(y), room);
      }
    }
  }

  game.sceneMapId = scene.id;

  return scene;
}

export function renderMapScene(scene: Scene) {
  const { map } = game.session;

  resetTransform();
  translateTransform(10, 20);
  scaleTransform(1.25, 1.25);
  drawText("Legend", 0, 0, COLOR_BG);

  resetTransform();
  translateTransform(10, 40);
  drawSprite("map_start", 0, 0);
  drawText("- Start", 20, 8, COLOR_BG, "left", "middle");
  translateTransform(0, 20);
  drawSprite("map_bonfire", 0, 0);
  drawText("- Bonfire", 20, 8, COLOR_BG, "left", "middle");
  translateTransform(0, 20);
  drawSprite("map_combat", 0, 0);
  drawText("- Combat", 20, 8, COLOR_BG, "left", "middle");
  translateTransform(0, 20);
  drawSprite("map_boss", 0, 0);
  drawText("- Boss", 20, 8, COLOR_BG, "left", "middle");

  resetTransform();

  for (let y = 0; y < getGridHeight(map.rooms); y++) {
    for (let x = 0; x < getGridWidth(map.rooms); x++) {
      const room = getGridValue(map.rooms, x, y);

      if (room.type) {
        const isRoomVisited = isDungeonRoomVisited(map, room.x, room.y);

        for (const child of room.children) {
          const isChildVisited = isRoomVisited && isDungeonRoomVisited(map, child.x, child.y);
          const isChildNext = isRoomVisited && isNextDungeonRoom(map, child.x, child.y);
          const color = isChildVisited || isChildNext ? COLOR_MAP_LINE : COLOR_MAP_LINE_DIM;
          drawLine(getX(room.x, map), getY(room.y), getX(child.x, map), getY(child.y), color);
        }

        if (room === getCurrentDungeonRoom(map)) {
          const tweenY = tween(0, 5, 500, "easeInOutSine", getElapsedTime());
          drawSprite("map_current", getX(room.x, map) - 8, getY(room.y) - 20 - tweenY);
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
