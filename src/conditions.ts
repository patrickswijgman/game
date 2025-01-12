import { Timer, timer } from "ridder";

export type Conditions = {
  staggerTimer: Timer;
  isStaggered: boolean;

  invulnerableDuration: number;
  invulnerableTimer: Timer;
  isInvulnerable: boolean;
};

export function newConditions(conditions: Partial<Conditions> = {}): Conditions {
  return {
    staggerTimer: timer(),
    isStaggered: false,

    invulnerableDuration: 0,
    invulnerableTimer: timer(),
    isInvulnerable: false,

    ...conditions,
  };
}
