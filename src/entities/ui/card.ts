import { Entity } from "@/data/entity.js";
import { SpriteId } from "@/enums/assets.js";
import { CardId } from "@/enums/card.js";
import { EntityType } from "@/enums/entity.js";
import { getCard } from "@/usecases/card.js";
import { addEntity, setShadow, setSprite } from "@/usecases/entity.js";
import { drawSprite } from "ridder";

export function addCard(sceneId: number, x: number, y: number, cardId: CardId) {
  const e = addEntity(EntityType.CARD, sceneId, x, y);
  setSprite(e, SpriteId.CARD, 16, 16);
  setShadow(e, SpriteId.CARD_SHADOW, 17, 15);
  e.isOverlay = true;
  e.cardId = cardId;
  return e;
}

export function updateCard(e: Entity) {}

export function renderCard(e: Entity) {
  const card = getCard(e.cardId);
  drawSprite(card.spriteId, -card.spritePivot.x, -card.spritePivot.y);
}
