import { XP_PER_LEVEL } from "@/consts.js";
import { SpriteId } from "@/core/assets.js";
import { AttackId } from "@/core/attacks.js";
import { AnimationId, Entity, StateId, Type, addEntity, initState, setAnimation, setBody, setCenter, setHitbox, setShadow, setSprite, setState, updateState } from "@/core/entity.js";
import { addToAlliesGroup, setPlayer } from "@/core/world.js";
import { InputCode, copyVector, getMousePosition, getVectorLength, isInputDown, normalizeVector, resetVector, scaleVector, setVector, subtractVector } from "ridder";

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
  updateState(e, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter() {}

function onStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.PLAYER:
      aim(e);
      move(e);
      attack(e);
      break;

    case StateId.ATTACK:
      move(e, 0.5);
      break;
  }
}

function onStateExit() {}

function move(e: Entity, mod = 1) {
  resetVector(e.velocity);

  if (isInputDown(InputCode.KEY_A)) {
    e.velocity.x -= 1;
  }
  if (isInputDown(InputCode.KEY_D)) {
    e.velocity.x += 1;
  }
  if (isInputDown(InputCode.KEY_W)) {
    e.velocity.y -= 1;
  }
  if (isInputDown(InputCode.KEY_S)) {
    e.velocity.y += 1;
  }

  const isMoving = !!getVectorLength(e.velocity);

  if (isMoving) {
    normalizeVector(e.velocity);
    scaleVector(e.velocity, e.stats.movementSpeed * mod);
    setAnimation(e, AnimationId.WALK, 100);
  } else {
    setAnimation(e, AnimationId.BREATH, 2000);
  }

  return isMoving;
}

function aim(e: Entity) {
  copyVector(e.direction, getMousePosition(true));
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);
  e.isFlipped = e.direction.x < 0;
}

function attack(e: Entity) {
  if (isInputDown(InputCode.MOUSE_LEFT)) {
    setState(e, StateId.ATTACK);
  }
}
