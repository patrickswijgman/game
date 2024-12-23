import { getAction } from "data/actions.js";
import { switchState } from "data/entity.js";
import { getCurrentRun } from "data/game.js";
import { getItem } from "data/items.js";
import { addState, newState } from "data/states.js";
import { getMousePosition, InputCode, isInputDown, normalizeVector, resetVector, scaleVector } from "ridder";

export function loadPlayerStates() {
  addState(
    "player_idle",
    newState({
      update: (e) => {
        resetVector(e.vel);

        if (isInputDown(InputCode.KEY_W)) {
          e.vel.y -= 1;
        }
        if (isInputDown(InputCode.KEY_S)) {
          e.vel.y += 1;
        }
        if (isInputDown(InputCode.KEY_A)) {
          e.vel.x -= 1;
        }
        if (isInputDown(InputCode.KEY_D)) {
          e.vel.x += 1;
        }

        normalizeVector(e.vel);
        scaleVector(e.vel, e.stats.movementSpeed);

        if (isInputDown(InputCode.MOUSE_LEFT)) {
          const run = getCurrentRun();
          const weapon = getItem(run.weaponId);
          e.actionId = weapon.actionId;
          switchState(e, "player_action");
        }

        const mouse = getMousePosition(true);

        e.isFlipped = mouse.x < e.pos.x;
      },
      exit: (e) => {
        resetVector(e.vel);
      },
    }),
  );

  addState(
    "player_action",
    newState({
      enter: (e, scene) => {
        const action = getAction(e.actionId);

        if (action && action.enter) {
          action.enter(e, scene, action);
        }
      },
      update: (e, scene) => {
        const action = getAction(e.actionId);

        if (action && action.update) {
          if (action.update(e, scene, action)) {
            switchState(e, "player_idle");
          }
        }
      },
      exit: (e, scene) => {
        const action = getAction(e.actionId);

        if (action && action.exit) {
          action.exit(e, scene, action);
        }
      },
    }),
  );
}
