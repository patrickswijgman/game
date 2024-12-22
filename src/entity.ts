import { addVectorScaled, applyCameraTransform, drawSprite, drawTexture, getDelta, resetTransform, resetVector, scaleTransform, translateTransform, uuid, vec, Vector } from "ridder";
import { addEntity, Scene } from "scene.js";
import { getState, getStateMachine } from "states.js";
import { newStats, Stats } from "stats.js";
import { Type } from "type.js";

export type Entity = {
  id: string;

  type: Type;

  pos: Vector;
  vel: Vector;

  stateId: string;

  stats: Stats;

  textureId: string;
  spriteId: string;
  pivot: Vector;

  isFlipped: boolean;
};

export function newEntity(): Entity {
  return {
    id: uuid(),

    type: Type.NONE,

    pos: vec(),
    vel: vec(),

    stateId: "",

    stats: newStats(),

    textureId: "",
    spriteId: "",
    pivot: vec(),

    isFlipped: false,
  };
}

export function updateEntityStateMachine(e: Entity, scene: Scene) {
  const stateMachine = getStateMachine(e.type);

  if (!stateMachine) return;

  const nextStateId = stateMachine.decide(e, scene);

  if (e.stateId !== nextStateId) {
    const currentState = getState(e.type, e.stateId);
    const nextState = getState(e.type, nextStateId);

    if (currentState && currentState.exit) {
      currentState.exit(e, scene);
    }

    e.stateId = nextStateId;
    resetEntity(e);

    if (nextState && nextState.enter) {
      nextState.enter(e, scene);
    }
  }

  const state = getState(e.type, e.stateId);

  if (state && state.update) {
    state.update(e, scene);
  }
}

export function updateEntityPhysics(e: Entity) {
  addVectorScaled(e.pos, e.vel, getDelta());
}

export function renderEntity(e: Entity) {
  resetTransform();
  translateTransform(e.pos.x, e.pos.y);
  applyCameraTransform();

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

export function resetEntity(e: Entity) {
  resetVector(e.vel);
}
