import { Entity } from "@/data/entity.js";
import { addExperienceOrb } from "@/entities/xp-orb.js";

export function onEnemyDestroy(e: Entity) {
  if (e.stats.experience) {
    addExperienceOrb(e.position.x, e.position.y, e.stats.experience);
  }
}
