import { drawSprite, drawText, isInputPressed, pointerX, pointerY, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { CARD_HEIGHT, CARD_WIDTH, Color, Input, Texture } from "@/consts.ts";
import { getCard } from "@/lib/cards.ts";
import { withinBounds } from "@/lib/utils.ts";

export function drawTextWithShadow(text: string, x: number, y: number, color: string, align: CanvasTextAlign, baseline: CanvasTextBaseline) {
  drawText(text, x + 1, y, Color.SHADOW, align, baseline);
  drawText(text, x, y + 1, Color.SHADOW, align, baseline);
  drawText(text, x + 1, y + 1, Color.SHADOW, align, baseline);
  drawText(text, x, y, color, align, baseline);
}

export function drawCards(cards: Array<number>, anchorX: number, anchorY: number, onClick?: (i: number) => void) {
  for (let i = 0; i < cards.length; i++) {
    const cardId = cards[i];
    const card = getCard(cardId);
    const x = getCardX(anchorX, i, cards.length);
    const y = getCardY(anchorY);
    const isHover = withinBounds(pointerX, pointerY, x, y, CARD_WIDTH, CARD_HEIGHT);

    resetTransform();
    translateTransform(x, y);
    drawSprite(Texture.ATLAS, -4, -2, 0, 80, 32, 32);

    if (onClick && isHover) {
      drawSprite(Texture.ATLAS, -4, -2, 32, 80, 32, 32);

      if (isInputPressed(Input.LMB)) {
        onClick(i);
      }
    }

    const nameScaling = (1 / (Math.max(card.name.length, 6) / 6)) * 0.375;
    resetTransform();
    translateTransform(x, y);
    translateTransform(CARD_WIDTH / 2, 5);
    scaleTransform(nameScaling, nameScaling);
    drawTextWithShadow(card.name, 0, 0, "white", "center", "middle");

    resetTransform();
    translateTransform(x, y);
    translateTransform(CARD_WIDTH / 2, CARD_HEIGHT - 5);
    scaleTransform(0.5, 0.5);
    drawTextWithShadow(card.value.toString(), 0, 0, "white", "center", "middle");
  }

  // Tooltip
  for (let i = cards.length - 1; i >= 0; i--) {
    const cardId = cards[i];
    const card = getCard(cardId);
    const x = getCardX(anchorX, i, cards.length);
    const y = getCardY(anchorY);
    const isHover = withinBounds(pointerX, pointerY, x, y, CARD_WIDTH, CARD_HEIGHT);

    if (isHover) {
      resetTransform();
      translateTransform(pointerX, pointerY);
      drawTextWithShadow(card.name, 0, 0, "white", "left", "top");
      break;
    }
  }
}

function getCardX(x: number, i: number, l: number) {
  return x - ((CARD_WIDTH + 1) * l) / 2 + (CARD_WIDTH + 2) * i;
}

function getCardY(y: number) {
  return y;
}
