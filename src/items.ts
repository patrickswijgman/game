import { polygon, Polygon, polygonFromRect, rect, vec, Vector } from "ridder";
import { newStats, Stats } from "stats.js";

type Arc = {
  start: number;
  windup: number;
  release: number;
  recovery: number;
};

export type Item = {
  name: string;
  spriteId: string;
  pivot: Vector;
  stats: Stats;
  hitbox: Polygon;
  actionId: string;
  arcDuration: Arc;
  arcAngle: Arc;
};

const items: Record<string, Item> = {
  longsword: newItem({
    name: "Longsword",
    spriteId: "item_longsword",
    pivot: vec(2, 15.5),
    stats: newStats({
      damage: 8,
      strengthScaling: 1,
      dexterityScaling: 1,
      staminaCost: 25,
    }),
    hitbox: polygonFromRect(0, 0, rect(12, -2, 12, 4)),
    actionId: "melee_attack",
    arcDuration: {
      start: 0,
      windup: 300,
      release: 150,
      recovery: 200,
    },
    arcAngle: {
      start: 0,
      windup: -90,
      release: 90,
      recovery: 0,
    },
  }),

  rusty_sword: newItem({
    name: "Rusty sword",
    spriteId: "item_longsword",
    pivot: vec(2, 15.5),
    stats: newStats({
      damage: 6,
      strengthScaling: 1,
      dexterityScaling: 1,
      staminaCost: 25,
    }),
    hitbox: polygonFromRect(0, 0, rect(12, -2, 12, 4)),
    actionId: "melee_attack",
    arcDuration: {
      start: 0,
      windup: 400,
      release: 200,
      recovery: 300,
    },
    arcAngle: {
      start: 0,
      windup: -90,
      release: 90,
      recovery: 0,
    },
  }),
};

function newItem(item: Partial<Item>): Item {
  return {
    name: "",
    spriteId: "",
    pivot: vec(),
    stats: newStats(),
    hitbox: polygon(),
    actionId: "",
    arcDuration: {
      start: 0,
      windup: 0,
      release: 0,
      recovery: 0,
    },
    arcAngle: {
      start: 0,
      windup: 0,
      release: 0,
      recovery: 0,
    },
    ...item,
  };
}

export function getItem(id: string) {
  return items[id];
}
