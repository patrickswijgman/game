import { addAction, newAction } from "data/actions.js";
import { getCurrentRun } from "data/game.js";
import { getItem } from "data/items.js";
import { addMeleeAttack } from "entities/melee-attack.js";

export function loadMeleeAttackAction() {
  addAction(
    "melee_attack",
    newAction({
      name: "Melee Attack",
      description: "Attack an enemy in melee range.",
      enter: (e, scene) => {
        const run = getCurrentRun();
        const weapon = getItem(run.weaponId);
        addMeleeAttack(scene, e.pos.x, e.pos.y, weapon);
      },
      update: () => true,
    }),
  );
}
