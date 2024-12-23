import { newStats, Stats } from "data/stats.js";

export type Run = {
  stats: Stats;
  weaponId: string;
  armorId: string;
};

export function newRun(): Run {
  return {
    stats: newStats({
      movementSpeed: 1.5,
    }),
    weaponId: "",
    armorId: "",
  };
}
