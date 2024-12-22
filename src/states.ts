import { getPlayerStateMachine } from "entities/player.js";
import { Entity } from "entity.js";
import { Scene } from "scene.js";

export type State = {
  enter?: (e: Entity, scene: Scene) => void;
  update?: (e: Entity, scene: Scene) => void;
  exit?: (e: Entity, scene: Scene) => void;
};

export type StateMachine = {
  decide: (e: Entity, scene: Scene) => string;
  states: Record<string, State>;
};

const stateMachines: Record<string, StateMachine> = {};

export function addStateMachines() {
  stateMachines["player"] = getPlayerStateMachine();
}

export function getStateMachine(id: string) {
  return stateMachines[id];
}

export function getState(id: string, state: string) {
  return stateMachines[id].states[state];
}
