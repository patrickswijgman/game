import { AnimationId, Entity, resetState, setAnimation } from "@/core/entity.js";
import { tickTimer } from "ridder";

export function onStaggerStateEnter(e: Entity) {
  setAnimation(e, AnimationId.STAGGER, 150);
  e.isFlashing = true;
}

export function onStaggerStateUpdate(e: Entity) {
  if (tickTimer(e.stateTimer, 150)) {
    resetState(e);
  }
}

export function onStaggerStateExit(e: Entity) {
  e.isFlashing = false;
}
