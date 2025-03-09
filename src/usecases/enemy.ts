import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { addExperienceOrb } from "@/entities/xp-orb.js";
import { getAttack } from "@/usecases/attack.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { avoid, seek } from "@/usecases/steering.js";
import { getPlayer } from "@/usecases/world.js";
import { copyVector, getVectorDistance, normalizeVector, subtractVector } from "ridder";

export function moveTowardsPlayer(e: Entity, mod = 1) {
  const player = getPlayer();
  seek(e, player.position, e.stats.movementSpeed * mod);
  avoid(e, game.enemies);
}

export function lookAtPlayer(e: Entity) {
  if (isPlayerAlive()) {
    const player = getPlayer();
    copyVector(e.direction, player.position);
    subtractVector(e.direction, e.position);
    normalizeVector(e.direction);
    e.isFlipped = player.position.x < e.position.x;
  }
}

export function isPlayerInAttackRange(e: Entity) {
  if (isPlayerAlive()) {
    const player = getPlayer();
    const distance = getVectorDistance(e.position, player.position);
    const attack = getAttack(e.attackId);

    if (attack && distance < attack.stats.range) {
      return true;
    }
  }

  return false;
}

export function onEnemyDestroy(e: Entity) {
  addExperienceOrb(e.position.x, e.position.y, e.stats.experience);
}
