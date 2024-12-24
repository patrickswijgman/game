import { newStats, Stats } from "stats.js";

export type Session = {
  stats: Stats;
  weaponId: string;
  armorId: string;
};

export function newSession(): Session {
  return {
    stats: newStats({
      stamina: 100,
      staminaMax: 100,
      movementSpeed: 1.5,
    }),
    weaponId: "longsword",
    armorId: "",
  };
}
