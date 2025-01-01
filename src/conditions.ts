import { Timer, timer } from "ridder";

export type Conditions = {
  staggerDuration: number;
  staggerTimer: Timer;
  isStaggered: boolean;
};

export function newConditions(conditions: Partial<Conditions> = {}): Conditions {
  return {
    staggerDuration: 0,
    staggerTimer: timer(),
    isStaggered: false,
    ...conditions,
  };
}
