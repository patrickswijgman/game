import { newStats, Stats } from "stats.js";

export type Session = {
  stats: Stats;
  weaponId: string;
  armorId: string;
};

export function newSession(): Session {
  return {
    stats: newStats({
      health: 50,
      healthMax: 50,
      stamina: 100,
      staminaMax: 100,
      staminaRegen: 1,
      mana: 20,
      manaMax: 20,
      movementSpeed: 1,
    }),
    weaponId: "longsword",
    armorId: "",
  };
}
