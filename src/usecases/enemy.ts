import { entities } from "@/data/entities.js";
import { Entity } from "@/data/entity.js";
import { world } from "@/data/world.js";
import { getAttack } from "@/usecases/attack.js";
import { getEntity } from "@/usecases/entity.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { avoid, seek } from "@/usecases/steering.js";
import { copyVector, getVectorDistance, normalizeVector, subtractVector } from "ridder";

export function moveTowardsPlayer(e: Entity, mod = 1) {
  const player = getEntity(world.playerId);
  seek(e, player.position, e.stats.movementSpeed * mod);
  avoid(e, entities.enemies);
}

export function lookAtPlayer(e: Entity) {
  if (isPlayerAlive()) {
    const player = getEntity(world.playerId);
    copyVector(e.direction, player.position);
    subtractVector(e.direction, e.position);
    normalizeVector(e.direction);
    e.isFlipped = player.position.x < e.position.x;
  }
}

export function isPlayerInAttackRange(e: Entity) {
  if (isPlayerAlive()) {
    const player = getEntity(world.playerId);
    const distance = getVectorDistance(e.position, player.position);
    const attack = getAttack(e.attackId);

    if (attack && distance < attack.stats.range) {
      return true;
    }
  }

  return false;
}
