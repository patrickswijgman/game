import { CardId } from "@/consts.ts";
import { player, zeroSheet } from "@/data.ts";
import { addCards } from "@/lib/sheet.ts";

export function setupPlayer() {
  zeroSheet(player);
  player.name = "Player";
  player.health = 3;
  player.healthMax = 3;
  addCards(player, CardId.PUNCH, 3);
  addCards(player, CardId.STICK, 2);
}
