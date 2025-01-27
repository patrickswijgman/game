import { updateBreathAnimation } from "@/anims/breath.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { Entity } from "@/data/entity.js";
import { StateId } from "@/enums/state.js";
import { getAttack } from "@/usecases/attack.js";
import { setState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
import { seek } from "@/usecases/steering.js";
import { copyVector, getVectorDistance, normalizeVector, subtractVector, tickTimer } from "ridder";

export function onEnemyStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.NONE:
      setState(e, StateId.ENEMY_IDLE);
      break;
  }
}

export function onEnemyStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.ENEMY_IDLE:
      {
        updateBreathAnimation(e);
        if (isPlayerWithinRange(e)) {
          setState(e, StateId.ENEMY_SEEK);
        }
      }
      break;

    case StateId.ENEMY_SEEK:
      {
        updateWalkAnimation(e);
        lookAtPlayer(e);
        if (isPlayerInAttackRange(e)) {
          setState(e, StateId.ENEMY_DELAY);
        } else {
          moveTowardsPlayer(e);
        }
      }
      break;

    case StateId.ENEMY_DELAY:
      {
        lookAtPlayer(e);
        if (tickTimer(e.stateTimer, 500)) {
          setState(e, StateId.ATTACK);
        }
      }
      break;
  }
}

export function onEnemyStateExit(e: Entity) {}

function moveTowardsPlayer(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);
  seek(e, player.position, e.sheet.stats.movementSpeed);
}

function isPlayerWithinRange(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);

  if (player.sheet.stats.health) {
    return getVectorDistance(e.position, player.position) < 100;
  }

  return false;
}

function isPlayerInAttackRange(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);

  if (player.sheet.stats.health) {
    const distance = getVectorDistance(e.position, player.position);
    const attack = getAttack(e.sheet.weaponId);

    if (attack && distance < attack.range) {
      e.attackId = e.sheet.weaponId;
      return true;
    }
  }

  return false;
}

function lookAtPlayer(e: Entity) {
  const scene = getScene(e.sceneId);
  const player = getEntity(scene, scene.playerId);
  copyVector(e.direction, player.position);
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);
  e.isFlipped = player.position.x < e.position.x;
}
