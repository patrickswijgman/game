import { Entity } from "data/entity.js";
import { Scene } from "data/scene.js";

export type Action = {
  name: string;
  description: string;
  enter?: (e: Entity, scene: Scene, action: Action) => void;
  update?: (e: Entity, scene: Scene, action: Action) => boolean;
  exit?: (e: Entity, scene: Scene, action: Action) => void;
};

const actions: Record<string, Action> = {};

export function newAction(options: Partial<Action> = {}): Action {
  return {
    name: "",
    description: "",
    ...options,
  };
}

export function addAction(id: string, action: Action) {
  actions[id] = action;
}

export function getAction(id: string) {
  return actions[id];
}
