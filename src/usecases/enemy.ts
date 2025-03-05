import { Entity } from "@/data/entity.js";
import { getAttack } from "@/usecases/attack.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
import { seek } from "@/usecases/steering.js";
import { copyVector, getVectorDistance, normalizeVector, subtractVector } from "ridder";

export function moveTowardsPlayer(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);
  seek(e, player.position, 0.5 * e.stats.movementSpeed);
}

export function isPlayerWithinRange(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);

  if (player.stats.health) {
    return getVectorDistance(e.position, player.position) < 100;
  }

  return false;
}

export function isPlayerInAttackRange(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);

  if (player.stats.health) {
    const distance = getVectorDistance(e.position, player.position);
    const attack = getAttack(e.attackId);

    if (attack && distance < attack.range) {
      return true;
    }
  }

  return false;
}

export function isPlayerTooFarAway(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);

  if (player.stats.health) {
    return getVectorDistance(e.position, player.position) > 200;
  }

  return false;
}

export function lookAtPlayer(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);

  copyVector(e.direction, player.position);
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);

  e.isFlipped = player.position.x < e.position.x;
}
