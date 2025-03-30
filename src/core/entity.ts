import { COLOR_OUTLINE } from "@/consts.js";
import { SpriteId } from "@/core/assets.js";
import { AttackId, getAttack } from "@/core/attacks.js";
import { destroyEntity, nextEntity } from "@/core/entities.js";
import { newStats, Stats } from "@/core/stats.js";
import { drawHealthBar } from "@/core/ui.js";
import { UpgradeId } from "@/core/upgrades.js";
import { addBody, getBodies } from "@/core/world.js";
import { addAttack } from "@/entities/attack.js";
import { addVector, addVectorScaled, applyCameraTransform, copyVector, drawSprite, drawTextOutlined, getDelta, rect, Rectangle, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setAlpha, setRectangle, setVector, tickTimer, timer, Timer, translateTransform, vec, Vector, writeIntersectionBetweenRectangles, zero } from "ridder";

export const enum Type {
  NONE,
  PLAYER,
  ENEMY,
  TREE,
  XP_ORB,
  ATTACK,
  COMBAT_TEXT,
  UI_UPGRADE,
}

export const enum StateId {
  NONE,
  ATTACK,
  STAGGER,
  PLAYER,
  ENEMY_SEEK,
  ENEMY_ATTACK,
  ITEM_IDLE,
  ITEM_PICKUP,
}

export const enum AnimationId {
  NONE,
  ATTACK,
  STAGGER,
  BREATH,
  WALK,
  WIND,
  ITEM_IDLE,
  ITEM_PICKUP,
  COMBAT_TEXT,
}

export type Entity = {
  // Memory allocation
  isAllocated: boolean;
  id: number;

  // Archetype
  type: Type;

  // Physics
  isPhysicsEnabled: boolean;
  start: Vector;
  position: Vector;
  velocity: Vector;
  direction: Vector;

  // Collisions
  isCollisionsEnabled: boolean;
  body: Rectangle;
  bodyOffset: Vector;
  bodyIntersection: Vector;

  // Render
  spriteId: SpriteId;
  pivot: Vector;
  scale: Vector;
  scroll: Vector;
  angle: number;
  depth: number;
  isFlipped: boolean;

  shadowId: SpriteId;
  shadowOffset: Vector;

  outlineId: SpriteId;
  isOutlineVisible: boolean;

  flashId: SpriteId;
  isFlashing: boolean;

  text: string;
  textColor: string;

  // Animation
  animId: AnimationId;
  animNextId: AnimationId;
  animPosition: Vector;
  animScale: Vector;
  animAngle: number;
  animTimer: Timer;
  animDuration: number;

  // State management
  stateId: StateId;
  stateNextId: StateId;
  stateStartId: StateId;
  stateTimer: Timer;

  // Life cycle
  isDestroyed: boolean;
  lifeTime: number;
  lifeTimer: Timer;

  // Steering
  ahead: Vector;
  avoid: Vector;
  radius: number;

  // Combat
  center: Vector;
  centerOffset: Vector;
  hitbox: Rectangle;
  hitboxOffset: Vector;
  stats: Stats;
  attackId: AttackId;
  isPlayer: boolean;
  isEnemy: boolean;
  isAttack: boolean;

  // Attack
  casterId: number;

  // Interaction
  hitarea: Rectangle;
  hitareaOffset: Vector;
  upgradeId: UpgradeId;
};

