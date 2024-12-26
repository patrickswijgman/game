import { onAction } from "actions.js";
import { addVectorScaled, applyCameraTransform, drawSprite, drawText, drawTexture, getDelta, isPolygonValid, polygon, Polygon, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setPolygonAngle, setVector, TextAlign, TextBaseline, timer, Timer, translateTransform, uuid, vec, Vector } from "ridder";
import { addEntity, Scene } from "scene.js";
import { newStats, Stats } from "stats.js";

export type Entity = {
  id: string;
  type: string;
  start: Vector;
  pos: Vector;
  vel: Vector;
  target: Vector;
  centerOffset: Vector;
  stateId: string;
  stateNextId: string;
  stateIdleId: string;
  stateTimer: Timer;
  stats: Stats;
  hitbox: Polygon;
  textureId: string;
  spriteId: string;
  pivot: Vector;
  scale: Vector;
  angle: number;
  shadowId: string;
  shadowOffset: Vector;
  text: string;
  textAlign: TextAlign;
  textBaseline: TextBaseline;
  textColor: string;
  width: number;
  height: number;
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
  isDestroyed: boolean;
};

export function newEntity(scene: Scene, x: number, y: number): Entity {
  return addEntity(scene, {
    id: uuid(),
    type: "",
    start: vec(x, y),
    pos: vec(x, y),
    vel: vec(),
    target: vec(),
    centerOffset: vec(),
    stateId: "",
    stateTimer: timer(),
    stateNextId: "",
    stateIdleId: "",
    stats: newStats(),
    hitbox: polygon(),
    textureId: "",
    spriteId: "",
    pivot: vec(),
    scale: vec(1, 1),
    angle: 0,
    shadowId: "",
    shadowOffset: vec(),
    text: "",
    textAlign: "left",
    textBaseline: "top",
    textColor: "white",
    width: 0,
    height: 0,
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
    isDestroyed: false,
  });
}

type StateLifecycleHook = (e: Entity, scene: Scene, state: string) => string | void;

export function updateState(e: Entity, scene: Scene, onEnter: StateLifecycleHook, onUpdate: StateLifecycleHook, onExit: StateLifecycleHook) {
  if (e.stateId !== e.stateNextId) {
    onExit(e, scene, e.stateId);

    e.stateId = e.stateNextId;

    resetTimer(e.stateTimer);
    resetVector(e.vel);
    resetTimer(e.tweenTimer);
    resetVector(e.tweenPos);
    setVector(e.tweenScale, 1, 1);
    e.tweenAngle = 0;

    if (e.stateId === "action") {
      onAction(e, scene);
    } else {
      onEnter(e, scene, e.stateId);
    }
  }

  const nextStateId = onUpdate(e, scene, e.stateId);

  if (nextStateId) {
    e.stateNextId = nextStateId;
  }
}

export function updatePhysics(e: Entity) {
  addVectorScaled(e.pos, e.vel, getDelta());
}

export function updateHitbox(e: Entity) {
  if (isPolygonValid(e.hitbox)) {
    e.hitbox.x = e.pos.x;
    e.hitbox.y = e.pos.y;
    setPolygonAngle(e.hitbox, e.angle + e.tweenAngle);
  }
}

export function renderEntity(e: Entity) {
  resetTransform();
  applyCameraTransform();
  translateTransform(e.pos.x, e.pos.y);
  scaleTransform(e.scale.x, e.scale.y);
  rotateTransform(e.angle);

  translateTransform(e.tweenPos.x, e.tweenPos.y);
  scaleTransform(e.tweenScale.x, e.tweenScale.y);
  rotateTransform(e.tweenAngle);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  if (e.textureId) {
    drawTexture(e.textureId, -e.pivot.x, -e.pivot.y);
  }

  if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }

  if (e.text) {
    drawText(e.text, -e.pivot.x, -e.pivot.y, e.textColor, e.textAlign, e.textBaseline);
  }
}

export function renderShadow(e: Entity) {
  if (e.shadowId) {
    resetTransform();
    translateTransform(e.pos.x, e.pos.y);
    applyCameraTransform();

    if (e.isFlipped) {
      scaleTransform(-1, 1);
    }

    drawSprite(e.shadowId, -e.pivot.x + e.shadowOffset.x, -e.pivot.y + e.shadowOffset.y);
  }
}
