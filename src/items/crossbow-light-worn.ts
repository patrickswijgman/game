import { newAttack, newItem } from "items.js";
import { vec } from "ridder";
import { newStats } from "stats.js";

export function newWornLightCrossbow() {
  return newItem({
    name: "Worn Light Crossbow",
    spriteId: "crossbow",
    pivot: vec(19, 15.5),
    stats: newStats({
      damage: 6,
      dexterityScaling: 1,
      staminaCost: 30,
      stunDamage: 50,
      range: 100,
    }),
    actionId: "ranged_attack",
    attackDuration: newAttack(0, 750, 200, 500),
  });
}
