import { switchState } from "data/entity.js";
import { destroyEntity } from "data/scene.js";
import { addState, newState } from "data/states.js";
import { resetTimer, tickTimer } from "ridder";

export function loadMeleeAttackActionStates() {
  addState(
    "melee_attack_windup",
    newState({
      enter: (e) => {
        resetTimer(e.stateTimer);
      },
      update: (e) => {
        if (tickTimer(e.stateTimer, e.stats.windupDuration)) {
          switchState(e, "melee_attack_release");
        }
      },
      exit: (e, scene) => {
        destroyEntity(scene, e);
      },
    }),
  );
}
