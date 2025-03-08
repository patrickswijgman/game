import { SpriteId } from "@/consts/assets.js";
import { AttackId } from "@/consts/attack.js";
import { Type } from "@/consts/entity.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { onPlayerStateEnter, onPlayerStateExit, onPlayerStateUpdate } from "@/states/player.js";
import { addEntity, addToAllies, setBody, setCenter, setHitbox, setShadow, setSprite, setState, updateState } from "@/usecases/entity.js";
import { setPlayer } from "@/usecases/world.js";
import { setVector } from "ridder";

export function addPlayer(x: number, y: number) {
  const e = addEntity(Type.PLAYER, x, y);

  setSprite(e, SpriteId.PLAYER, 8, 15, SpriteId.PLAYER_FLASH);
  setShadow(e, SpriteId.PLAYER_SHADOW, 0, 2);
  setBody(e, -3, -2, 6, 2);
  setHitbox(e, -3, -8, 6, 8);
  setCenter(e, 0, -3);
  setVector(e.direction, 1, 0);

  e.stats.health = 3;
  e.stats.healthMax = 3;
  e.stats.damage = 10;
  e.stats.critChance = 0.05;
  e.stats.critDamage = 2;
  e.stats.movementSpeed = 1;
  e.stats.movementSpeedMax = 1;
  e.attackId = AttackId.PLAYER;

  e.isPhysicsEnabled = true;
  e.isCollisionsEnabled = true;
  e.isPlayer = true;

  setState(e, StateId.PLAYER_IDLE);
  setPlayer(e);
  addToAllies(e);

  return e;
}

export function updatePlayer(e: Entity) {
  updateState(e, onPlayerStateEnter, onPlayerStateUpdate, onPlayerStateExit);
}
