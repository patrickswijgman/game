import { getGridValue, Grid, grid, isInsideGridBounds } from "engine/grid.js";
import { pick, vec } from "ridder";

export type DungeonMapNode = {
  type: string;
  x: number;
  y: number;
  children: Array<DungeonMapNode>;
};

export type DungeonMap = {
  rooms: Grid<DungeonMapNode>;
};

export function newDungeonMap() {
  const w = 5;
  const h = 10;

  const map: DungeonMap = {
    rooms: grid(w, h, (x, y) => ({ type: "", x, y, children: [] })),
  };

  generateRooms(map);

  return map;
}

function generateRooms(map: DungeonMap) {
  const start = getGridValue(map.rooms, 2, 0);
  start.type = "start";

  const end = getGridValue(map.rooms, 2, 9);
  end.type = "boss";

  const pos = vec();
  const dirs = [-1, 0, 1];

  let prev = start;

  for (let i = 0; i < 2; i++) {
    for (let y = start.y + 1; y < end.y; y++) {
      while (true) {
        pos.x = prev.x + pick(dirs);
        pos.y = y;

        if (isInsideGridBounds(map.rooms, pos.x, pos.y)) {
          break;
        }
      }

      const node = getGridValue(map.rooms, pos.x, pos.y);
      node.type = "???";

      prev.children.push(node);
      prev = node;
    }
  }
}
