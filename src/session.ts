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
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        movementSpeed: 1.5,
      },
      weaponId: "crossbow_light",
      armorId: "clothes",
    }),
    map: newDungeonMap(),
  };
}
