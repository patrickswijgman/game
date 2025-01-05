import { pick } from "ridder";
import { table } from "table.js";

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
  0: [],
  1: ["melee", "melee_quick", "ranged"],
  2: ["melee", "melee_quick", "ranged"],
  3: ["melee", "melee_quick", "ranged"],
  4: ["melee", "melee_quick", "ranged"],
  5: ["melee", "melee_quick", "ranged"],
  6: ["melee", "melee_quick", "ranged"],
  7: ["melee", "melee_quick", "ranged"],
  8: ["melee", "melee_quick", "ranged"],
  9: ["boss"],
};

export const ENEMY_AMOUNT_PER_LEVEL: Record<number, [min: number, max: number]> = {
  0: [0, 0],
  1: [1, 2],
  2: [2, 3],
  3: [3, 4],
  4: [4, 5],
  5: [5, 6],
  6: [6, 7],
  7: [7, 8],
  8: [8, 9],
  9: [1, 1],
};

export type DungeonMap = {
  rooms: Array<string>;
  level: number;
};

export function newDungeonMap(): DungeonMap {
  return {
    rooms: table(10, (level) => pick(ROOM_TYPES_PER_LEVEL[level])),
    level: 0,
  };
}

export function goToNextDungeonRoom(map: DungeonMap) {
  return ++map.level;
}

export function getCurrentDungeonRoom(map: DungeonMap) {
  return map.rooms[map.level];
}
