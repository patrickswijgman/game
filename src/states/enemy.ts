import { getAttack } from "@/core/attacks.js";
import { AnimationId, Entity, setAnimation, setState, StateId } from "@/core/entity.js";
import { avoid, seek } from "@/core/steering.js";
import { getEnemiesGroup, getPlayer } from "@/core/world.js";
import { copyVector, getVectorDistance, normalizeVector, subtractVector, tickTimer } from "ridder";

export function onEnemyStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.ENEMY_SEEK:
      setAnimation(e, AnimationId.WALK, 100);
      break;
  }
}

export function onEnemyStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.ENEMY_SEEK:
      {
        lookAtPlayer(e);
        moveTowardsPlayer(e);
        if (isPlayerInAttackRange(e)) {
          setState(e, StateId.ENEMY_ATTACK);
        }
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

export function onEnemyStateExit() {}

function moveTowardsPlayer(e: Entity, mod = 1) {
  const player = getPlayer();
  seek(e, player.position, e.stats.movementSpeed * mod);
  avoid(e, getEnemiesGroup());
}

function lookAtPlayer(e: Entity) {
  const player = getPlayer();
  copyVector(e.direction, player.position);
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);
  e.isFlipped = player.position.x < e.position.x;
}

function isPlayerInAttackRange(e: Entity) {
  const player = getPlayer();
  const distance = getVectorDistance(e.position, player.position);
  const attack = getAttack(e.attackId);
  return attack && distance < attack.stats.attackRange;
}
