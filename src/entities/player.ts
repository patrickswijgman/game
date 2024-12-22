import { Entity } from "entity.js";
import { getMousePosition, getVectorLength, InputCode, isInputDown, normalizeVector, resetVector, scaleVector, setCameraPosition } from "ridder";
import { addEntity, Scene } from "scene.js";
import { addStateMachine, StateMachine } from "states.js";
import { Type } from "type.js";

export function addPlayer(scene: Scene, x: number, y: number) {
  return addEntity(scene, (e) => {
    e.type = Type.PLAYER;
    e.pos.x = x;
    e.pos.y = y;

    e.stateMachineId = "player";

    e.pivot.x = 8;
    e.pivot.y = 15;
    e.spriteId = "player";
    e.shadowId = "player_shadow";
    e.shadowOffset.x = 0;
    e.shadowOffset.y = 2;

    e.stats.health = 1;
    e.stats.healthMax = 1;
    e.stats.damage = 1;
    e.stats.damageScaling = 1;
    e.stats.movementSpeed = 1.5;

    scene.playerId = e.id;

    setCameraPosition(x, y);
  });
}

const enum State {
  IDLE = "idle",
  WALK = "walk",
}

export function addPlayerStateMachine() {
  addStateMachine("player", {
    decide: (e: Entity) => {
      if (getVectorLength(e.vel)) {
        return State.WALK;
      }

      return State.IDLE;
    },
    states: {
      [State.IDLE]: {
        update: (e) => {
          move(e);
        },
      },
      [State.WALK]: {
        update: (e) => {
          move(e);
        },
      },
    },
  });
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
