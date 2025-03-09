import { XP_PER_LEVEL } from "@/consts/player.js";
import { StateId } from "@/consts/state.js";
import { UPGRADES_CHOICE_AMOUNT } from "@/consts/world.js";
import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { addCombatText } from "@/entities/combat-text.js";
import { setState } from "@/usecases/entity.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { clampStats } from "@/usecases/stats.js";
import { getPlayer } from "@/usecases/world.js";
import { pick, remove, roll } from "ridder";

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

      // TODO: Put into world usecase.
      for (let i = 0; i < UPGRADES_CHOICE_AMOUNT; i++) {
        const upgrade = pick(game.upgrades);

        if (upgrade) {
          remove(game.upgrades, upgrade);
          game.upgradeChoices.push(upgrade);
          // TODO: Add not-chosen upgrades back into the pool.
          //       Prevents that the exact same upgrade is rolled twice.
          //       However if there are two damage upgrades, then it is possible to get two damage upgrade choices.
        }
      }

      // TODO: Go to upgrade choose game state.
    }
  }
}
