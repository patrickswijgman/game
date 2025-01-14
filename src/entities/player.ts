import { Entity, EntityType } from "@/entity.js";
import { addEntity, Scene } from "@/scene.js";
import { InputCode, isInputDown, normalizeVector, resetVector, scaleVector, setVector } from "ridder";

export function newPlayer(scene: Scene, x: number, y: number) {
  const e = addEntity(scene);

  e.type = EntityType.PLAYER;

  setVector(e.position, x, y);

  e.spriteId = "player";
  setVector(e.pivot, 8, 15);

  return e;
}

export function updatePlayer(e: Entity) {
  resetVector(e.velocity);

  if (isInputDown(InputCode.KEY_LEFT)) {
    e.velocity.x -= 1;
    e.isFlipped = true;
  }
  if (isInputDown(InputCode.KEY_RIGHT)) {
    e.velocity.x += 1;
    e.isFlipped = false;
  }
  if (isInputDown(InputCode.KEY_UP)) {
    e.velocity.y -= 1;
  }
  if (isInputDown(InputCode.KEY_DOWN)) {
    e.velocity.y += 1;
  }

  normalizeVector(e.velocity);
  scaleVector(e.velocity, 1);
}
