import { SpriteId } from "@/consts/assets.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Type } from "@/consts/type.js";
import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { onPlayerStateEnter, onPlayerStateExit, onPlayerStateUpdate } from "@/states/player.js";
import { addEntity, setCenterFromHitbox, setFlash, setHitbox, setShadow, setSprite, setState, updateState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { setCameraPosition, setVector } from "ridder";

export function addPlayer(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.PLAYER, sceneId, x, y);
  setSprite(e, SpriteId.PLAYER);
  setShadow(e, SpriteId.PLAYER_SHADOW);
  setFlash(e, SpriteId.PLAYER_FLASH);
  setHitbox(e, -3, -8, 6, 8);
  setCenterFromHitbox(e);
  setVector(e.direction, 1, 0);

  e.sheet = game.sheet;

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
