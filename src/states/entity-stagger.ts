import { updateStaggerAnimation } from "@/anims/stagger.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { setState } from "@/usecases/entity.js";
import { tickTimer } from "ridder";

export function onStaggerEnter(e: Entity) {
  e.isFlashing = true;
}

export function onStaggerUpdate(e: Entity) {
  const duration = 150;

  updateStaggerAnimation(e, duration);

  if (tickTimer(e.stateTimer, duration)) {
    setState(e, StateId.NONE);
  }
}

export function onStaggerExit(e: Entity) {
  e.isFlashing = false;
}
