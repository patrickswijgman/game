import { updateAttackAnimation } from "@/anims/attack.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { addAttack } from "@/entities/attack.js";
import { getAttack } from "@/usecases/attack.js";
import { setState } from "@/usecases/entity.js";
import { tickTimer } from "ridder";

export function onAttackEnter(e: Entity) {
  addAttack(e);
}

export function onAttackUpdate(e: Entity) {
  const attack = getAttack(e.attackId);
  const duration = attack.recovery;

  updateAttackAnimation(e, duration);

  if (tickTimer(e.stateTimer, duration)) {
    setState(e, StateId.NONE);
  }
}

export function onAttackExit() {}
