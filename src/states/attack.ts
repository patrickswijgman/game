import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { addAttack } from "@/entities/attack.js";
import { getAttack } from "@/usecases/attack.js";
import { setState } from "@/usecases/entity.js";
import { tickTimer, tween } from "ridder";

export function onAttackEnter(e: Entity) {
  addAttack(e.sceneId, e);
}

export function onAttackUpdate(e: Entity) {
  const attack = getAttack(e.attackId);
  const duration = attack.recovery;

  tickTimer(e.tweenTimer, duration);
  e.tweenScale.x = tween(1, 1.1, duration / 2, "easeInOutSine", e.tweenTimer.elapsed);
  e.tweenScale.y = tween(1, 1.1, duration / 2, "easeInOutSine", e.tweenTimer.elapsed);

  if (tickTimer(e.stateTimer, duration)) {
    setState(e, StateId.NONE);
  }
}

export function onAttackExit() {}
