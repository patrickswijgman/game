import { MAX_LEVEL, XP_PER_LEVEL } from "@/consts.js";
import { Entity, setState, StateId } from "@/core/entity.js";
import { clampStats } from "@/core/stats.js";
import { chooseUpgrade, getPlayer } from "@/core/world.js";
import { addCombatText } from "@/entities/combat-text.js";
import { roll } from "ridder";

export function dealDamage(attack: Entity, target: Entity) {
  let damage = attack.stats.damage;
  let isCrit = false;

  if (roll(attack.stats.critChance)) {
    damage *= attack.stats.critDamage;
    isCrit = true;
  }

  damage = Math.ceil(damage);

  target.stats.health -= damage;
  clampStats(target.stats);
  setState(target, StateId.STAGGER);

  addCombatText(target, `${damage}${isCrit ? "!" : ""}`);
}

export function addExperience(xp: number) {
  const player = getPlayer();

  player.stats.experience += xp;

  if (player.stats.experience >= player.stats.experienceMax && player.stats.level < MAX_LEVEL) {
    player.stats.level += 1;
    player.stats.experience = 0;
    player.stats.experienceMax = player.stats.level * XP_PER_LEVEL;
    chooseUpgrade();
  }
}
