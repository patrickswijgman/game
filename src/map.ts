import { getGridValue, Grid, grid, isInsideGridBounds, pick, random, repeat } from "ridder";

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
  0: ["start"],
  1: ["combat"],
  2: ["combat"],
  3: ["combat"],
  4: ["combat"],
  5: ["combat"],
  6: ["combat"],
  7: ["combat"],
  8: ["combat"],
  9: ["boss"],
};

export const ENEMY_TYPES_PER_LEVEL: Record<number, Array<string>> = {
  0: ["melee"],
  1: ["melee"],
  2: ["melee"],
  3: ["melee"],
  4: ["melee"],
  5: ["melee"],
  6: ["melee"],
  7: ["melee"],
  8: ["melee"],
  9: ["boss"],
};

export const ENEMY_AMOUNT_PER_LEVEL: Record<number, [min: number, max: number]> = {
  0: [1, 2],
  1: [1, 3],
  2: [2, 3],
  3: [2, 4],
  4: [1, 3],
  5: [1, 3],
  6: [1, 3],
  7: [1, 3],
  8: [1, 3],
  9: [1, 3],
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

  repeat(3, () => {
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
  });
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
