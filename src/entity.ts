import { onActionEnter, onActionExit, onActionUpdate } from "actions.js";
import { addVectorScaled, applyCameraTransform, drawSprite, drawText, drawTexture, getDelta, isPolygonValid, polygon, Polygon, polygonFromRect, rect, Rectangle, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setPolygonAngle, setVector, TextAlign, TextBaseline, tickTimer, timer, Timer, translateTransform, uuid, vec, Vector } from "ridder";
import { addEnemy, addEntity, Scene } from "scene.js";
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
  hitarea: Rectangle;
  body: Rectangle;
  radius: number;
  textureId: string;
  spriteId: string;
  spriteFlashId: string;
  spriteOutlineId: string;
  spriteOutlinePrimaryId: string;
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
  roomCoordinates: Vector;
  flashTimer: Timer;
  lifetime: number;
  lifeTimer: Timer;
  tweenPos: Vector;
  tweenScale: Vector;
  tweenAngle: number;
  tweenTimer: Timer;
  tweenDuration: number;
  parentId: string;
  actionId: string;
  weaponId: string;
  blacklist: Array<string>;
  isPlayer: boolean;
  isEnemy: boolean;
  isFlipped: boolean;
  isFlashing: boolean;
  isOutlineVisible: boolean;
  isOutlinePrimaryVisible: boolean;
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
    hitarea: rect(),
    body: rect(),
    radius: 0,
    textureId: "",
    spriteId: "",
    spriteFlashId: "",
    spriteOutlineId: "",
    spriteOutlinePrimaryId: "",
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
    roomCoordinates: vec(),
    lifetime: 0,
    lifeTimer: timer(),
    flashTimer: timer(),
    tweenPos: vec(),
    tweenScale: vec(1, 1),
    tweenAngle: 0,
    tweenTimer: timer(),
    tweenDuration: 0,
    parentId: "",
    actionId: "",
    weaponId: "",
    blacklist: [],
    isPlayer: false,
    isEnemy: false,
    isFlipped: false,
    isFlashing: false,
    isOutlineVisible: false,
    isOutlinePrimaryVisible: false,
    isDestroyed: false,
  });
}

export function newEnemy(scene: Scene, type: string, x: number, y: number) {
  const e = newEntity(scene, type, x, y);
  e.isEnemy = true;
  return addEnemy(scene, e);
}

export function setSprites(e: Entity, id: string, pivotX: number, pivotY: number, centerOffsetX = 0, centerOffsetY = 0, shadow = false, shadowOffsetX = 0, shadowOffsetY = 0) {
  e.spriteId = id;
  e.spriteFlashId = `${id}_flash`;
  e.spriteOutlineId = `${id}_outline`;
  e.spriteOutlinePrimaryId = `${id}_outline_primary`;
  e.pivot.x = pivotX;
  e.pivot.y = pivotY;
  e.centerOffset.x = centerOffsetX;
  e.centerOffset.y = centerOffsetY;

  if (shadow) {
    e.shadowId = `${id}_shadow`;
    e.shadowOffset.x = shadowOffsetX;
    e.shadowOffset.y = shadowOffsetY;
  }
}

export function setConstraints(e: Entity, width: number, height: number) {
  e.hitbox = polygonFromRect(e.pos.x, e.pos.y, rect(-width / 2, -height, width, height));
  e.width = width;
  e.height = height;
  e.radius = width / 2;
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

    if (e.isOutlineVisible) {
      drawSprite(e.spriteOutlineId, -e.pivot.x, -e.pivot.y);
    }

    if (e.isOutlinePrimaryVisible) {
      drawSprite(e.spriteOutlinePrimaryId, -e.pivot.x, -e.pivot.y);
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

    translateTransform(e.shadowOffset.x, e.shadowOffset.y);
    drawSprite(e.shadowId, -e.pivot.x, -e.pivot.y);
  }
}

export function resetState(e: Entity) {
  if (e.stateIdleId) {
    e.stateNextId = e.stateIdleId;
  } else {
    e.stateNextId = "";
  }
}
