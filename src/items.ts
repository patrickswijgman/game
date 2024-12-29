import { Polygon, polygonFromRect, rect, vec, Vector } from "ridder";
import { newStats, Stats } from "stats.js";

type ArcTuple = [start: number, windup: number, release: number, recovery: number];

export type Item = {
  name: string;
  description: string;
  spriteId: string;
  pivot: Vector;
  stats: Stats;
  hitbox: Polygon;
  actionId: string;
  windupDuration: number;
  releaseDuration: number;
  recoveryDuration: number;
  arc: ArcTuple;
};

const items: Record<string, Item> = {
  longsword: {
    name: "Longsword",
    description: "A sword of the long variety.",
    spriteId: "item_longsword",
    pivot: vec(5, 15.5),
    stats: newStats({
      damage: 10,
      damageScalingStat: "strength",
      damageScalingFactor: 0.25,
      staminaCost: 25,
    }),
    hitbox: polygonFromRect(0, 0, rect(8, -2, 12, 4)),
    actionId: "melee_attack",
    windupDuration: 300,
    releaseDuration: 200,
    recoveryDuration: 200,
    arc: [0, -90, 90, 0],
  },
};

export function getItem(id: string) {
  return items[id];
}
