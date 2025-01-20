import { Entity } from "@/data/entity.js";
import { ActionId } from "@/enums/action.js";
import { SpriteId } from "@/enums/assets.js";
import { CardId } from "@/enums/card.js";
import { EntityType } from "@/enums/entity.js";
import { SceneId } from "@/enums/scene.js";
import { getCard } from "@/usecases/card.js";
import { addEntity, setHitarea, setOutline, setShadow, setSprite } from "@/usecases/entity.js";
import { drawSprite } from "ridder";

export function addCard(sceneId: SceneId, x: number, y: number, cardId: CardId, actionId: ActionId) {
  const e = addEntity(EntityType.CARD, sceneId, x, y);
  setSprite(e, SpriteId.CARD, 16, 16);
  setShadow(e, SpriteId.CARD_SHADOW, 17, 15);
  setOutline(e, SpriteId.CARD_OUTLINE);
  setHitarea(e, -12, -15, 24, 30);
  e.cardId = cardId;
  e.actionId = actionId;
  e.isOverlay = true;
  return e;
}

export function updateCard(e: Entity) {}

export function renderCard(e: Entity) {
  const card = getCard(e.cardId);
  drawSprite(card.spriteId, -card.spritePivot.x, -card.spritePivot.y);
}
