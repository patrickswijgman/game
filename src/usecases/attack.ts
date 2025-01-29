import { AttackId } from "@/consts/attack.js";
import { attacks } from "@/data/attacks.js";

export function getAttack(id: AttackId) {
  return attacks[id];
}
