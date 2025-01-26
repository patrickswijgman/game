import { ATTACKS } from "@/data/attacks.js";

export function getAttack(id: number) {
  return ATTACKS[id];
}
