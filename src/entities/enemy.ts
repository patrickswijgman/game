import { getAttack } from "@/core/attacks.js";
import { addEntity, AnimationId, Entity, initState, setAnimation, setState, StateId, Type, updateState } from "@/core/entity.js";
import { avoid, seek } from "@/core/steering.js";
import { addToEnemiesGroup, getEnemiesGroup, getPlayer } from "@/core/world.js";
import { addExperienceOrb } from "@/entities/xp-orb.js";
import { copyVector, getVectorDistance, normalizeVector, subtractVector, tickTimer } from "ridder";

export function addEnemy(x: number, y: number) {
  const e = addEntity(Type.ENEMY, x, y);

  e.isEnemy = true;

  addToEnemiesGroup(e.id);

  initState(e, StateId.ENEMY_SEEK);

  return e;
}

export function updateEnemy(e: Entity) {
  updateState(e, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.ENEMY_SEEK:
      setAnimation(e, AnimationId.WALK, 100);
      break;
  }
}

function onStateUpdate(e: Entity) {
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

function onStateExit() {}

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

export function onEnemyDestroy(e: Entity) {
  if (e.stats.experience) {
    addExperienceOrb(e.position.x, e.position.y, e.stats.experience);
  }
}
