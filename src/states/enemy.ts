import { updateBreathAnimation } from "@/anims/breath.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { isPlayerInAttackRange, isPlayerTooFarAway, isPlayerWithinRange, lookAtPlayer, moveTowardsPlayer } from "@/usecases/enemy.js";
import { setState } from "@/usecases/entity.js";
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
        if (isPlayerWithinRange(e)) {
          setState(e, StateId.ENEMY_SEEK);
        }
      }
      break;

    case StateId.ENEMY_SEEK:
      {
        updateWalkAnimation(e);
        lookAtPlayer(e);
        if (isPlayerTooFarAway(e)) {
          setState(e, StateId.ENEMY_IDLE);
          return;
        }
        if (isPlayerInAttackRange(e)) {
          setState(e, StateId.ENEMY_DELAY);
          return;
        }
        moveTowardsPlayer(e);
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

export function onEnemyStateExit() {}
