import { addEntity, Scene } from "data/scene.js";
import { newStats, Stats } from "data/stats.js";
import { addVectorScaled, applyCameraTransform, drawSprite, drawTexture, getDelta, polygon, Polygon, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, timer, Timer, translateTransform, uuid, vec, Vector } from "ridder";

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
  actionId: string;
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
    actionId: "",
    isFlipped: false,
  });
}

type StateLifecycleHook = (e: Entity, scene: Scene, state: string) => void;

export function updateState(e: Entity, scene: Scene, onEnter: StateLifecycleHook, onUpdate: StateLifecycleHook, onExit: StateLifecycleHook) {
  if (e.stateId !== e.stateNextId) {
    onExit(e, scene, e.stateId);
    e.stateId = e.stateNextId;
    resetTimer(e.stateTimer);
    resetVector(e.vel);
    onEnter(e, scene, e.stateId);
  }

  onUpdate(e, scene, e.stateId);
}

export function updatePhysics(e: Entity) {
  addVectorScaled(e.pos, e.vel, getDelta());
}

export function renderEntity(e: Entity) {
  resetTransform();
  translateTransform(e.pos.x, e.pos.y);
  applyCameraTransform();

  if (e.angle) {
    rotateTransform(e.angle);
  }

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
