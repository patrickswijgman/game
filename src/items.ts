import { polygon, Polygon, polygonFromRect, rect, vec, Vector } from "ridder";
import { newStats, Stats } from "stats.js";

type Attack = {
  start: number;
  windup: number;
  release: number;
  recovery: number;
};

function newAttack(start = 0, windup = 0, release = 0, recovery = 0): Attack {
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
  longsword: newItem({
    name: "Longsword",
    spriteId: "longsword",
    pivot: vec(0, 15.5),
    stats: newStats({
      damage: 8,
      strengthScaling: 1,
      dexterityScaling: 1,
      staminaCost: 30,
      stunDamage: 50,
    }),
    hitbox: polygonFromRect(0, 0, rect(12, -2, 12, 4)),
    actionId: "melee_attack",
    attackDuration: newAttack(0, 300, 150, 100),
    attackArc: newAttack(0, -90, 90, 0),
  }),

  rusty_sword: newItem({
    name: "Rusty sword",
    spriteId: "longsword",
    pivot: vec(0, 15.5),
    stats: newStats({
      damage: 6,
      strengthScaling: 1,
      dexterityScaling: 1,
      staminaCost: 30,
      stunDamage: 25,
    }),
    hitbox: polygonFromRect(0, 0, rect(12, -2, 12, 4)),
    actionId: "melee_attack",
    attackDuration: newAttack(0, 500, 200, 300),
    attackArc: newAttack(0, -90, 90, 0),
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
    attackDuration: newAttack(),
    attackArc: newAttack(),
    ...item,
  };
}

export function getItem(id: string) {
  return items[id];
}