export function newEntity(): Entity {
  return {
    // Memory allocation
    isAllocated: false,
    id: 0,

    // Archetype
    type: Type.NONE,

    // Physics
    isPhysicsEnabled: false,
    start: vec(),
    position: vec(),
    velocity: vec(),
    direction: vec(),

    // Collisions
    isCollisionsEnabled: false,
    body: rect(),
    bodyOffset: vec(),
    bodyIntersection: vec(),

    // Render
    spriteId: SpriteId.NONE,
    pivot: vec(0, 0),
    scale: vec(1, 1),
    scroll: vec(1, 1),
    angle: 0,
    depth: 0,
    isFlipped: false,

    shadowId: SpriteId.NONE,
    shadowOffset: vec(),

    outlineId: SpriteId.NONE,
    isOutlineVisible: false,

    flashId: SpriteId.NONE,
    isFlashing: false,

    text: "",
    textColor: "",

    // Animation
    animId: AnimationId.NONE,
    animNextId: AnimationId.NONE,
    animPosition: vec(),
    animScale: vec(1, 1),
    animAngle: 0,
    animDuration: 0,
    animTimer: timer(),

    // State management
    stateId: StateId.NONE,
    stateNextId: StateId.NONE,
    stateStartId: StateId.NONE,
    stateTimer: timer(),

    // Life cycle
    isDestroyed: false,
    lifeTime: 0,
    lifeTimer: timer(),

    // Steering
    ahead: vec(),
    avoid: vec(),
    radius: 0,

    // Combat
    center: vec(),
    centerOffset: vec(),
    hitbox: rect(),
    hitboxOffset: vec(),
    stats: newStats(),
    attackId: AttackId.NONE,
    isPlayer: false,
    isEnemy: false,
    isAttack: false,

    // Attack
    casterId: 0,

    // Interaction
    hitarea: rect(),
    hitareaOffset: vec(),
    upgradeId: UpgradeId.NONE,
  };
}

export function zeroEntity(e: Entity) {
  zero(e);
  setVector(e.scale, 1, 1);
  setVector(e.scroll, 1, 1);
  setVector(e.animScale, 1, 1);
}

export function addEntity(type: Type, x: number, y: number) {
  const e = nextEntity();
  e.type = type;
  setVector(e.start, x, y);
  setVector(e.position, x, y);
  return e;
}

export function initState(e: Entity, stateId: StateId) {
  e.stateStartId = stateId;
  e.stateNextId = stateId;
}

export function setSprite(e: Entity, spriteId: SpriteId, pivotX: number, pivotY: number, flashId = SpriteId.NONE, outlineId = SpriteId.NONE) {
  e.spriteId = spriteId;
  e.flashId = flashId;
  e.outlineId = outlineId;
  setVector(e.pivot, pivotX, pivotY);
}

export function setShadow(e: Entity, id: SpriteId, offsetX: number, offsetY: number) {
  e.shadowId = id;
  setVector(e.shadowOffset, offsetX, offsetY);
}

export function setCenter(e: Entity, x: number, y: number) {
  setVector(e.centerOffset, x, y);
  updateCenter(e);
}

export function setHitbox(e: Entity, x: number, y: number, w: number, h: number) {
  setVector(e.hitboxOffset, x, y);
  setRectangle(e.hitbox, 0, 0, w, h);
  updateHitbox(e);
}

export function setBody(e: Entity, x: number, y: number, w: number, h: number) {
  setVector(e.bodyOffset, x, y);
  setRectangle(e.body, 0, 0, w, h);
  updateBody(e);
  addBody(e.body);
}

export function setHitarea(e: Entity, x: number, y: number, w: number, h: number) {
  setVector(e.hitareaOffset, x, y);
  setRectangle(e.hitarea, 0, 0, w, h);
  updateHitarea(e);
}

export function setAnimation(e: Entity, animId: AnimationId, duration = 0) {
  if (animId !== e.animNextId) {
    e.animNextId = animId;
    e.animDuration = duration;
  }
}

export function setState(e: Entity, stateId: StateId) {
  e.stateNextId = stateId;
}

export function updatePhysics(e: Entity) {
  if (e.isPhysicsEnabled) {
    addVectorScaled(e.position, e.velocity, getDelta());
    updateCenter(e);
    updateHitbox(e);
  }
}

export function updateCollisions(e: Entity) {
  if (e.isCollisionsEnabled) {
    updateBody(e);
    resetVector(e.bodyIntersection);

    for (const body of getBodies()) {
      if (body === e.body) {
        continue;
      }
      writeIntersectionBetweenRectangles(e.body, body, e.velocity, e.bodyIntersection);
    }

    if (e.bodyIntersection.x) {
      e.position.x += e.bodyIntersection.x;
      e.velocity.x = 0;
      updateBody(e);
    }
    if (e.bodyIntersection.y) {
      e.position.y += e.bodyIntersection.y;
      e.velocity.y = 0;
      updateBody(e);
    }
  }
}

export function updateCenter(e: Entity) {
  copyVector(e.center, e.position);
  addVector(e.center, e.centerOffset);
}

