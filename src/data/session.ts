import { newStats, Stats } from "data/stats.js";

export type Session = {
  stats: Stats;
  weaponId: string;
  armorId: string;
};

export function newSession(): Session {
  return {
    stats: newStats({
      movementSpeed: 1.5,
    }),
    weaponId: "longsword",
    armorId: "",
  };
}
