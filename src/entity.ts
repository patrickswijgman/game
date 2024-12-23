import { addVectorScaled, applyCameraTransform, drawSprite, drawTexture, getDelta, resetTransform, resetVector, scaleTransform, setAlpha, translateTransform, uuid, vec, Vector } from "ridder";
import { Scene } from "scene.js";
import { getState, getStateMachine } from "states.js";
import { newStats, Stats } from "stats.js";

export type Entity = {
  id: string;

  pos: Vector;
  vel: Vector;

  stateMachineId: string;
  stateId: string;

  stats: Stats;

  textureId: string;
  spriteId: string;
  pivot: Vector;

  shadowId: string;
  shadowOffset: Vector;

  isPlayer: boolean;
  isFlipped: boolean;
};

export function newEntity(): Entity {
  return {
    id: uuid(),

    pos: vec(),
    vel: vec(),

    stateMachineId: "",
    stateId: "",

    stats: newStats(),

    textureId: "",
    spriteId: "",
    pivot: vec(),

    shadowId: "",
    shadowOffset: vec(),

    isPlayer: false,
    isFlipped: false,
  };
}

export function updateEntityStateMachine(e: Entity, scene: Scene) {
  const stateMachine = getStateMachine(e.stateMachineId);

  if (stateMachine) {
    const nextStateId = stateMachine.decide(e, scene);

    if (e.stateId !== nextStateId) {
      const currentState = getState(e.stateMachineId, e.stateId);
      const nextState = getState(e.stateMachineId, nextStateId);

      if (currentState && currentState.exit) {
        currentState.exit(e, scene);
      }

      e.stateId = nextStateId;
      resetEntity(e);

      if (nextState && nextState.enter) {
        nextState.enter(e, scene);
      }
    }

    const state = getState(e.stateMachineId, e.stateId);

    if (state && state.update) {
      state.update(e, scene);
    }
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

  if (e.shadowId) {
    setAlpha(0.4);
    drawSprite(e.shadowId, -e.pivot.x + e.shadowOffset.x, -e.pivot.y + e.shadowOffset.y);
    setAlpha(1);
  }

  if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }
}

export function resetEntity(e: Entity) {
  resetVector(e.vel);
}
