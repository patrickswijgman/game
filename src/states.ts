import { Entity } from "entity.js";
import { Scene } from "scene.js";
import { Type } from "type.js";

export type State = {
  enter?: (e: Entity, scene: Scene) => void;
  update?: (e: Entity, scene: Scene) => void;
  exit?: (e: Entity, scene: Scene) => void;
};

export type StateRecord = Record<string, State>;

const states: Record<string, StateRecord> = {};

export function addStates(id: string, record: StateRecord) {
  states[id] = record;
}

export function getStates(id: string) {
  return states[id];
}

export function getState(id: string, state: string) {
  if (id in states) {
    return states[id][state];
  }

  return null;
}
