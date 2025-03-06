import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { addCombatText } from "@/entities/combat-text.js";
import { setState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
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

  const scene = getScene(attack.sceneId);

  addCombatText(scene.id, target, `${damage}${isCrit ? "!" : ""}`);
}
