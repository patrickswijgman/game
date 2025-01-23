import { attacks } from "@/data/attacks.js";

export function getAttack(id: number) {
  return attacks[id];
}
