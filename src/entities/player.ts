import { Entity, newEntity } from "data/entity.js";
import { getPlayerStats } from "data/game.js";
import { StateMachine } from "data/states.js";
import { getMousePosition, getVectorLength, InputCode, isInputDown, normalizeVector, resetVector, scaleVector } from "ridder";

export function newPlayer(x: number, y: number) {
  const e = newEntity();

  e.pos.x = x;
  e.pos.y = y;

  e.stateMachineId = "player";

  e.pivot.x = 8;
  e.pivot.y = 15;
  e.spriteId = "player";
  e.shadowId = "player_shadow";
  e.shadowOffset.x = 0;
  e.shadowOffset.y = 2;

  e.stats = getPlayerStats();

  e.isPlayer = true;

  return e;
}

export function newPlayerStateMachine(): StateMachine {
  return {
    decide: (e: Entity) => {
      if (getVectorLength(e.vel)) {
        return "walk";
      }

      return "idle";
    },
    states: {
      idle: {
        update: (e) => {
          move(e);
        },
      },
      walk: {
        update: (e) => {
          move(e);
        },
      },
    },
  };
}

export function move(e: Entity) {
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

  const mouse = getMousePosition(true);

  e.isFlipped = mouse.x < e.pos.x;
}
