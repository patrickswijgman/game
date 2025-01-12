import { newAttack, newItem } from "items.js";
import { polygonFromRect, rect, vec } from "ridder";
import { newStats } from "stats.js";

export function newWornLongsword() {
  return newItem({
    name: "Worn Longsword",
    spriteId: "longsword",
    pivot: vec(11, 15.5),
    stats: newStats({
      damage: 6,
      strengthScaling: 1,
      dexterityScaling: 1,
      staminaCost: 30,
      range: 20,
    }),
    hitbox: polygonFromRect(0, 0, rect(2, -2, 12, 4)),
    actionId: "melee_attack",
    attackDuration: newAttack(0, 600, 150, 200),
    attackArc: newAttack(0, -90, 90, 45),
  });
}
