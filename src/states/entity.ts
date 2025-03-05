import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { onAttackEnter, onAttackExit, onAttackUpdate } from "@/states/attack.js";
import { onStaggerEnter, onStaggerExit, onStaggerUpdate } from "@/states/stagger.js";
import { resetEntity } from "@/usecases/entity.js";

export function onEntityStateEnter(e: Entity, onEnter: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      onAttackEnter(e);
      break;
    case StateId.STAGGER:
      onStaggerEnter(e);
      break;
    default:
      onEnter(e);
      break;
  }
}

export function onEntityStateUpdate(e: Entity, onUpdate: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      onAttackUpdate(e);
      break;
    case StateId.STAGGER:
      onStaggerUpdate(e);
      break;
    default:
      onUpdate(e);
      break;
  }
}

export function onEntityStateExit(e: Entity, onExit: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      onAttackExit();
      break;
    case StateId.STAGGER:
      onStaggerExit(e);
      break;
    default:
      onExit(e);
      break;
  }

  resetEntity(e);
}
