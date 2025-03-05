import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { setState } from "@/usecases/entity.js";
import { clampStats } from "@/usecases/stats.js";
import { roll } from "ridder";

export function dealDamage(attack: Entity, target: Entity) {
  let damage = Math.max(1, attack.stats.damage - target.stats.armor);
  let isCrit = false;

  if (roll(attack.stats.critChance)) {
    damage *= attack.stats.critDamage;
    isCrit = true;
  }

  target.stats.health -= damage;
  clampStats(target.stats);

  setState(target, StateId.STAGGER);

  //addToCombatLog(target, isCrit ? `${damage}!` : damage.toString());
}
