import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { setState } from "@/usecases/entity.js";
import { tickTimer, tween } from "ridder";

export function onStaggerEnter(e: Entity) {
  e.isFlashing = true;
}

export function onStaggerUpdate(e: Entity) {
  tickTimer(e.tweenTimer, 150);
  e.tweenScale.x = tween(1, 1.5, 75, "easeInOutSine", e.tweenTimer.elapsed);
  e.tweenScale.y = tween(1, 0.75, 75, "easeInOutSine", e.tweenTimer.elapsed);

  if (tickTimer(e.stateTimer, 150)) {
    setState(e, StateId.NONE);
  }
}

export function onStaggerExit(e: Entity) {
  e.isFlashing = false;
}