export function updateHitbox(e: Entity) {
  copyVector(e.hitbox, e.position);
  addVector(e.hitbox, e.hitboxOffset);
}

export function updateHitarea(e: Entity) {
  copyVector(e.hitarea, e.position);
  addVector(e.hitarea, e.hitareaOffset);
}

export function updateBody(e: Entity) {
  copyVector(e.body, e.position);
  addVector(e.body, e.bodyOffset);
}

export function updateAnimation(e: Entity) {
  if (e.animNextId !== e.animId) {
    resetAnimation(e);
    e.animId = e.animNextId;
  }

  return e.animId;
}

export function updateState(e: Entity, onEnter: (e: Entity) => void, onUpdate: (e: Entity) => void, onExit: (e: Entity) => void) {
  if (e.stateNextId !== e.stateId) {
    onEntityStateExit(e, onExit);
    e.stateId = e.stateNextId;
    onEntityStateEnter(e, onEnter);
  }
  onEntityStateUpdate(e, onUpdate);
}

function onEntityStateEnter(e: Entity, onEnter: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      const attack = getAttack(e.attackId);
      setAnimation(e, AnimationId.ATTACK, attack.recovery);
      addAttack(e);
      break;

    case StateId.STAGGER:
      setAnimation(e, AnimationId.STAGGER, 150);
      e.isFlashing = true;
      break;
  }
  onEnter(e);
}

function onEntityStateUpdate(e: Entity, onUpdate: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.ATTACK:
      {
        const attack = getAttack(e.attackId);
        if (tickTimer(e.stateTimer, attack.recovery)) {
          resetState(e);
        }
      }
      break;

    case StateId.STAGGER:
      {
        if (tickTimer(e.stateTimer, 150)) {
          resetState(e);
        }
      }
      break;
  }
  onUpdate(e);
}

function onEntityStateExit(e: Entity, onExit: (e: Entity) => void) {
  switch (e.stateId) {
    case StateId.STAGGER:
      e.isFlashing = false;
      break;
  }
  resetVector(e.velocity);
  resetTimer(e.stateTimer);
  resetAnimation(e);
  onExit(e);
}

export function resetAnimation(e: Entity) {
  resetTimer(e.animTimer);
  resetVector(e.animPosition);
  setVector(e.animScale, 1, 1);
  e.animAngle = 0;
}

export function resetState(e: Entity) {
  setState(e, e.stateStartId);
}

export function renderEntity(e: Entity) {
  resetTransform();
  applyCameraTransform(e.scroll.x, e.scroll.y);
  translateTransform(e.position.x, e.position.y);
  scaleTransform(e.scale.x, e.scale.y);
  rotateTransform(e.angle);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  if (e.shadowId) {
    setAlpha(0.3);
    drawSprite(e.shadowId, -e.pivot.x + e.shadowOffset.x, -e.pivot.y + e.shadowOffset.y);
    setAlpha(1);
  }

  if (e.animId) {
    translateTransform(e.animPosition.x, e.animPosition.y);
    scaleTransform(e.animScale.x, e.animScale.y);
    rotateTransform(e.animAngle);
  }

  if (e.isFlashing) {
    drawSprite(e.flashId, -e.pivot.x, -e.pivot.y);
  } else if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }

  if (e.isOutlineVisible) {
    drawSprite(e.outlineId, -e.pivot.x, -e.pivot.y);
  }

  if (e.text) {
    drawTextOutlined(e.text, 0, 0, e.textColor, COLOR_OUTLINE, "circle", "center", "middle");
  }
}

export function renderEntityStatus(e: Entity) {
  if (e.stats.health < e.stats.healthMax) {
    resetTransform();
    applyCameraTransform();
    translateTransform(e.position.x, e.position.y - e.hitbox.h - 5);
    drawHealthBar(-5, 0, e.stats, 10, 3);
  }
}

export function destroyIfExpired(e: Entity) {
  if (e.lifeTime && tickTimer(e.lifeTimer, e.lifeTime)) {
    destroyEntity(e.id);
    return true;
  }

  return false;
}

export function destroyIfDead(e: Entity) {
  if (e.stats.healthMax && e.stats.health === 0) {
    destroyEntity(e.id);
    return true;
  }

  return false;
}
