import { UpgradeId } from "@/consts/upgrade.js";
import { newStats, Stats } from "@/data/stats.js";
import { table } from "ridder";

export type Upgrade = {
  name: string;
  stats: Stats;
};

export const upgrades = table<Upgrade>(UpgradeId.MAX, (id) => {
  switch (id) {
    case UpgradeId.DAMAGE:
      return {
        name: "Whetstone",
        stats: newStats({
          damage: 5,
        }),
      };

    default:
      return {
        name: "",
        stats: newStats(),
      };
  }
});
