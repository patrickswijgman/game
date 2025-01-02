import { Timer, timer } from "ridder";

export type Conditions = {
  staggerDuration: number;
  staggerTimer: Timer;
  isStaggered: boolean;

  invulnerableDuration: number;
  invulnerableTimer: Timer;
  isInvulnerable: boolean;

  isHyperArmor: boolean;
};

export function newConditions(conditions: Partial<Conditions> = {}): Conditions {
  return {
    staggerDuration: 0,
    staggerTimer: timer(),
    isStaggered: false,

    invulnerableDuration: 0,
    invulnerableTimer: timer(),
    isInvulnerable: false,

    isHyperArmor: false,

    ...conditions,
  };
}
