import { Entity } from "data/entity.js";
import { Scene } from "data/scene.js";

export type State = {
  enter?: (e: Entity, scene: Scene, state: State) => void;
  update?: (e: Entity, scene: Scene, state: State) => void;
  exit?: (e: Entity, scene: Scene, state: State) => void;
};

const states: Record<string, State> = {};

export function newState(options: Partial<State> = {}): State {
  return {
    ...options,
  };
}

export function addState(id: string, state: State) {
  states[id] = state;
}

export function getState(id: string) {
  return states[id];
}
