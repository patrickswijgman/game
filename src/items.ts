import { vec, Vector } from "ridder";
import { newStats, Stats } from "stats.js";

export type Item = {
  name: string;
  description: string;
  spriteId: string;
  pivot: Vector;
  stats: Stats;
  actionId: string;
};

const items: Record<string, Item> = {
  longsword: {
    name: "Longsword",
    description: "A sword of the long variety.",
    spriteId: "item_longsword",
    pivot: vec(15.5, 15.5),
    stats: newStats({
      damage: 10,
      damageScalingStat: "strength",
      damageScalingFactor: 0.25,
      staminaCost: 10,
      windupDuration: 500,
      releaseDuration: 200,
      recoveryDuration: 300,
    }),
    actionId: "melee_attack",
  },
};

export function getItem(id: string) {
  return items[id];
}
