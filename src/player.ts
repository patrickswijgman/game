import { Entity, newEntity } from "entity.js";
import { InputCode, isInputDown, normalizeVector, resetVector, scaleVector } from "ridder";
import { Scene } from "scene.js";
import { StateRecord } from "states.js";
import { Type } from "type.js";

export function newPlayer(scene: Scene) {
  return newEntity((e) => {
    e.type = Type.PLAYER;
    e.pos.x = 50;
    e.pos.y = 50;
    e.pivot.x = 8;
    e.pivot.y = 16;
    e.spriteId = "player";
    e.nextState = "idle";
    scene.playerId = e.id;
    return scene;
  });
}

export function getPlayerStates(): StateRecord {
  return {
    idle: {
      update: move,
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
