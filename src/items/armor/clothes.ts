import { newItem } from "items.js";
import { vec } from "ridder";
import { newStats } from "stats.js";

export function newClothes() {
  return newItem({
    name: "Clothes",
    spriteId: "",
    pivot: vec(16, 16),
    stats: newStats({}),
  });
}
