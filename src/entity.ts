import { onActionEnter, onActionExit, onActionUpdate } from "actions.js";
import { addVectorScaled, applyCameraTransform, drawSprite, drawText, drawTexture, getDelta, isPolygonValid, polygon, Polygon, rect, Rectangle, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setPolygonAngle, setVector, TextAlign, TextBaseline, tickTimer, timer, Timer, translateTransform, uuid, vec, Vector } from "ridder";
import { addEntity, Scene } from "scene.js";
import { newStats, Stats } from "stats.js";
import { avoid } from "steering.js";

export type Entity = {
  id: string;
  type: string;
  start: Vector;
  pos: Vector;
  vel: Vector;
  ahead: Vector;
  avoid: Vector;
  target: Vector;
  direction: Vector;
  stateId: string;
  stateNextId: string;
  stateIdleId: string;
  stateTimer: Timer;
  stats: Stats;
  hitbox: Polygon;
  body: Rectangle;
  radius: number;
  textureId: string;
  spriteId: string;
  spriteFlashId: string;
  pivot: Vector;
  scale: Vector;
  angle: number;
  shadowId: string;
  shadowOffset: Vector;
  centerOffset: Vector;
  text: string;
  textAlign: TextAlign;
  textBaseline: TextBaseline;
  textColor: string;
  textOutline: string;
  width: number;
  height: number;
  flashTimer: Timer;
  lifetime: number;
  lifeTimer: Timer;
  tweenPos: Vector;
  tweenScale: Vector;
  tweenAngle: number;
  tweenTimer: Timer;
  parentId: string;
  actionId: string;
  weaponId: string;
  blacklist: Array<string>;
  isPlayer: boolean;
  isEnemy: boolean;
  isFlipped: boolean;
  isFlashing: boolean;
  isDestroyed: boolean;
};

export function newEntity(scene: Scene, type: string, x: number, y: number): Entity {
  return addEntity(scene, {
    id: uuid(),
    type,
    start: vec(x, y),
    pos: vec(x, y),
    vel: vec(),
    ahead: vec(),
    avoid: vec(),
    target: vec(),
    direction: vec(),
    stateId: "",
    stateTimer: timer(),
    stateNextId: "",
    stateIdleId: "",
    stats: newStats(),
    hitbox: polygon(),
    body: rect(),
    radius: 0,
    textureId: "",
    spriteId: "",
    spriteFlashId: "",
    pivot: vec(),
    scale: vec(1, 1),
    angle: 0,
    shadowId: "",
    shadowOffset: vec(),
    centerOffset: vec(),
    text: "",
    textAlign: "left",
    textBaseline: "top",
    textColor: "white",
    textOutline: "",
    width: 0,
    height: 0,
    lifetime: 0,
    lifeTimer: timer(),
    flashTimer: timer(),
    tweenPos: vec(),
    tweenScale: vec(1, 1),
    tweenAngle: 0,
    tweenTimer: timer(),
    parentId: "",
    actionId: "",
    weaponId: "",
    blacklist: [],
    isPlayer: false,
    isEnemy: false,
    isFlipped: false,
    isFlashing: false,
    isDestroyed: false,
  });
}

export function setSprites(e: Entity, id: string, pivotX: number, pivotY: number, centerOffsetX: number, centerOffsetY: number, shadow: boolean, shadowOffsetX: number, shadowOffsetY: number, flash: boolean) {
  e.spriteId = id;
  e.pivot.x = pivotX;
  e.pivot.y = pivotY;
  e.centerOffset.x = centerOffsetX;
  e.centerOffset.y = centerOffsetY;

  if (shadow) {
    e.shadowId = `${id}_shadow`;
    e.shadowOffset.x = shadowOffsetX;
    e.shadowOffset.y = shadowOffsetY;
  }

  if (flash) {
    e.spriteFlashId = `${id}_flash`;
  }
}

type StateLifecycleHook = (e: Entity, scene: Scene, state: string) => string | void;

export function updateState(e: Entity, scene: Scene, onEnter: StateLifecycleHook, onUpdate: StateLifecycleHook, onExit: StateLifecycleHook) {
  if (e.stateId !== e.stateNextId) {
    if (e.stateId === "action") {
      onActionExit(e, scene);
    } else {
      onExit(e, scene, e.stateId);
    }

    e.stateId = e.stateNextId;

    resetTimer(e.stateTimer);
    resetVector(e.vel);
    resetTimer(e.tweenTimer);
    resetVector(e.tweenPos);
    setVector(e.tweenScale, 1, 1);
    e.tweenAngle = 0;

    if (e.stateId === "action") {
      onActionEnter(e, scene);
    } else {
      onEnter(e, scene, e.stateId);
    }
  }

  if (e.stateId === "action") {
    onActionUpdate(e, scene);
  } else {
    const nextStateId = onUpdate(e, scene, e.stateId);
    if (nextStateId) {
      e.stateNextId = nextStateId;
    }
  }
}

export function updatePhysics(e: Entity) {
  addVectorScaled(e.pos, e.vel, getDelta());
}

export function updateHitbox(e: Entity) {
  if (isPolygonValid(e.hitbox)) {
    e.hitbox.x = e.pos.x + e.tweenPos.x;
    e.hitbox.y = e.pos.y + e.tweenPos.y;
    const angle = e.angle + e.tweenAngle;
    setPolygonAngle(e.hitbox, e.isFlipped ? -angle : angle);
  }
}

export function updateAvoidance(e: Entity, scene: Scene) {
  if (e.radius) {
    avoid(e, scene);
  }
}

export function updateFlash(e: Entity) {
  if (e.isFlashing && tickTimer(e.flashTimer, 100)) {
    e.isFlashing = false;
    resetTimer(e.flashTimer);
  }
}

export function renderEntity(e: Entity, scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  translateTransform(e.pos.x, e.pos.y);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  scaleTransform(e.scale.x, e.scale.y);
  rotateTransform(e.angle);

  translateTransform(e.tweenPos.x, e.tweenPos.y);
  scaleTransform(e.tweenScale.x, e.tweenScale.y);
  rotateTransform(e.tweenAngle);

  if (e.textureId) {
    drawTexture(e.textureId, -e.pivot.x, -e.pivot.y);
  }

  if (e.spriteId) {
    if (e.isFlashing) {
      drawSprite(e.spriteFlashId, -e.pivot.x, -e.pivot.y);
    } else {
      drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
    }
  }

  if (e.text) {
    if (e.textOutline) {
      drawText(e.text, 0, -1, e.textOutline, e.textAlign, e.textBaseline);
      drawText(e.text, 1, 0, e.textOutline, e.textAlign, e.textBaseline);
      drawText(e.text, 0, 1, e.textOutline, e.textAlign, e.textBaseline);
      drawText(e.text, -1, 0, e.textOutline, e.textAlign, e.textBaseline);
    }
    drawText(e.text, 0, 0, e.textColor, e.textAlign, e.textBaseline);
  }
}

export function renderShadow(e: Entity, scene: Scene) {
  if (e.shadowId) {
    resetTransform();
    translateTransform(e.pos.x, e.pos.y);
    applyCameraTransform(scene.camera);

    if (e.isFlipped) {
      scaleTransform(-1, 1);
    }

    drawSprite(e.shadowId, -e.pivot.x + e.shadowOffset.x, -e.pivot.y + e.shadowOffset.y);
  }
}

export function resetState(e: Entity) {
  if (e.stateIdleId) {
    e.stateNextId = e.stateIdleId;
  } else {
    e.stateNextId = "";
  }
}
