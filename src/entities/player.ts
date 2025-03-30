import { XP_PER_LEVEL } from "@/consts.js";
import { SpriteId } from "@/core/assets.js";
import { AttackId } from "@/core/attacks.js";
import { Entity, StateId, Type, initState, setBody, setCenter, setHitbox, setShadow, setSprite, updateState } from "@/core/entity.js";
import { addToAlliesGroup, setPlayer } from "@/core/world.js";
import { addEntity } from "@/entities/entity.js";
import { onPlayerStateEnter, onPlayerStateExit, onPlayerStateUpdate } from "@/states/player.js";
import { setVector } from "ridder";

export function addPlayer(x: number, y: number) {
  const e = addEntity(Type.PLAYER, x, y);

  setSprite(e, SpriteId.PLAYER, 8, 15, SpriteId.PLAYER_FLASH);
  setShadow(e, SpriteId.PLAYER_SHADOW, 0, 2);
  setBody(e, -3, -2, 6, 2);
  setHitbox(e, -3, -8, 6, 8);
  setCenter(e, 0, -3);
  setVector(e.direction, 1, 0);

  e.stats.level = 1;
  e.stats.health = 3;
  e.stats.healthMax = 3;
  e.stats.damage = 10;
  e.stats.critChance = 0.05;
  e.stats.critDamage = 2;
  e.stats.movementSpeed = 0.6;
  e.stats.attackRange = 40;
  e.stats.pickupRange = 30;
  e.stats.experience = 0;
  e.stats.experienceMax = XP_PER_LEVEL;
  e.attackId = AttackId.PLAYER;

  e.isPhysicsEnabled = true;
  e.isCollisionsEnabled = true;
  e.isPlayer = true;

  setPlayer(e.id);
  addToAlliesGroup(e.id);

  initState(e, StateId.PLAYER);

  return e;
}

export function updatePlayer(e: Entity) {
  updateState(e, onPlayerStateEnter, onPlayerStateUpdate, onPlayerStateExit);
}
