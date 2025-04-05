import { SHADOW_ALPHA } from "@/consts.js";
import { SpriteId } from "@/core/assets.js";
import { AttackId } from "@/core/attacks.js";
import { addBody, destroyEntity, getBodies, nextEntity } from "@/core/game.js";
import { newStats, Stats } from "@/core/stats.js";
import { drawHealthBar } from "@/core/ui.js";
import { UpgradeId } from "@/core/upgrades.js";
import { onEntityStateEnter, onEntityStateExit, onEntityStateUpdate } from "@/states/entity.js";
import { addVector, addVectorScaled, applyCameraTransform, copyVector, doesRectangleContain, drawSprite, getDelta, getMousePosition, InputCode, isInputPressed, rect, Rectangle, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setAlpha, setRectangle, setVector, tickTimer, timer, Timer, translateTransform, vec, Vector, writeIntersectionBetweenRectangles, zero } from "ridder";

export const enum Type {
  NONE,

  PLAYER,
  ENEMY_MELEE,
  TREE,
  XP_ORB,
  ATTACK,
  COMBAT_TEXT,

  WIDGET_BACKDROP,
  WIDGET_UPGRADE,
  WIDGET_HEALTH,
  WIDGET_XP,
  WIDGET_TIME,
  WIDGET_LEVEL_UP,
  WIDGET_DEFEAT,
  WIDGET_FPS,
  WIDGET_VERSION,
  WIDGET_DEBUG,
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

export const enum InteractionId {
  NONE,
  CONFIRM_UPGRADE,
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
  depth: number;
  isFlipped: boolean;
  isFlashing: boolean;
  isHovered: boolean;

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
  targetId: number;
  casterId: number;
  text: string;
  isPlayer: boolean;
  isEnemy: boolean;
  isAttack: boolean;

  // UI
  interactionId: InteractionId;
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
    depth: 0,
    isFlipped: false,
    isFlashing: false,
    isHovered: false,

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
    targetId: 0,
    casterId: 0,
    text: "",
    isPlayer: false,
    isEnemy: false,
    isAttack: false,

    // UI
    interactionId: InteractionId.NONE,
    hitarea: rect(),
    hitareaOffset: vec(),
    upgradeId: UpgradeId.NONE,
  };
}

export function zeroEntity(e: Entity) {
  zero(e);
  setVector(e.animScale, 1, 1);
}

export function makeEntity(type: Type, x: number, y: number) {
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

    let isResolved = false;

    if (e.bodyIntersection.x) {
      e.position.x += e.bodyIntersection.x;
      e.velocity.x = 0;
      isResolved = true;
    }
    if (e.bodyIntersection.y) {
      e.position.y += e.bodyIntersection.y;
      e.velocity.y = 0;
      isResolved = true;
    }
    if (isResolved) {
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

export function updateState(e: Entity, onEnter: (e: Entity) => void, onUpdate: (e: Entity) => void, onExit: (e: Entity) => void) {
  if (e.stateNextId !== e.stateId) {
    onEntityStateExit(e, onExit);
    e.stateId = e.stateNextId;
    onEntityStateEnter(e, onEnter);
  }
  onEntityStateUpdate(e, onUpdate);
}

export function updateAnimation(e: Entity) {
  if (e.animNextId !== e.animId) {
    resetTimer(e.animTimer);
    resetVector(e.animPosition);
    setVector(e.animScale, 1, 1);
    e.animAngle = 0;
    e.animId = e.animNextId;
  }
  return e.animId;
}

export function updateInteraction(e: Entity) {
  const mouse = getMousePosition(false);

  if (doesRectangleContain(e.hitarea, mouse.x, mouse.y)) {
    e.isHovered = true;

    if (isInputPressed(InputCode.MOUSE_LEFT, true)) {
      return e.interactionId;
    }
  } else {
    e.isHovered = false;
  }

  return InteractionId.NONE;
}

export function resetState(e: Entity) {
  setState(e, e.stateStartId);
}

export function resetAnimation(e: Entity) {
  setAnimation(e, AnimationId.NONE);
}

export function applyAnimationTransform(e: Entity) {
  translateTransform(e.animPosition.x, e.animPosition.y);
  scaleTransform(e.animScale.x, e.animScale.y);
  rotateTransform(e.animAngle);
}

export function applyEntityTransform(e: Entity) {
  translateTransform(e.position.x, e.position.y);
  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }
}

export function drawShadow(id: SpriteId, x: number, y: number) {
  setAlpha(SHADOW_ALPHA);
  drawSprite(id, x, y);
  setAlpha(1);
}

export function drawEntityStatus(e: Entity) {
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
