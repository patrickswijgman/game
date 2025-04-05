import { Attack, getAttack } from "@/core/attacks.js";
import { AnimationId, Entity, resetState, setAnimation } from "@/core/entity.js";
import { addAttack } from "@/entities/attack.js";
import { tickTimer } from "ridder";

export function onAttackStateEnter(e: Entity) {
  const attack = getAttack(e.attackId);
  setAnimation(e, AnimationId.ATTACK, getDuration(e, attack));
  addAttack(e);
}

export function onAttackStateUpdate(e: Entity) {
  const attack = getAttack(e.attackId);
  if (tickTimer(e.stateTimer, getDuration(e, attack))) {
    resetState(e);
  }
}

function getDuration(e: Entity, attack: Attack) {
  return attack.recovery / (1 + e.stats.attackSpeed);
}
