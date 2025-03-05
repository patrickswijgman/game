import { Entity } from "@/data/entity.js";
import { getAttack } from "@/usecases/attack.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
import { avoid, seek } from "@/usecases/steering.js";
import { copyVector, getVectorDistance, normalizeVector, subtractVector } from "ridder";

export function moveTowardsPlayer(e: Entity, mod = 1) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);
  seek(e, player.position, 0.5 * e.stats.movementSpeed * mod);
  avoid(e, scene.enemies);
}

export function lookAtPlayer(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);

  if (isPlayerAlive(e)) {
    copyVector(e.direction, player.position);
    subtractVector(e.direction, e.position);
    normalizeVector(e.direction);
    e.isFlipped = player.position.x < e.position.x;
  }
}

export function isPlayerInAttackRange(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);

  if (isPlayerAlive(e)) {
    const distance = getVectorDistance(e.position, player.position);
    const attack = getAttack(e.attackId);

    if (attack && distance < attack.range) {
      return true;
    }
  }

  return false;
}

export function isPlayerAlive(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);
  return player.isPlayer && player.stats.health;
}
