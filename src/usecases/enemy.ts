import { Entity } from "@/data/entity.js";
import { addExperienceOrb } from "@/entities/xp-orb.js";

export function onEnemyDestroy(e: Entity) {
  addExperienceOrb(e.position.x, e.position.y, e.stats.experience);
}
