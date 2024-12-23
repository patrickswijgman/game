import { Entity } from "data/entity.js";
import { Scene } from "data/scene.js";
import { timer, Timer } from "ridder";

export type State = {
  timer: Timer;
  enter?: (e: Entity, scene: Scene) => void;
  update?: (e: Entity, scene: Scene) => void;
  exit?: (e: Entity, scene: Scene) => void;
};

const states: Record<string, State> = {};

export function newState(state: Partial<State> = {}): State {
  return {
    timer: timer(),
    ...state,
  };
}

export function addState(id: string, state: State) {
  states[id] = state;
}

export function getState(id: string) {
  return states[id];
}
