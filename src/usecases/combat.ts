import { XP_PER_LEVEL } from "@/consts/global.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { getPlayer, updateUpgradeChoices } from "@/data/world.js";
import { addCombatText } from "@/entities/combat-text.js";
import { setState } from "@/usecases/entity.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { clampStats } from "@/usecases/stats.js";
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
  if (isPlayerAlive()) {
    const player = getPlayer();

    player.stats.experience += xp;

    if (player.stats.experience >= player.stats.experienceMax) {
      player.stats.level += 1;
      player.stats.experience = 0;
      player.stats.experienceMax = player.stats.level * XP_PER_LEVEL;
      updateUpgradeChoices();
    }
  }
}
