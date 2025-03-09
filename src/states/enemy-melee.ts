import { updateBreathAnimation } from "@/anims/breath.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { isPlayerInAttackRange, lookAtPlayer, moveTowardsPlayer } from "@/states/enemy.js";
import { getAttack } from "@/usecases/attack.js";
import { setState } from "@/usecases/entity.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { tickTimer } from "ridder";

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

export function onEnemyStateExit() {}
