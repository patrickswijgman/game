import { Polygon, polygonFromRect, rect, vec, Vector } from "ridder";
import { newStats, Stats } from "stats.js";

export type Item = {
  name: string;
  description: string;
  spriteId: string;
  pivot: Vector;
  stats: Stats;
  hitbox: Polygon;
  actionId: string;
};

const items: Record<string, Item> = {
  longsword: {
    name: "Longsword",
    description: "A sword of the long variety.",
    spriteId: "item_longsword",
    pivot: vec(15.5, 30),
    stats: newStats({
      damage: 10,
      damageScalingStat: "strength",
      damageScalingFactor: 0.25,
      staminaCost: 25,
      windupDuration: 300,
      releaseDuration: 200,
      recoveryDuration: 200,
    }),
    hitbox: polygonFromRect(0, 0, rect(0, -2, 24, 4)),
    actionId: "melee_attack",
  },
};

export function getItem(id: string) {
  return items[id];
}
