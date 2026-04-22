import { drawSprite, resetTransform, translateTransform } from "snuggy";
import { CardId, Texture } from "@/consts.ts";
import { player, zeroSheet } from "@/data.ts";
import { addCards } from "@/lib/sheet.ts";

export function setupPlayer() {
  zeroSheet(player);
  player.name = "Player";
  player.health = 15;
  player.healthMax = 15;
  addCards(player, CardId.DAGGER, 3);
  addCards(player, CardId.SHORTSWORD, 2);
  addCards(player, CardId.MACE, 1);
  addCards(player, CardId.FIREBALL, 1);
}

export function drawPlayer(x: number, y: number) {
  resetTransform();
  translateTransform(x, y);
  drawSprite(Texture.ATLAS, -16, -31, 0, 0, 32, 32);
  drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
}
