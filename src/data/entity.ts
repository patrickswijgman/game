import { Scene } from "data/scene.js";
import { getState } from "data/states.js";
import { newStats, Stats } from "data/stats.js";
import { addVectorScaled, applyCameraTransform, drawSprite, drawTexture, getDelta, polygon, Polygon, resetTransform, rotateTransform, scaleTransform, timer, Timer, translateTransform, uuid, vec, Vector } from "ridder";

export type Entity = {
  id: string;

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

  isPlayer: boolean;
  isFlipped: boolean;
};

export function newEntity(options: Partial<Entity> = {}): Entity {
  return {
    id: uuid(),

    pos: vec(),
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

    isPlayer: false,
    isFlipped: false,

    ...options,
  };
}

export function updateState(e: Entity, scene: Scene) {
  if (e.stateId !== e.stateNextId) {
    const currentState = getState(e.stateId);
    const nextState = getState(e.stateNextId);

    if (currentState && currentState.exit) {
      currentState.exit(e, scene, currentState);
    }

    e.stateId = e.stateNextId;

    if (nextState && nextState.enter) {
      nextState.enter(e, scene, nextState);
    }
  }

  const state = getState(e.stateId);

  if (state && state.update) {
    state.update(e, scene, state);
  }
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

export function switchState(e: Entity, state: string) {
  e.stateNextId = state;
}
