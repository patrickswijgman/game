import { drawSprite, resetTransform, translateTransform } from "snuggy";
import { CardId, Texture } from "@/consts.ts";
import { player } from "@/data.ts";
import { addCards, setSheet } from "@/lib/sheet.ts";

export function setupPlayer() {
  setSheet(player, "Player", 15);
  addCards(player, CardId.DAGGER, 3);
  addCards(player, CardId.SHORTSWORD, 2);
  addCards(player, CardId.MACE, 1);
  addCards(player, CardId.FIREBALL, 1);
  addCards(player, CardId.SHARPEN, 2);
  addCards(player, CardId.TAUNT, 1);
}

export function drawPlayer(x: number, y: number) {
  resetTransform();
  translateTransform(x, y);
  drawSprite(Texture.ATLAS, -16, -31, 0, 0, 32, 32);
  drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
}
