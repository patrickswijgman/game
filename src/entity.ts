import { addVectorScaled, drawSprite, drawTexture, getDelta, resetTransform, scaleTransform, translateTransform, uuid, vec, Vector } from "ridder";
import { addEntity, Scene } from "scene.js";
import { getState } from "states.js";
import { Type } from "type.js";

export type Entity = {
  id: string;
  type: Type;
  pos: Vector;
  vel: Vector;
  state: string;
  nextState: string;
  textureId: string;
  spriteId: string;
  pivot: Vector;
  isFlipped: boolean;
};

export function newEntity(setup?: (e: Entity) => Scene): Entity {
  const e: Entity = {
    id: uuid(),
    type: Type.NONE,
    pos: vec(),
    vel: vec(),
    state: "",
    nextState: "",
    textureId: "",
    spriteId: "",
    pivot: vec(),
    isFlipped: false,
  };

  if (setup) {
    const scene = setup(e);
    addEntity(scene, e);
  }

  return e;
}

export function updateEntityState(e: Entity, scene: Scene) {
  if (e.state !== e.nextState) {
    const currentState = getState(e.type, e.state);
    const nextState = getState(e.type, e.nextState);

    console.log(e.type, "exit", e.state);
    if (currentState && currentState.exit) {
      currentState.exit(e, scene);
    }

    e.state = e.nextState;

    console.log(e.type, "enter", e.nextState);
    if (nextState && nextState.enter) {
      nextState.enter(e, scene);
    }
  }

  const state = getState(e.type, e.state);

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
