import { Entity, resetAnimation, StateId } from "@/core/entity.js";
import { onAttackStateEnter, onAttackStateUpdate } from "@/states/entity-attack.js";
import { onStaggerStateEnter, onStaggerStateExit, onStaggerStateUpdate } from "@/states/entity-stagger.js";
import { resetTimer, resetVector } from "ridder";

export function onEntityStateEnter(e: Entity, onEnter: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      onAttackStateEnter(e);
      break;
    case StateId.STAGGER:
      onStaggerStateEnter(e);
      break;
  }
  onEnter(e);
}

export function onEntityStateUpdate(e: Entity, onUpdate: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      onAttackStateUpdate(e);
      break;
    case StateId.STAGGER:
      onStaggerStateUpdate(e);
      break;
  }
  onUpdate(e);
}

export function onEntityStateExit(e: Entity, onExit: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.STAGGER:
      onStaggerStateExit(e);
      break;
  }
  resetVector(e.velocity);
  resetTimer(e.stateTimer);
  resetAnimation(e);
  onExit(e);
}
