import { Entity } from "data/entity.js";
import { addState, newState } from "data/states.js";
import { getMousePosition, InputCode, isInputDown, normalizeVector, resetVector, scaleVector } from "ridder";

export function loadPlayerStates() {
  addState(
    "player_idle",
    newState({
      update: (e) => {
        move(e);
        look(e);
      },
    }),
  );

  addState(
    "player_action",
    newState({
      update: (e) => {},
    }),
  );
}

function move(e: Entity) {
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
    e.nextStateId = "player_action";
  }
}

function look(e: Entity) {
  const mouse = getMousePosition(true);
  e.isFlipped = mouse.x < e.pos.x;
}
