import { getGridValue, Grid, grid, isInsideGridBounds, pick, random, repeat } from "ridder";

export type DungeonMapNode = {
  type: string;
  x: number;
  y: number;
  children: Array<DungeonMapNode>;
};

export type DungeonMap = {
  width: number;
  height: number;
  rooms: Grid<DungeonMapNode>;
  visited: Array<DungeonMapNode>;
};

const ROOM_TYPES_PER_LEVEL: Record<number, Array<string>> = {
  1: ["combat"],
  2: ["combat"],
  3: ["combat"],
  4: ["combat"],
  5: ["combat"],
  6: ["combat"],
  7: ["combat"],
  8: ["combat"],
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

      const node = getGridValue(map.rooms, x, y);
      node.type = pick(ROOM_TYPES_PER_LEVEL[level]);

      prev.children.push(node);
      prev = node;

      if (level === depth - 1) {
        node.children.push(end);
      }
    }
  });
}

export function visitDungeonRoom(map: DungeonMap, x: number, y: number) {
  const node = getGridValue(map.rooms, x, y);
  map.visited.push(node);
  return node;
}

export function isDungeonRoomVisited(map: DungeonMap, x: number, y: number) {
  const node = getGridValue(map.rooms, x, y);
  return map.visited.includes(node);
}

export function isNextDungeonRoom(map: DungeonMap, x: number, y: number) {
  const node = getGridValue(map.rooms, x, y);
  const lastVisited = map.visited[map.visited.length - 1];
  return lastVisited.children.includes(node);
}
