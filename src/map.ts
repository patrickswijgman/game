import { getGridValue, Grid, grid, isInsideGridBounds, pick, random } from "ridder";

export type DungeonRoom = {
  type: string;
  x: number;
  y: number;
  children: Array<DungeonRoom>;
};

export type DungeonMap = {
  width: number;
  height: number;
  rooms: Grid<DungeonRoom>;
  visited: Array<DungeonRoom>;
};

export const ROOM_TYPES_PER_LEVEL: Record<number, Array<string>> = {
  1: ["combat"],
  2: ["combat"],
  3: ["combat"],
  4: ["combat", "bonfire"],
  5: ["combat"],
  6: ["combat"],
  7: ["combat"],
  8: ["bonfire"],
};

export const ENEMY_TYPES_PER_LEVEL: Record<number, Array<string>> = {
  1: ["melee"],
  2: ["melee"],
  3: ["melee"],
  4: ["melee"],
  5: ["melee"],
  6: ["melee"],
  7: ["melee"],
  8: ["melee"],
};

export const ENEMY_AMOUNT_PER_LEVEL: Record<number, [min: number, max: number]> = {
  1: [1, 2],
  2: [2, 3],
  3: [3, 4],
  4: [4, 5],
  5: [5, 6],
  6: [6, 7],
  7: [7, 8],
  8: [8, 9],
};

export function newDungeonMap() {
  const width = 5;
  const height = 10;

  const map: DungeonMap = {
    width,
    height,
    rooms: grid(width, height, (x, y) => ({ type: "", x, y, children: [] })),
    visited: [],
  };

  generateRooms(map);

  return map;
}

function generateRooms(map: DungeonMap) {
  const center = Math.floor(map.width / 2);
  const depth = map.height - 1;

  const start = getGridValue(map.rooms, center, 0);
  start.type = "start";

  const end = getGridValue(map.rooms, center, depth);
  end.type = "boss";

  map.visited.push(start);

  for (let i = 0; i < 3; i++) {
    let prev = start;
    let x = 0;
    let y = 0;

    for (let level = 1; level < depth; level++) {
      while (true) {
        x = prev.x + random(-1, 1);
        y = level;

        if (isInsideGridBounds(map.rooms, x, y)) {
          break;
        }
      }

      const room = getGridValue(map.rooms, x, y);
      room.type = pick(ROOM_TYPES_PER_LEVEL[level]);

      prev.children.push(room);
      prev = room;

      if (level === depth - 1) {
        room.children.push(end);
      }
    }
  }
}

export function visitDungeonRoom(map: DungeonMap, x: number, y: number) {
  const room = getGridValue(map.rooms, x, y);
  map.visited.push(room);
  return room;
}

export function isDungeonRoomVisited(map: DungeonMap, x: number, y: number) {
  const room = getGridValue(map.rooms, x, y);
  return map.visited.includes(room);
}

export function isNextDungeonRoom(map: DungeonMap, x: number, y: number) {
  const room = getGridValue(map.rooms, x, y);
  const current = getCurrentDungeonRoom(map);
  return current.children.includes(room);
}

export function getCurrentDungeonRoom(map: DungeonMap) {
  return map.visited[map.visited.length - 1];
}
