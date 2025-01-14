import { SpriteId } from "@/assets.js";
import { Entity, setShadow, setSprite } from "@/entity.js";
import { getScene } from "@/game.js";
import { InputCode, isInputDown, normalizeVector, resetVector, scaleVector, setCameraPosition } from "ridder";

export function setupPlayer(e: Entity) {
  const scene = getScene(e.sceneId);
  setSprite(e, SpriteId.PLAYER, 8, 15);
  setShadow(e, SpriteId.PLAYER_SHADOW, 0, 2);
  e.isPlayer = true;
  e.isPhysicsEnabled = true;
  setCameraPosition(scene.camera, e.position.x, e.position.y);
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
