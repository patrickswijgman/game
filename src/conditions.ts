import { Timer, timer } from "ridder";

export type Conditions = {
  stunDuration: number;
  stunTimer: Timer;
  isStunned: boolean;

  invulnerableDuration: number;
  invulnerableTimer: Timer;
  isInvulnerable: boolean;
};

export function newConditions(conditions: Partial<Conditions> = {}): Conditions {
  return {
    stunDuration: 0,
    stunTimer: timer(),
    isStunned: false,

    invulnerableDuration: 0,
    invulnerableTimer: timer(),
    isInvulnerable: false,

    ...conditions,
  };
}
