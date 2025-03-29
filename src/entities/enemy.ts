import { updateBreathAnimation } from "@/anims/breath.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { StateId } from "@/core/entity.js";
import { getAttack } from "@/core/attacks.js";
import { Entity } from "@/core/entity.js";
import { avoid, seek } from "@/core/steering.js";
import { getEnemiesGroup, getPlayer, isPlayerAlive } from "@/core/world.js";
import { addExperienceOrb } from "@/entities/xp-orb.js";
import { setState, updateState } from "@/core/entity.js";
import { copyVector, getVectorDistance, normalizeVector, subtractVector, tickTimer } from "ridder";

export function updateEnemy(e: Entity) {
  updateState(e, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.NONE:
      setState(e, StateId.ENEMY_IDLE);
      break;
  }
}

function onStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.ENEMY_IDLE:
      {
        updateBreathAnimation(e);
        if (isPlayerAlive()) {
          setState(e, StateId.ENEMY_SEEK);
        }
      }
      break;

    case StateId.ENEMY_SEEK:
      {
        updateWalkAnimation(e);
        if (!isPlayerAlive()) {
          setState(e, StateId.ENEMY_IDLE);
          return;
        }
        lookAtPlayer(e);
        if (isPlayerInAttackRange(e)) {
          setState(e, StateId.ENEMY_ATTACK);
          return;
        }
        moveTowardsPlayer(e);
      }
      break;

    case StateId.ENEMY_ATTACK:
      {
        const attack = getAttack(e.attackId);
        lookAtPlayer(e);
        if (tickTimer(e.stateTimer, attack.delay)) {
          setState(e, StateId.ATTACK);
        }
      }
      break;
  }
}

function onStateExit() {}

function moveTowardsPlayer(e: Entity, mod = 1) {
  const player = getPlayer();
  seek(e, player.position, e.stats.movementSpeed * mod);
  avoid(e, getEnemiesGroup());
}

function lookAtPlayer(e: Entity) {
  if (isPlayerAlive()) {
    const player = getPlayer();
    copyVector(e.direction, player.position);
    subtractVector(e.direction, e.position);
    normalizeVector(e.direction);
    e.isFlipped = player.position.x < e.position.x;
  }
}

function isPlayerInAttackRange(e: Entity) {
  if (isPlayerAlive()) {
    const player = getPlayer();
    const distance = getVectorDistance(e.position, player.position);
    const attack = getAttack(e.attackId);

    if (attack && distance < attack.stats.attackRange) {
      return true;
    }
  }

  return false;
}

export function onEnemyDestroy(e: Entity) {
  if (e.stats.experience) {
    addExperienceOrb(e.position.x, e.position.y, e.stats.experience);
  }
}
