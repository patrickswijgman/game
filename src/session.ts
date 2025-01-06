import { DungeonMap, newDungeonMap } from "map.js";
import { uuid } from "ridder";
import { newSheet, Sheet } from "sheet.js";

export type Session = {
  id: string;
  sheet: Sheet;
  map: DungeonMap;
};

export function newSession(): Session {
  return {
    id: uuid(),
    sheet: newSheet({
      stats: {
        health: 50,
        healthMax: 50,
        stamina: 100,
        staminaMax: 100,
        staminaRegen: 1,
        stunMax: 100,
        constitution: 0,
        endurance: 0,
        strength: 0,
        dexterity: 3,
        intelligence: 0,
        movementSpeed: 1.5,
      },
      weaponId: "crossbow_light",
      armorId: "clothes",
    }),
    map: newDungeonMap(),
  };
}
