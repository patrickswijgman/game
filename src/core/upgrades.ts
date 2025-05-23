import { newStats, Stats } from "@/core/stats.js";
import { table } from "ridder";

export const enum UpgradeId {
  NONE,
  HEALTH,
  DAMAGE,
  ATTACK_RANGE,
  CRIT_CHANCE,
  PICKUP_RANGE,
  MOVEMENT_SPEED,
  ATTACK_SPEED,
  MAX,
}

export type Upgrade = {
  name: string;
  stats: Stats;
};

const upgrades = table<Upgrade>(UpgradeId.MAX, (id) => {
  switch (id) {
    case UpgradeId.HEALTH:
      return {
        name: "Vigor",
        stats: newStats({
          health: 1,
          healthMax: 1,
        }),
      };

    case UpgradeId.DAMAGE:
      return {
        name: "Whetstone",
        stats: newStats({
          damage: 5,
        }),
      };

    case UpgradeId.ATTACK_RANGE:
      return {
        name: "Sniper",
        stats: newStats({
          attackRange: 20,
        }),
      };

    case UpgradeId.ATTACK_SPEED:
      return {
        name: "Rapid Fire",
        stats: newStats({
          attackSpeed: 0.25,
        }),
      };

    case UpgradeId.CRIT_CHANCE:
      return {
        name: "Accuracy",
        stats: newStats({
          critChance: 0.25,
        }),
      };

    case UpgradeId.PICKUP_RANGE:
      return {
        name: "Magnet",
        stats: newStats({
          pickupRange: 30,
        }),
      };

    case UpgradeId.MOVEMENT_SPEED:
      return {
        name: "Swiftness",
        stats: newStats({
          movementSpeed: 0.15,
        }),
      };

    default:
      return {
        name: "",
        stats: newStats(),
      };
  }
});

export function getUpgrade(id: UpgradeId): Readonly<Upgrade> {
  return upgrades[id];
}
