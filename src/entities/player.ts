import { SpriteId } from "@/consts/assets.js";
import { Type } from "@/consts/entity.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { onPlayerStateEnter, onPlayerStateExit, onPlayerStateUpdate } from "@/states/player.js";
import { addEntity, setCenterFromHitbox, setHitbox, setSprites, setState, updateState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { setVector } from "ridder";

export function addPlayer(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.PLAYER, sceneId, x, y);
  setSprites(e, SpriteId.PLAYER, SpriteId.PLAYER_SHADOW, SpriteId.PLAYER_FLASH);
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
  scene.allies.push(e.id);

  return e;
}

export function updatePlayer(e: Entity) {
  updateState(e, onPlayerStateEnter, onPlayerStateUpdate, onPlayerStateExit);
}
