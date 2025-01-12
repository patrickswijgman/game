import { newAttack, newItem } from "items.js";
import { vec } from "ridder";
import { newStats } from "stats.js";

export function newLightCrossbow() {
  return newItem({
    name: "Light Crossbow",
    spriteId: "crossbow",
    pivot: vec(19, 15.5),
    stats: newStats({
      damage: 8,
      dexterityScaling: 1,
      staminaCost: 30,
      range: 150,
    }),
    actionId: "ranged_attack",
    attackDuration: newAttack(0, 400, 100, 250),
  });
}
