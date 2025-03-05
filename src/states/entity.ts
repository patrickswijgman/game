import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { onAttackEnter, onAttackExit, onAttackUpdate } from "@/states/entity-attack.js";
import { onStaggerEnter, onStaggerExit, onStaggerUpdate } from "@/states/entity-stagger.js";
import { resetEntity } from "@/usecases/entity.js";

export function onEntityStateEnter(e: Entity, onEnter: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      onAttackEnter(e);
      break;
    case StateId.STAGGER:
      onStaggerEnter(e);
      break;
  }
  onEnter(e);
}

export function onEntityStateUpdate(e: Entity, onUpdate: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      onAttackUpdate(e);
      break;
    case StateId.STAGGER:
      onStaggerUpdate(e);
      break;
  }
  onUpdate(e);
}

export function onEntityStateExit(e: Entity, onExit: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      onAttackExit();
      break;
    case StateId.STAGGER:
      onStaggerExit(e);
      break;
  }
  resetEntity(e);
  onExit(e);
}
