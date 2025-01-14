import { newAttack, newItem } from "items.js";
import { polygonFromRect, rect, vec } from "ridder";
import { newStats } from "stats.js";

export function newLongsword() {
  return newItem({
    name: "Longsword",
    spriteId: "longsword",
    pivot: vec(11, 15.5),
    stats: newStats({
      damage: 8,
      strengthScaling: 1,
      dexterityScaling: 1,
      staminaCost: 30,
      range: 20,
    }),
    hitbox: polygonFromRect(0, 0, rect(2, -2, 12, 4)),
    actionId: "melee_attack",
    attackDuration: newAttack(0, 300, 150, 100),
    attackArc: newAttack(0, -90, 90, 45),
  });
}
