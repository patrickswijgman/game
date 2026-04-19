import { drawSprite, resetTransform, translateTransform } from "snuggy";
import { CardId, Texture } from "@/consts.ts";
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

export function preparePlayer() {
  player.health = player.healthMax;
}

export function drawPlayer() {
  if (player.health) {
    resetTransform();
    translateTransform(50, 80);
    drawSprite(Texture.ATLAS, -16, -31, 0, 0, 32, 32);
    drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
  }
}
