import { newStats, Stats } from "@/core/stats.js";
import { table } from "ridder";

export const enum UpgradeId {
  NONE,
  HEALTH,
  DAMAGE,
  RANGE,
  CRIT_CHANCE,
  PICKUP_RANGE,
  MOVEMENT_SPEED,
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
        name: "Health",
        stats: newStats({
          health: 2,
          healthMax: 2,
        }),
      };

    case UpgradeId.DAMAGE:
      return {
        name: "Damage",
        stats: newStats({
          damage: 5,
        }),
      };

    case UpgradeId.RANGE:
      return {
        name: "Range",
        stats: newStats({
          attackRange: 20,
        }),
      };

    case UpgradeId.CRIT_CHANCE:
      return {
        name: "Crit Chance",
        stats: newStats({
          critChance: 0.25,
        }),
      };

    case UpgradeId.PICKUP_RANGE:
      return {
        name: "Pickup Range",
        stats: newStats({
          pickupRange: 30,
        }),
      };

    case UpgradeId.MOVEMENT_SPEED:
      return {
        name: "Movement Speed",
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

export function getUpgrade(id: UpgradeId) {
  return upgrades[id];
}
