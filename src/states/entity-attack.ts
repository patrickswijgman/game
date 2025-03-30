import { getAttack } from "@/core/attacks.js";
import { AnimationId, Entity, resetState, setAnimation } from "@/core/entity.js";
import { addAttack } from "@/entities/attack.js";
import { tickTimer } from "ridder";

export function onAttackStateEnter(e: Entity) {
  const attack = getAttack(e.attackId);
  setAnimation(e, AnimationId.ATTACK, attack.recovery);
  addAttack(e);
}

export function onAttackStateUpdate(e: Entity) {
  const attack = getAttack(e.attackId);
  if (tickTimer(e.stateTimer, attack.recovery)) {
    resetState(e);
  }
}
