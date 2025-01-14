import { newClothes } from "items/armor/clothes.js";
import { newWornCrossbow } from "items/weapons/crossbow-worn.js";
import { newCrossbow } from "items/weapons/crossbow.js";
import { newWornLongsword } from "items/weapons/longsword-worn.js";
import { newLongsword } from "items/weapons/longsword.js";
import { polygon, Polygon, vec, Vector } from "ridder";
import { newStats, Stats } from "stats.js";

export type Attack = {
  start: number;
  windup: number;
  release: number;
  recovery: number;
};

export function newAttack(start = 0, windup = 0, release = 0, recovery = 0): Attack {
  return { start, windup, release, recovery };
}

export type Item = {
  name: string;
  spriteId: string;
  pivot: Vector;
  stats: Stats;
  hitbox: Polygon;
  actionId: string;
  attackDuration: Attack;
  attackArc: Attack;
};

const items: Record<string, Item> = {
  longsword: newLongsword(),
  longsword_worn: newWornLongsword(),
  crossbow: newCrossbow(),
  crossbow_worn: newWornCrossbow(),

  clothes: newClothes(),
};

export function newItem(item: Partial<Item>): Item {
  return {
    name: "",
    spriteId: "",
    pivot: vec(),
    stats: newStats(),
    hitbox: polygon(),
    actionId: "",
    attackDuration: newAttack(),
    attackArc: newAttack(),
    ...item,
  };
}

export function getItem(id: string) {
  return items[id];
}
