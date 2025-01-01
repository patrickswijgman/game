import { DungeonMap, newDungeonMap } from "map.js";
import { uuid } from "ridder";
import { newStats, Stats } from "stats.js";

export type Session = {
  id: string;
  stats: Stats;
  weaponId: string;
  armorId: string;
  map: DungeonMap;
};

export function newSession(): Session {
  return {
    id: uuid(),
    stats: newStats({
      health: 50,
      healthMax: 50,
      stamina: 100,
      staminaMax: 100,
      staminaRegen: 1,
      strength: 10,
      dexterity: 10,
      intelligence: 10,
      movementSpeed: 1.5,
    }),
    weaponId: "longsword",
    armorId: "",
    map: newDungeonMap(),
  };
}
