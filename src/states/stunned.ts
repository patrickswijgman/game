import { addState, newState } from "data/states.js";

export function loadStunnedState() {
  addState("stunned", newState());
}
