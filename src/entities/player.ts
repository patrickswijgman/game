import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { SpriteId } from "@/enums/assets.js";
import { SceneId } from "@/enums/scene.js";
import { Type } from "@/enums/type.js";
import { addEntity, setShadow, setSprite } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { InputCode, isInputDown, normalizeVector, resetVector, scaleVector, setCameraPosition } from "ridder";

export function addPlayer(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.PLAYER, sceneId, x, y);
  setSprite(e, SpriteId.PLAYER, 8, 15);
  setShadow(e, SpriteId.PLAYER_SHADOW, 8, 13);
  e.isPlayer = true;
  e.sheet = game.sheet;
  e.isPhysicsEnabled = true;

  const scene = getScene(e.sceneId);
  scene.playerId = e.id;
  setCameraPosition(scene.camera, e.position.x, e.position.y);

  return e;
}

export function updatePlayer(e: Entity) {
  resetVector(e.velocity);

  if (isInputDown(InputCode.KEY_LEFT) || isInputDown(InputCode.KEY_A)) {
    e.velocity.x -= 1;
    e.isFlipped = true;
  }
  if (isInputDown(InputCode.KEY_RIGHT) || isInputDown(InputCode.KEY_D)) {
    e.velocity.x += 1;
    e.isFlipped = false;
  }
  if (isInputDown(InputCode.KEY_UP) || isInputDown(InputCode.KEY_W)) {
    e.velocity.y -= 1;
  }
  if (isInputDown(InputCode.KEY_DOWN) || isInputDown(InputCode.KEY_S)) {
    e.velocity.y += 1;
  }

  normalizeVector(e.velocity);
  scaleVector(e.velocity, 1);
}
