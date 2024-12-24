import { onAction } from "actions.js";
import { setVector } from "engine/vector.js";
import { addVectorScaled, applyCameraTransform, drawSprite, drawTexture, getDelta, polygon, Polygon, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, timer, Timer, translateTransform, uuid, vec, Vector } from "ridder";
import { addEntity, Scene } from "scene.js";
import { newStats, Stats } from "stats.js";

export type Entity = {
  id: string;
  type: string;
  pos: Vector;
  vel: Vector;
  stateId: string;
  stateNextId: string;
  stateTimer: Timer;
  stats: Stats;
  hitbox: Polygon;
  textureId: string;
  spriteId: string;
  pivot: Vector;
  angle: number;
  shadowId: string;
  shadowOffset: Vector;
  tweenPos: Vector;
  tweenScale: Vector;
  tweenAngle: number;
  tweenTimer: Timer;
  actionId: string;
  weaponId: string;
  isFlipped: boolean;
};

export function newEntity(scene: Scene, x: number, y: number): Entity {
  return addEntity(scene, {
    id: uuid(),
    type: "",
    pos: vec(x, y),
    vel: vec(),
    stateId: "",
    stateTimer: timer(),
    stateNextId: "",
    stats: newStats(),
    hitbox: polygon(),
    textureId: "",
    spriteId: "",
    pivot: vec(),
    angle: 0,
    shadowId: "",
    shadowOffset: vec(),
    tweenPos: vec(),
    tweenScale: vec(1, 1),
    tweenAngle: 0,
    tweenTimer: timer(),
    actionId: "",
    weaponId: "",
    isFlipped: false,
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

    switch (e.stateId) {
      case "action":
        onAction(e, scene);
        break;

      default:
        onEnter(e, scene, e.stateId);
        break;
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

export function renderEntity(e: Entity) {
  resetTransform();
  applyCameraTransform();
  translateTransform(e.pos.x, e.pos.y);
  translateTransform(e.tweenPos.x, e.tweenPos.y);
  scaleTransform(e.tweenScale.x, e.tweenScale.y);
  rotateTransform(e.angle);
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
