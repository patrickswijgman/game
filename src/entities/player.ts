import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { SpriteId } from "@/enums/assets.js";
import { SceneId } from "@/enums/scene.js";
import { StateId } from "@/enums/state.js";
import { Type } from "@/enums/type.js";
import { onPlayerStateEnter, onPlayerStateExit, onPlayerStateUpdate } from "@/states/player.js";
import { addEntity, setCenter, setFlash, setHitbox, setShadow, setSprite, setState, updateState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { initSheet } from "@/usecases/sheet.js";
import { setCameraPosition, setVector } from "ridder";

export function addPlayer(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.PLAYER, sceneId, x, y);
  setSprite(e, SpriteId.PLAYER, 8, 15);
  setShadow(e, SpriteId.PLAYER_SHADOW, 8, 13);
  setFlash(e, SpriteId.PLAYER_FLASH);
  setHitbox(e, -3, -8, 6, 8);
  setCenter(e, 0, -3);
  setVector(e.direction, 1, 0);

  e.sheet = game.sheet;
  initSheet(e.sheet);

  e.isPlayer = true;
  e.isPhysicsEnabled = true;
  e.isLogEnabled = true;

  setState(e, StateId.PLAYER_IDLE);

  const scene = getScene(e.sceneId);
  scene.playerId = e.id;
  setCameraPosition(scene.camera, e.position.x, e.position.y);

  return e;
}

export function updatePlayer(e: Entity) {
  updateState(e, onPlayerStateEnter, onPlayerStateUpdate, onPlayerStateExit);
}
