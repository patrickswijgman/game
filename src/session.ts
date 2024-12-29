import { DungeonMap, newDungeonMap } from "map.js";
import { newStats, Stats } from "stats.js";

export type Session = {
  stats: Stats;
  weaponId: string;
  armorId: string;
  map: DungeonMap;
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
      movementSpeed: 1.5,
    }),
    weaponId: "longsword",
    armorId: "",
    map: newDungeonMap(),
  };
}
