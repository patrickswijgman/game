import { Entity } from "entity.js";
import { getVectorLength, InputCode, isInputDown, normalizeVector, resetVector, scaleVector } from "ridder";
import { addEntity, Scene } from "scene.js";
import { StateMachine } from "state-machine.js";
import { Type } from "type.js";

export function addPlayer(scene: Scene) {
  return addEntity(scene, (e) => {
    e.type = Type.PLAYER;
    e.pos.x = 50;
    e.pos.y = 50;
    e.pivot.x = 8;
    e.pivot.y = 16;
    e.spriteId = "player";
    scene.playerId = e.id;
  });
}

export function getPlayerStateMachine(): StateMachine {
  return {
    decide: (e: Entity, scene: Scene) => {
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
    e.isFlipped = true;
  }
  if (isInputDown(InputCode.KEY_D)) {
    e.vel.x += 1;
    e.isFlipped = false;
  }

  normalizeVector(e.vel);
  scaleVector(e.vel, 1.5);
}
